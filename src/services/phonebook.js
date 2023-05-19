import axios from 'axios'
import defaults from '../defaults.json'
import { max } from '../util'


// server actions
export const getAll = () =>
  axios.get(defaults.serverUrl).then(res => res.data)

export const update = (id, newObject) =>
  axios.put(`${defaults.serverUrl}/${id}`, newObject)

export const create = (newObject) =>
  axios.post(defaults.serverUrl, newObject).then(res => res.data)

export const deleteEntry = id =>
  axios.delete(`${defaults.serverUrl}/${id}`).then(res => res.data)

// helpers
const personInPhonebook = (nameToMatch, phonebook) => 
  phonebook.find(p => p.name.toLowerCase() === nameToMatch.toLowerCase())

// handlers
export const handleDelete = (idToDelete, personsState) => event => {
  const personToDelete = personsState.value.find(person => person.id === idToDelete)

  deleteEntry(idToDelete)
  .then(() => {
    personsState.setter(
      personsState.value
      .filter(person => person.id !== personToDelete.id)
    )
  })
}

export const handleSubmit = (nameState, phonenumberState, personsState, messageState) => event => {
  event.preventDefault()

  // Don't allow blank or default entries
  if (
    (
      (nameState.value === '')
      || (nameState.value === nameState.defaultValue)
    )
    || (phonenumberState.value === '')
  ) {
    nameState.setter('')
    phonenumberState.setter('')
    return
  }

  // Is the person already in phonebook?
  const matchingPerson = personInPhonebook(nameState.value, personsState.value)
  if (matchingPerson) {
    // ask user if they want to update listing
    update(matchingPerson.id, {...matchingPerson, 'number': phonenumberState.value})
    .then(res => {
      messageState.setter(`${matchingPerson.name}'s entry was successfully updated!`)
      nameState.setter('')
      phonenumberState.setter('')
      personsState.setter(
        personsState.value
        .map(originalPerson => originalPerson.id === matchingPerson.id
          ? res.data
          : originalPerson
        )
      )
    })
    .catch(error => {
      error.response.status === 404
        ? messageState.setter('Already deleted!')
        : messageState.setter('There was an error!')
      console.log(`Couldn't update person ${matchingPerson.id}: ${error.response.status}`)
    })
    return
  }
  
  // Create since they're not in the phonebook already
  create({
    id: max(personsState.value) + 1,
    name: nameState.value,
    number: phonenumberState.value,
  })
  .then(returnedListing => {
    messageState.setter(`${nameState.value} was added to the phonebook!`)
    nameState.setter('')
    phonenumberState.setter('')
    personsState.setter(personsState.value.concat(returnedListing))
  })
}

import { handleDelete } from '../services/phonebook'

const PhonebookListing = ({ person }) =>
  <div>{person.name} {person.number}</div>

const PhonebookView = ({ personsState, query }) =>

  Object.values(personsState.value)
  .filter(person =>
    query
    ? person.name.toLowerCase().startsWith(query.toLowerCase())
    : true
  )
  .map((person, i) =>
    <div key={i}>
      <PhonebookListing person={person}>
      </PhonebookListing>
      <button onClick={handleDelete(person.id, personsState)}>
        delete
      </button>
    </div>
  )
        
export default PhonebookView

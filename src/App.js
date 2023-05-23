// external libraries
import { useCallback, useEffect } from 'react'

// defaults
import defaults from './defaults.json'

// helper functions
import NewState   from './util'
import { getAll } from './services/phonebook'

// components
import PhonebookView  from './components/PhonebookView'
import EntryForm      from './components/EntryForm'
import QueryForm      from './components/QueryForm'
import Notification   from './components/Notification'

// main
const App = () => {
  const nameState         = NewState(defaults.name)
  const personsState      = NewState(defaults.persons)
  const phonenumberState  = NewState(defaults.phonenumber)
  const queryState        = NewState(defaults.query)
  const errorMessageState = NewState("")
  
  const fetchData = useCallback(async () => {
    const personsData = await getAll()
    personsState.setter(personsData)
  }, [personsState])
    
  // fetch persons from database only on first render
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div>
      <Notification
        messageState={errorMessageState}
      >
      </Notification>
      <h2>Phonebook</h2>
      <div>
        <EntryForm
          nameState={nameState}
          phonenumberState={phonenumberState}
          personsState={personsState}  // uses setter
          messageState={errorMessageState}
        >
        </EntryForm>
      </div>
      <h2>Numbers</h2>
      <h3>Filter by name: </h3>
      <div>
        <QueryForm
          queryState={queryState}
          messageState={errorMessageState}
        >
        </QueryForm>
      </div>
      <div>
        <PhonebookView
          personsState={personsState}
          query={queryState.value}>
        </PhonebookView>
      </div>
    </div>
  );
}

export default App

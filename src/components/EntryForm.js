import { handleSubmit } from '../services/phonebook'

const handleInputFocus = ({ value, setter, defaultValue }) => () => {
  if (value === defaultValue) {
    setter('')
    return
  }
}

const handleInputBlur = ({ value, setter, defaultValue }) => () => {
  if (value === '') {
    setter(defaultValue)
  }
}

const getInputHandler = stateObject => {
  return {
    onFocus: handleInputFocus(stateObject),
    onBlur: handleInputBlur(stateObject),
  }
}

const EntryForm = ({ nameState, phonenumberState, personsState, messageState }) => {

  const nameInputHandler        = getInputHandler(nameState)
  const phonenumberInputHandler = getInputHandler(phonenumberState)

  return (
    <form onSubmit={handleSubmit(nameState, phonenumberState, personsState, messageState)}>
      <h3>new entry</h3>
      <div>
        name: <input
          value     = {nameState.value}
          onChange  = {e => nameState.setter(e.target.value)}
          onFocus   = {nameInputHandler.onFocus}
          onBlur    = {nameInputHandler.onBlur}
        />
      </div>
      <div>
        number: <input
          value     = {phonenumberState.value}
          onChange  = {e => phonenumberState.setter(e.target.value)}
          onFocus   = {phonenumberInputHandler.onFocus}
          onBlur    = {phonenumberInputHandler.onBlur}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default EntryForm

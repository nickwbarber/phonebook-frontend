import { useState } from 'react'

export const max = arr => {arr.reduce((a, b) => a > b ? a : b)}

const NewState = defaultValue => {
  const [ value, setter ] = useState(defaultValue)
  return {
    value: value,
    setter: setter,
    defaultValue: defaultValue,
  }
}


export default NewState

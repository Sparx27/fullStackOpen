import { useState } from 'react'

export const useInput = (type, placeholder = '') => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const attributes = { value, onChange, type, placeholder }

  return {
    value,
    attributes,
    reset
  }
}
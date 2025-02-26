const initialState = ''

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  if(type === 'SET_FILTER') return payload.value
  return state
}

export const setFilter = (value) => {
  return {
    type: 'SET_FILTER',
    payload: { value }
  }
}

export default reducer
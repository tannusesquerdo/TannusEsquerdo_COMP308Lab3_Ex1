import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  auth: {
    isAuthenticated: false,
    user: null,
    id: null,
    role: null,
  }
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store

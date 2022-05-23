import React, { useReducer, createContext } from 'react';

const initialState = {
  user: {},
  isLoggedIn: false,
  loginType: ''
}

const userReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_USER_RESPONSE': 
      return  {
        ...state,
        user: action.payload
      }
    case 'LOGIN_TYPE': 
      return  {
        ...state,
        loginType: action.payload
      }
    case 'IS_LOGGED_IN':
      return  {
        ...state,
        isLoggedIn: action.payload
      }
    default: 
      return state;
  }
}

const UserContext = createContext(initialState)

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)
  return (
    <UserContext.Provider value={{userState: state, userDispatch: dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider}
import { createContext, useReducer } from 'react'

export const PostContext = createContext()

export const postReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POST': 
      return {
        post: action.payload
      }
    case 'CREATE_POST':
      return {
        post: [action.payload, ...state.post]
      }
    case 'DELETE_POST':
      return {
        post: state.post.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, {
    post: null
  })

  return (
    <PostContext.Provider value={{...state, dispatch}}>
      { children }
    </PostContext.Provider>
  )
}
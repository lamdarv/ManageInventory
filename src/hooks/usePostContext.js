import { PostContext } from '../context/PostContext'
import { useContext } from 'react'

export const usePostContext = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}
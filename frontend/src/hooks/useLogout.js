import {useUserContext} from './useUserContext'
import { usePostsContext } from './usePostsContext'
export const useLogout = () => {
  const {dispatch} = useUserContext()
  const {dispatch: postsDispatch} = usePostsContext()
  const logout = () => {
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'})
    postsDispatch({type: 'GET_POSTS', payload: null})

  }
  return {logout}
}

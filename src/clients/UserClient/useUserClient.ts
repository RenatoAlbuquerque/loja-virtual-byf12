import { useCallback } from 'react'
import axios from 'axios'

const useUserClient = () => {
  const getUserInfo = useCallback(
    () =>
      axios.get(``),
    []
  )

  return useCallback(
    () => ({
      getUserInfo
    }),
    [getUserInfo]
  )
}

export default useUserClient
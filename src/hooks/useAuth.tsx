import React, { useState, useEffect } from 'react'
import userStorage from '../local-storage/userStorage'
import jwt_decode from "jwt-decode"
import { useRouter } from 'next/router';

interface ITokenProps {
  name: string
  roles: string[]
}

export const decodeToken = (token: string) => {
  const response: ITokenProps = jwt_decode(token)
  return response
}

export const withAuth = (Page: React.FC, UserPermission: string[]) => {
  const Auth = () => {
    const [validToken, setValidToken] = useState<boolean>(false)
    const router = useRouter();
    useEffect(() => {
      const { get: getLocalStorage } = userStorage.userInfo()
      const token = getLocalStorage()?.token
      console.log('chamou')
      if (token) {
        const { roles } = decodeToken(token)

        const hasValidPermission = UserPermission.some((value) => roles.includes(value));

        if (hasValidPermission) {
          setValidToken(true);
        } else {
          router.push('/401');
        }
      }
    }, [])

    return validToken && <Page />
  }

  return Auth
}
import { useState, createContext, useMemo } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState()
  const [openModallogin, setOpenModalLogin] = useState<boolean>(false)

  const contextUserValue = useMemo(
    () => ({
      user, setUser, openModallogin, setOpenModalLogin
    }),
    [
      user, setUser, openModallogin, setOpenModalLogin
    ]
  )

  return (
    <UserContext.Provider value={contextUserValue}>
      {children}
    </UserContext.Provider>
  );
};
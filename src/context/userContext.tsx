import { useState, createContext, useMemo } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({})

  const contextUserValue = useMemo(
    () => ({
      user, setUser
    }),
    [
      user, setUser
    ]
  )

  return (
    <UserContext.Provider value={contextUserValue}>
      {children}
    </UserContext.Provider>
  );
};
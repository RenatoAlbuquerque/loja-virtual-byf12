import React, { useState, createContext } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: any) => {

  return (
    <GlobalContext.Provider
      value={{}}
    >
      {children}
    </GlobalContext.Provider>
  );
};
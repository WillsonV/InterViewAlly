import React, { createContext, useContext, useReducer } from "react";

//prepare data layer
export const StateContext = createContext();

//selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

//warp our aoo and provide data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull info from data layer
export const useStateValue = () => useContext(StateContext);

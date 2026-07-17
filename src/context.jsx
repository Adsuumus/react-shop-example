import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const ShopContext = createContext();

const initialState = {
  goods: [],
  order: [],
  showBasket: false,
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    setGoods: (goods) => dispatch({ type: "SET_GOODS", payload: goods }),
    toggleBasket: () => dispatch({ type: "TOGGLE_BASKET" }),
    delItem: (itemID) =>
      dispatch({ type: "DEL_ITEM", payload: { id: itemID } }),
    decrimentItem: (itemID) =>
      dispatch({ type: "DEC_ITEM", payload: { id: itemID } }),
    incrementItem: (itemID) =>
      dispatch({ type: "INC_ITEM", payload: { id: itemID } }),
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

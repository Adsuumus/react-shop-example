import { createContext, useReducer, useEffect, useState } from "react";
import { reducer } from "./reducer";
import {
  addItemtoCart,
  changeQuantity,
  removeFromCart,
  getCart,
} from "./api/cartApi";
import { getID } from "./utils/auth";

export const ShopContext = createContext();

const initialState = {
  goods: [],
  order: [],
  showBasket: false,
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userId, setUserId] = useState(getID());

  useEffect(() => {
    if (!userId) {
      dispatch({
        type: "SET_ORDER",
        payload: [],
      });
      return;
    }

    const loadCart = async () => {
      try {
        const cart = await getCart(userId);

        dispatch({
          type: "SET_ORDER",
          payload: cart,
        });
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
      }
    };

    loadCart();
  }, [userId]);

  const addItem = async (item) => {
    const existingItem = state.order.find((el) => el.id === item.id);

    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });

    if (!userId) return;

    if (existingItem) {
      await changeQuantity(userId, item.id, quantity);
    } else {
      await addItemtoCart(userId, item.id, item.title, item.price, quantity);
    }
  };

  const incrementItem = async (itemID) => {
    const existingItem = state.order.find((el) => el.id === itemID);

    if (!existingItem) return;

    const quantity = existingItem.quantity + 1;

    dispatch({
      type: "INC_ITEM",
      payload: { id: itemID },
    });

    if (userId) {
      await changeQuantity(userId, itemID, quantity);
    }
  };

  const decrimentItem = async (itemID) => {
    const existingItem = state.order.find((el) => el.id === itemID);

    if (!existingItem) return;

    if (existingItem.quantity < 2) {
      delItem(itemID);
    } else {
      const quantity = existingItem.quantity - 1;

      dispatch({
        type: "DEC_ITEM",
        payload: { id: itemID },
      });

      if (userId) {
        await changeQuantity(userId, itemID, quantity);
      }
    }
  };

  const delItem = async (itemID) => {
    dispatch({
      type: "DEL_ITEM",
      payload: { id: itemID },
    });
    if (userId) {
      await removeFromCart(userId, itemID);
    }
  };

  const value = {
    ...state,
    setGoods: (goods) => dispatch({ type: "SET_GOODS", payload: goods }),
    setOrder: (order) => dispatch({ type: "SET_ORDER", payload: order }),
    toggleBasket: () => dispatch({ type: "TOGGLE_BASKET" }),
    clouseBasket: () => dispatch({ type: "CLOUSE_BASKET" }),
    decrimentItem,
    incrementItem,
    delItem,
    addItem,
    setUserId,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

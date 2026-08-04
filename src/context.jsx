import { createContext, useReducer, useEffect, useState } from "react";
import { reducer } from "./reducer";
import { mergeCarts } from "./utils/mergeCarts";
import {
  addItemtoCart,
  changeQuantity,
  removeFromCart,
  getCart,
  setCart,
} from "./api/cartApi";
import { getID } from "./utils/auth";

export const ShopContext = createContext();

const initialState = {
  goods: [],
  order: getID() ? [] : JSON.parse(localStorage.getItem("cart") || "[]"),
  showBasket: false,
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userId, setUserId] = useState(getID());

  useEffect(() => {
    if (!userId) {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      dispatch({
        type: "SET_ORDER",
        payload: localCart,
      });

      return;
    }

    const loadCart = async () => {
      if (!userId) {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

        dispatch({
          type: "SET_ORDER",
          payload: localCart,
        });

        return;
      }

      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      let cart = await getCart(userId);

      if (localCart.length) {
        cart = mergeCarts(cart, localCart);
        await setCart(userId, cart);
        localStorage.removeItem("cart");
      }

      dispatch({
        type: "SET_ORDER",
        payload: cart,
      });
    };

    loadCart();
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      localStorage.setItem("cart", JSON.stringify(state.order));
    }
  }, [state.order, userId]);

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
      await addItemtoCart(
        userId,
        item.id,
        item.title,
        item.price,
        quantity,
        item.image,
      );
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

  const decrementItem = async (itemID) => {
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
    openBasket: () => dispatch({ type: "OPEN_BASKET" }),
    closeBasket: () => dispatch({ type: "CLOUSE_BASKET" }),
    decrementItem,
    incrementItem,
    delItem,
    addItem,
    setUserId,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

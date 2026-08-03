export function reducer(state, { type, payload }) {
  switch (type) {
    case "SET_GOODS":
      return { ...state, goods: payload };
    case "SET_ORDER":
      return {
        ...state,
        order: payload,
      };
    case "DEL_ITEM":
      return {
        ...state,
        order: state.order.filter((el) => el.id !== payload.id),
      };
    case "ADD_ITEM": {
      const existingIndex = state.order.findIndex((el) => el.id === payload.id);

      if (existingIndex === -1) {
        return {
          ...state,
          order: [{ ...payload, quantity: 1 }, ...state.order],
        };
      }

      return {
        ...state,
        order: state.order.map((el, i) =>
          i === existingIndex ? { ...el, quantity: el.quantity + 1 } : el,
        ),
      };
    }
    case "INC_ITEM": {
      return {
        ...state,
        order: state.order.map((el) => {
          return el.id === payload.id
            ? { ...el, quantity: el.quantity + 1 }
            : el;
        }),
      };
    }
    case "DEC_ITEM": {
      return {
        ...state,
        order: state.order.map((el) => {
          return el.id === payload.id
            ? { ...el, quantity: el.quantity - 1 }
            : el;
        }),
      };
    }
    case "OPEN_BASKET":
      return { ...state, showBasket: true };

    case "CLOUSE_BASKET":
      return { ...state, showBasket: false };

    default:
      return state;
  }
}

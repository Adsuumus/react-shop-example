export function reducer(state, { type, payload }) {
  switch (type) {
    case "SET_GOODS":
      return { ...state, goods: payload };
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
          order: [...state.order, { ...payload, quantity: 1 }],
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
      const item = state.order.find((el) => el.id === payload.id);

      if (item.quantity > 1) {
        return {
          ...state,
          order: state.order.map((el) => {
            return el.id === payload.id
              ? { ...el, quantity: el.quantity - 1 }
              : el;
          }),
        };
      } else {
        return {
          ...state,
          order: state.order.filter((el) => el.id !== payload.id),
        };
      }
    }
    case "TOGGLE_BASKET":
      return { ...state, showBasket: !state.showBasket };

    case "CLOUSE_BASKET":
      return { ...state, showBasket: false };

    default:
      return state;
  }
}

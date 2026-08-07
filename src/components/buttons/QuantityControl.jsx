const styles = {
  default: {
    wrapper: "join h-8 w-25 shrink-0",

    button: "h-8 min-h-8 flex-1 min-w-0 text-sm",
    quantity: "h-8 min-h-8 flex-1 min-w-0 text-sm",
  },

  itemPage: {
    wrapper: "join h-8 w-32 shrink-0",

    button: "h-8 min-h-8 flex-1 min-w-0 text-lg",
    quantity: "h-8 min-h-8 flex-1 min-w-0 text-lg",
  },
};

export function QuantityControl({
  id,
  quantity,
  incrementItem,
  decrementItem,
  variant = "default",
}) {
  const cls = styles[variant];

  return (
    <div className={cls.wrapper}>
      <button
        type="button"
        onClick={() => decrementItem(id)}
        aria-label="Уменьшить"
        className={`btn join-item rounded-none border-0 shadow-none rounded-l ${cls.button}`}
      >
        −
      </button>

      <span
        className={`btn join-item pointer-events-none rounded-none border-0 shadow-none ${cls.quantity}`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => incrementItem(id)}
        aria-label="Увеличить"
        className={`btn join-item rounded-r border-0 shadow-none ${cls.button}`}
      >
        +
      </button>
    </div>
  );
}

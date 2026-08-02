import { http } from "./http";

async function addItemtoCart(userId, itemId, title, price, quantity) {
  try {
    const { data } = await http.post("/cart_items", {
      user_id: userId,
      product_id: itemId,
      title: title,
      price: price,
      quantity,
    });

    return data;
  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
}

async function changeQuantity(userId, productId, quantity) {
  const { data } = await http.patch(
    `/cart_items?user_id=eq.${userId}&product_id=eq.${productId}`,
    {
      quantity,
    },
  );
  return data;
}

async function removeFromCart(userId, productId) {
  const { data } = await http.delete(
    `/cart_items?user_id=eq.${userId}&product_id=eq.${productId}`,
  );

  return data;
}

async function getCart(userId) {
  const { data } = await http.get(`/cart_items?user_id=eq.${userId}`);

  return data.map((el) => {
    return {
      id: el.product_id,
      price: el.price,
      title: el.title,
      quantity: el.quantity,
    };
  });
}

export { addItemtoCart, changeQuantity, removeFromCart, getCart };

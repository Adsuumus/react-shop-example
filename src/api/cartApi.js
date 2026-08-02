import { http } from "./http";

export async function addToCart(userId, itemId, quantity) {
  try {
    const { data } = await http.post("/cart_items", {
      user_id: userId,
      product_id: itemId,
      quantity,
    });

    return data;
  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
}

async function incInCart(userId, productId, quantity) {
  const { data } = await http.patch(
    `/cart_items?user_id=eq.${userId}&product_id=eq.${productId}`,
    {
      quantity,
    },
  );
  return data;
}

export async function removeFromCart(userId, productId) {
  const { data } = await http.delete(
    `/cart_items?user_id=eq.${userId}&product_id=eq.${productId}`,
  );

  return data;
}

export { addToCart as cartApi, incInCart };

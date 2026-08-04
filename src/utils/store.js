export function getLocalCart() {
  return localStorage.getItem("cart") || null;
}

export function setLocalCart(cart) {
  return localStorage.setItem("cart", cart);
}

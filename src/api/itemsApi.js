const API_URL = `${import.meta.env.BASE_URL}/data/shop.json`;

async function fetchAllItems() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.shop;
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
    throw error;
  }
}

async function fetchItem(id) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data.shop.find((product) => product.id === id);
  } catch (error) {
    console.error("Ошибка загрузки товара:", error);
    throw error;
  }
}

export { fetchAllItems, fetchItem };

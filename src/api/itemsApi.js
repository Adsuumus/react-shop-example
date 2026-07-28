import axios from "axios";

const supabaseUrl = "https://nevuxbpwcctfchapsxvq.supabase.co";
const supabaseKey = "sb_publishable_8d90FncTUNSaDEGkjxij1w_iQWr0Nu8";

async function fetchAllItems() {
  try {
    const response = await axios.get(`${supabaseUrl}/rest/v1/shop_data`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
  }
}

async function fetchItem(id) {
  try {
    const response = await axios.get(
      `${supabaseUrl}/rest/v1/shop_data?id=eq.${id}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data[0] || null;
  } catch (error) {
    console.error("Ошибка загрузки товара:", error);
  }
}

export { fetchAllItems, fetchItem };

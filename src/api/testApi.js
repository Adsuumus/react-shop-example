const SUPABASE_URL = "https://nevuxbpwcctfchapsxvq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8d90FncTUNSaDEGkjxij1w_iQWr0Nu8";

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

async function fetchAllItems() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/clean_shop_items?limit=1000`,
      { headers },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ошибка сервера:", errorText);
      return [];
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Ошибка загрузки:", error);
    return [];
  }
}

async function fetchItemById(id) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/clean_shop_items?id=eq.${id}`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error("Ошибка загрузки предмета:", error);
    return null;
  }
}

export { fetchAllItems, fetchItemById };

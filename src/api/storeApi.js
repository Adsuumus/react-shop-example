import axios from "axios";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function fetchItem(id) {
  try {
    const response = await axios.get(
      `${supabaseUrl}/rest/v1/shop_data?id=eq.${id}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "count=exact",
          "Content-Type": "application/json",
        },
      },
    );
    return response.data[0] || null;
  } catch (error) {
    console.error("Ошибка загрузки товара:", error);
  }
}

async function fetchPage(page = 1, pageSize = 8) {
  const offset = (page - 1) * pageSize;

  const response = await fetch(
    `${supabaseUrl}/rest/v1/shop_data?` +
      `select=*&` +
      `offset=${offset}&` +
      `limit=${pageSize}`,
    {
      headers: {
        apikey: supabaseKey,
        Prefer: "count=exact",
      },
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Ошибка загрузки товаров");
  }

  const totalCount = response.headers.get("content-range")?.split("/")[1];

  return {
    data,
    total: parseInt(totalCount || "0"),
    totalPages: Math.ceil(parseInt(totalCount || "0") / pageSize),
  };
}

export { fetchItem, fetchPage };

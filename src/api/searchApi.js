const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function searchAPI(query) {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/shop_data?select=*&title=ilike.*${encodeURIComponent(query)}*`,
    {
      headers: {
        apikey: supabaseKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Ошибка поиска товаров");
  }

  return await response.json();
}

export { searchAPI };

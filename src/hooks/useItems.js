import { useState, useEffect } from "react";
import { fetchItem } from "../api/storeApi";

function useItem(id) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadItem = async () => {
      try {
        const data = await fetchItem(id);
        setItem(data);
      } catch (err) {
        console.log(err.message);
        setItem(null);
      }
    };

    loadItem();
  }, [id]);

  return { item };
}

export { useItem };

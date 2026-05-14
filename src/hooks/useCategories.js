import { useState, useEffect } from "react";
import { supabase } from "@/backend";
import logger from "@/lib/logger";
function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      logger.request("GET", "categories");
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) {
        logger.error("GET", "categories", error.message);
      } else {
        logger.success("GET", "categories", data?.length);
      }
      setCategories(data || []);
      setLoading(false);
    };
    fetch();
  }, []);
  return { categories, loading };
}
export {
  useCategories
};

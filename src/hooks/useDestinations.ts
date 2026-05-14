import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import logger from "@/lib/logger";

export interface DestinationRow {
  id: string;
  title: string;
  state: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  reviews_count: number;
  short_desc: string;
}

interface UseDestinationsOptions {
  search?: string;
  category?: string;
  excludeCategories?: string[];
  sortBy?: "rating" | "price-low" | "price-high";
  priceMin?: number;
  priceMax?: number;
  page?: number;
  pageSize?: number;
}

interface UseDestinationsResult {
  destinations: DestinationRow[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
}

export function useDestinations(options: UseDestinationsOptions): UseDestinationsResult {
  const { search = "", category = "All", excludeCategories = [], sortBy = "rating", priceMin, priceMax, page = 1, pageSize = 9 } = options;
  const [destinations, setDestinations] = useState<DestinationRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    logger.request("GET", "destinations", { search, category, sortBy, priceMin, priceMax, page });

    let query = supabase
      .from("destinations")
      .select("id, title, state, category, image, price, rating, reviews_count, short_desc", { count: "exact" });

    if (category && category !== "All") {
      query = query.eq("category", category);
    } else if (excludeCategories.length > 0) {
      query = query.not("category", "in", `(${excludeCategories.map((c) => `"${c}"`).join(",")})`);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,state.ilike.%${search}%,category.ilike.%${search}%`);
    }

    if (priceMin !== undefined) {
      query = query.gte("price", priceMin);
    }
    if (priceMax !== undefined) {
      query = query.lte("price", priceMax);
    }

    if (sortBy === "rating") {
      query = query.order("rating", { ascending: false });
    } else if (sortBy === "price-low") {
      query = query.order("price", { ascending: true });
    } else {
      query = query.order("price", { ascending: false });
    }

    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      logger.error("GET", "destinations", error.message);
    } else {
      logger.success("GET", "destinations", data?.length);
    }

    setDestinations((data as DestinationRow[]) || []);
    setTotalCount(count || 0);
    setLoading(false);
  }, [search, category, excludeCategories.join(","), sortBy, priceMin, priceMax, page, pageSize]);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return {
    destinations,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
    loading,
  };
}

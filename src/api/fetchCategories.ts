import { createQuery } from "@tanstack/svelte-query";
import axios, { type AxiosResponse } from "axios";
import type { Product } from "../typings/Product";

export const createFetchCategories = () => {
  return createQuery<Product["category"][]>(["categories"], () =>
    fetchCategories()
  );
};

const fetchCategories = async () => {
  const controller = new AbortController();

  const endpoint = "https://dummyjson.com/products/categories";

  return (
    await axios.get<
      Product["category"][] | undefined,
      AxiosResponse<Product["category"][] | undefined>
    >(endpoint, {
      signal: controller.signal,
    })
  ).data;
};

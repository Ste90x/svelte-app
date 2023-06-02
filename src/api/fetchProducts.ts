import { createQuery } from "@tanstack/svelte-query";
import axios, { type AxiosResponse } from "axios";
import type { PageOfProducts } from "../typings/PageOfProducts";

export const createFetchProducts = () =>
  createQuery<PageOfProducts>(["products"], fetchProducts);

const fetchProducts = async () => {
  const controller = new AbortController();

  const endpoint = "https://dummyjson.com/products";

  return (
    await axios.get<
      PageOfProducts | undefined,
      AxiosResponse<PageOfProducts | undefined>
    >(endpoint, {
      signal: controller.signal,
    })
  ).data;
};

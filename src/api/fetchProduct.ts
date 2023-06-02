import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
import axios, { type AxiosResponse } from "axios";
import type { Product } from "../typings/Product";

export const createFetchProduct = (
  productID: Product["id"],
  options?: CreateQueryOptions<Product>
) => {
  return createQuery<Product>(
    ["product", productID],
    () => fetchProduct(productID),
    options
  );
};

const fetchProduct = async (productID: Product["id"]): Promise<Product> => {
  const controller = new AbortController();

  const endpoint = `https://dummyjson.com/products/${productID}`;

  return (
    await axios.get<Product | undefined, AxiosResponse<Product | undefined>>(
      endpoint,
      {
        signal: controller.signal,
      }
    )
  ).data;
};

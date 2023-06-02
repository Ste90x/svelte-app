import type { Product } from "./Product";

export type PageOfProducts = {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
};

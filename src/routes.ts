import CreateNewProductPage from "./pages/CreateNewProductPage.svelte";
import EditProductPage from "./pages/EditProductPage.svelte";
import NotFoundPage from "./pages/NotFoundPage.svelte";
import OverviewPage from "./pages/OverviewPage.svelte";

export const routes = {
  "/": OverviewPage,
  "/edit/:productID": EditProductPage,
  "/new": CreateNewProductPage,
  "*": NotFoundPage,
};

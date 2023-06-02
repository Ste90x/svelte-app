import { addMessages, getLocaleFromNavigator, init } from "svelte-i18n";
import de from "./assets/locale/de.json";
import en from "./assets/locale/en.json";

addMessages("en", en);
addMessages("de", de);

init({
  fallbackLocale: "en",
  initialLocale: getLocaleFromNavigator(),
});

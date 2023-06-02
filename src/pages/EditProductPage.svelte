<script lang="ts">
  import { useQueryClient } from "@tanstack/svelte-query";
  import { createForm } from "svelte-forms-lib";
  import { _ } from "svelte-i18n";
  import * as yup from "yup";
  import { createFetchCategories } from "../api/fetchCategories";
  import { createFetchProduct } from "../api/fetchProduct";
  import { Labels } from "../assets/locale/Labels";
  import FormInput from "../lib/FormInput.svelte";
  import FormSelect from "../lib/FormSelect.svelte";
  import type { PageOfProducts } from "../typings/PageOfProducts";
  import type { Product } from "../typings/Product";

  export let params: { productID?: string } = {};

  type FormProduct = Omit<
    Product,
    "id" | "images" | "stock" | "thumbnail" | "category"
  > & {
    category: Product["category"] | "";
  };

  const queryClient = useQueryClient();

  const singleProductQueryResults = createFetchProduct(
    Number(params.productID),
    {
      initialData:
        queryClient
          .getQueryData<PageOfProducts>(["products"])
          .products.find((p) => p.id === Number(params.productID)) ?? undefined,
    }
  );

  const selectableCategoriesQueryResults = createFetchCategories();

  $: formState = createForm<FormProduct>({
    initialValues: $singleProductQueryResults.data,
    validationSchema: yup.object<FormProduct>().shape({
      title: yup.string().min(1).required(),
      brand: yup.string().min(1).required(),
      category: yup
        .string()
        .oneOf<Product["category"]>(
          $selectableCategoriesQueryResults.data ?? []
        )
        .required(),
      description: yup.string(),
      discountPercentage: yup.number().min(0).max(100).required(),
      price: yup.number().min(0).required(),
      rating: yup.number().min(0).max(5),
    }),
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    },
  });

  $: ({ form, handleSubmit, errors, handleChange } = formState);
</script>

<main class="container mx-auto p-5">
  <h1 class="text-5xl pb-5">
    {$_(Labels.page.home.EDIT_PRODUCT)}
  </h1>

  {#if $singleProductQueryResults.isLoading}
    <progress class="progress w-full" />
  {:else if $singleProductQueryResults.isError}
    <p>Error: {JSON.stringify($singleProductQueryResults.error)}</p>
  {:else if $singleProductQueryResults.isSuccess}
    <form on:submit={handleSubmit}>
      <div class="grid grid-cols-3 gap-5">
        <FormInput
          id="title"
          label={$_(Labels.shared.form.TITLE)}
          {form}
          {errors}
          {handleChange}
        />
        <FormInput
          id="brand"
          label={$_(Labels.shared.form.BRAND)}
          {form}
          {errors}
          {handleChange}
        />
        <FormSelect
          id="category"
          label={$_(Labels.shared.form.CATEGORY)}
          {form}
          {errors}
          {handleChange}
          options={$selectableCategoriesQueryResults.data ?? []}
        />
        <FormInput
          id="description"
          label={$_(Labels.shared.form.DESCRIPTION)}
          {form}
          {errors}
          {handleChange}
        />
        <FormInput
          id="discountPercentage"
          label={$_(Labels.shared.form.DISCOUNT)}
          {form}
          {errors}
          {handleChange}
        />
        <FormInput
          id="price"
          label={$_(Labels.shared.form.PRICE)}
          {form}
          {errors}
          {handleChange}
        />
        <FormInput
          id="rating"
          label={$_(Labels.shared.form.RATING)}
          {form}
          {errors}
          {handleChange}
        />
      </div>
      <div class="flex justify-end">
        <button
          class="btn btn-secondary rounded-lg text-white mt-10w-1/3"
          type="submit">Speichern</button
        >
      </div>
    </form>
  {/if}
</main>

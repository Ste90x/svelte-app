<script lang="ts">
  import {
    createColumnHelper,
    createSvelteTable,
    flexRender,
    getCoreRowModel,
    type OnChangeFn,
    type RowSelectionState,
    type TableOptions,
  } from "@tanstack/svelte-table";
  import { _ } from "svelte-i18n";
  import { link } from "svelte-spa-router";
  import { writable } from "svelte/store";
  import { createFetchProducts } from "../api/fetchProducts";
  import { Labels } from "../assets/locale/Labels";
  import type { Product } from "../typings/Product";

  const queryResults = createFetchProducts();
  $: ({ data, isError, isLoading, error, isSuccess } = $queryResults);

  const columnHelper = createColumnHelper<Product>();
  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => table,
      cell: ({ row }) => row,
    }),
    columnHelper.accessor("id", {
      header: Labels.page.home.table.ID,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: Labels.page.home.table.TITLE,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("brand", {
      header: Labels.page.home.table.BRAND,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("price", {
      header: Labels.page.home.table.PRICE,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("discountPercentage", {
      header: Labels.page.home.table.DISCOUNT_PERCENTAGE,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("category", {
      header: Labels.page.home.table.CATEGORY,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: Labels.page.home.table.DESCRIPTION,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("rating", {
      header: Labels.page.home.table.RATING,
      cell: (info) => info.getValue(),
    }),
  ];

  let rowSelection: RowSelectionState = {};
  const setRowSelection: OnChangeFn<RowSelectionState> = (updater) => {
    if (updater instanceof Function) {
      rowSelection = updater(rowSelection);
    } else {
      rowSelection = updater;
    }
    tableOptions.update((old) => ({
      ...old,
      state: {
        ...old.state,
        rowSelection,
      },
    }));
  };

  $: tableOptions = writable<TableOptions<Product>>({
    data: data?.products ?? [],
    columns,
    state: {
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
  });

  $: table = createSvelteTable<Product>(tableOptions);
</script>

<main class="max-h-[calc(100vh-5rem)] w-screen p-5">
  <div class="flex justify-between">
    <h1 class="text-5xl pb-5">
      {$_(Labels.page.home.PAGE_TITLE)}
    </h1>
    <div>
      {#if $table.getIsSomeRowsSelected()}
        <a
          href={`/edit/${$table.getSelectedRowModel().flatRows[0].original.id}`}
          use:link
          class="btn btn-secondary btn-outline rounded-lg text-white"
        >
          {$_(Labels.page.home.EDIT_PRODUCT)}
        </a>
      {/if}
      <a href="/new" use:link class="btn btn-secondary rounded-lg text-white">
        {$_(Labels.page.home.CREATE_NEW_PRODUCT)}</a
      >
    </div>
  </div>
  <div class="max-h-[calc(100vh-10rem)] overflow-auto">
    <table class="table table-zebra table-compact w-full">
      <thead>
        {#each $table.getHeaderGroups() as headerGroup}
          <tr>
            {#each headerGroup.headers as header}
              <th class="bg-neutral text-white">
                {#if header.id === "select"}
                  <label>
                    <input
                      type="checkbox"
                      class="checkbox checkbox-secondary"
                      on:click={() => $table.toggleAllRowsSelected()}
                      checked={$table.getIsAllRowsSelected()}
                      indeterminate={$table.getIsSomeRowsSelected()}
                    />
                  </label>
                {:else}
                  <svelte:component
                    this={flexRender(
                      // @ts-expect-error
                      $_(header.column.columnDef.header),
                      header.getContext()
                    )}
                  />
                {/if}
              </th>
            {/each}
          </tr>
        {/each}
      </thead>
      {#if isLoading}
        <progress class="progress w-full" />
      {:else if isError}
        <p>Error: {JSON.stringify(error)}</p>
      {:else if isSuccess}
        <tbody class="overflow-auto">
          {#each $table.getRowModel().rows as row}
            <tr class="hover">
              {#each row.getVisibleCells() as cell}
                <td>
                  {#if cell.column.id === "select"}
                    <label>
                      <input
                        type="checkbox"
                        class="checkbox checkbox-secondary"
                        on:click={() => row.toggleSelected()}
                        checked={row.getIsSelected()}
                      />
                    </label>
                  {:else}
                    <svelte:component
                      this={flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    />
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      {/if}
    </table>
  </div>
</main>

<style>
  :root {
    background-color: whitesmoke;
  }
</style>

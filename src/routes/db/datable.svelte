<script lang="ts">

  import {
    DisplayBodyCell,
      Render,
      Subscribe,
      createRender,
      createTable
  } from "svelte-headless-table";
  import {
    addHiddenColumns,
    addPagination,
    addSelectedRows,
    addSortBy,
    addTableFilter
  } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
  import * as Table from "$lib/components/ui/table";
  import DatableActions from "./datable-actions.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  import type { Volunteer } from './sort'; // Import the type directly from sort.ts
  
  export let data: Volunteer[];
  
  // // Example processing function (if needed)
  // $: processedData = processData(data);
  
  // function processData(volunteers: Volunteer[]) {
  //     // Process data as needed
  //     return volunteers;
  // }
  
  const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
  });
  
  const columns = table.createColumns([
    table.column({
      accessor: "Name",
      header: "Name",
      plugins: {
        sort: {
          disable: false,
        },
        filter: {
          exclude: false,
        },
      },
    }),
    table.column({
      accessor: "Birthday",
      header: "Birthday",
      plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: false,
        },
      },
    }),
    table.column({
      accessor: "_id",
      header: "id",
      plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
  
  const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
  </script>
  
  <div>
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter emails..."
      type="text"
      bind:value={$filterValue}
    />
  </div>
  
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
              <Subscribe
                attrs={cell.attrs()}
                let:attrs
                props={cell.props()}
                let:props>
                
                <Table.Head {...attrs}>
                  <!-- Name Sort -->
                  {#if cell.id === "Name"}
                  <div class="flex items-center justify-between">
                    <Render of={cell.render()} />
                    <Button variant="ghost" on:click={props.sort.toggle} class="flex-shrink-0">
                      <i class="fa-solid fa-sort"></i>
                    </Button>
                  </div>
                    
                    
                  <!-- {:else if cell.id === "email"} -->
                  {:else}
                    <Render of={cell.render()} />
                  {/if}

                </Table.Head>
              </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  
  <div class="flex items-center justify-end space-x-4 py-4">
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
  </div>
<script lang="ts">

import {
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

  import { array } from './sort'; // Import sorting logic
  import { Button } from "$comp/ui/button";
  import * as Table from "$comp/ui/table";

  import type { Volunteer } from './sort'; // Import the type directly from sort.ts

export let data: Volunteer[];

// // Example processing function (if needed)
// $: processedData = processData(data);

// function processData(volunteers: Volunteer[]) {
//     // Process data as needed
//     return volunteers;
// }

  const table = createTable(readable(data));

  const columns = table.createColumns([
    table.column({
      accessor: "Name",
      header: "Name",
    }),
    table.column({
      accessor: "Birthday",
      header: "Birthday",
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
  table.createViewModel(columns);
</script>

<div class="rounded-md border">
  <Table.Root {...$tableAttrs}>
    <Table.Header>
      {#each $headerRows as headerRow}
        <Subscribe rowAttrs={headerRow.attrs()}>
          <Table.Row>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                <Table.Head {...attrs}>
                  <Render of={cell.render()} />
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
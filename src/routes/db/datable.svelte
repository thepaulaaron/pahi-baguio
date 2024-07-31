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
    addTableFilter,
  } from "svelte-headless-table/plugins";
  import { readable, writable, type Writable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DatableActions from "./datable-actions.svelte";
  import { Button } from "$comp/ui/button";
  import * as DropdownMenu from "$comp/ui/dropdown-menu";

  import type { Volunteer } from './sort'; // Import the type directly from sort.ts

  export let data: Volunteer[];
  export let filterValue: Writable<string>;

  const table = createTable(readable(data), {
    page: addPagination(),
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    hide: addHiddenColumns()
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
          // [ ] TODO: correct sort, correct format
          disable: false,
        },
        filter: {
          exclude: false,
        },
      },
    }),
    table.column({
      accessor: "VolType",
      header: "Volunteer Type",
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

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, } =
    table.createViewModel(columns);

    const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
    const { filterValue: tableFilterValue } = pluginStates.filter;

  // Update table filter value when the filterValue store changes
  filterValue.subscribe(value => {
    tableFilterValue.set(value);
  });

  function handleFilterInput(event: { detail: string; }) {
    filterValue.set(event.detail);
  }

  const { hiddenColumnIds } = pluginStates.hide;
  const ids = flatColumns.map((col) => col.id);
  // let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  // Initially hide columns
  let hideForId = Object.fromEntries(ids.map((id) => [id, !['_id', 'cum_twrr_cons'].includes(id)]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

  const hidableCols = ["Birthday", "VolType", "_id"];

  // List of volunteer types
  const volTypes = ['Student', 'Faculty', 'Staff', 'Alumnus', 'Friend'];

  // Store for the selected volunteer type
  const selectedVolType = writable<string>('');

  function handleTypeSelect(type: string) {
    selectedVolType.set(type);
    tableFilterValue.set(type); // Update table filter immediately
  }
</script>

<!-- Columns -->

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="outline" class="ml-auto" builders={[builder]}>
      Columns&nbsp;
      <i class="fa-solid fa-chevron-down text-l]"></i>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    {#each flatColumns as col}
      {#if hidableCols.includes(col.id)}
        <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
          {col.header}
        </DropdownMenu.CheckboxItem>
      {/if}
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>

<!-- VolType Filter Dropdown -->
<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="outline" class="ml-auto" builders={[builder]}>
      Type&nbsp;
      <i class="fa-solid fa-chevron-down"></i>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    {#each volTypes as volType}
      <DropdownMenu.Item on:click={() => handleTypeSelect(volType)}>
        {volType}
      </DropdownMenu.Item>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>

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
              let:props
            >
              <Table.Head {...attrs}>
                {#if cell.id === "Name" || cell.id === "Birthday"}
                <div class="flex items-center justify-between">
                  <Render of={cell.render()} />
                  <Button
                    variant="ghost"
                    on:click={props.sort.toggle}
                    class="flex-shrink-0"
                  >
                    <i class="fa-solid fa-sort"></i>
                  </Button>
                </div>
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
    disabled={!$hasPreviousPage}
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    disabled={!$hasNextPage}
    on:click={() => ($pageIndex = $pageIndex + 1)}
  >
    Next
  </Button>
</div>
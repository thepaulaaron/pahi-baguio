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
  import { get, readable, writable, type Writable } from "svelte/store";
  import * as Table from "$lib/components/ui/table";
  import DatableActions from "./datable-actions.svelte";
  import { Button } from "$comp/ui/button";
  import * as DropdownMenu from "$comp/ui/dropdown-menu";

  import type { Volunteer } from './sort'; // Import the type directly from sort.ts

  export let data: Volunteer[];
  export let filterValue: Writable<string>;
  export let selectedVolType: Writable<string>;

  const rowsPerPage   = 12; // Define the number of rows per page
  const currentPage   = writable(0);
  const filteredData  = writable<Volunteer[]>(data);
  const paginatedData = writable<Volunteer[]>([]);

  // Reactive statement to update filteredData when selectedVolType or filterValue changes
  $: {
    selectedVolType.subscribe(volType => {
      const currentFilterValue = $filterValue.toLowerCase();
      filteredData.set(
        data.filter(item => {
          const matchesSearch = item.Name.toLowerCase().includes(currentFilterValue);
          const matchesVolType = volType === 'All' || item.VolType === volType;
          return matchesSearch && matchesVolType;
        })
      );
    });
  }

  // Reactive statement to update paginatedData when filteredData or currentPage changes
  $: {
    $filteredData;
    $currentPage;
    const start = $currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    paginatedData.set(
      $filteredData.slice(start, end)
    );
  }

  const table = createTable(paginatedData, {
    sort: addSortBy(),
    filter: addTableFilter({
      fn: ({ value }) => {
        console.log(value);
        return true;
      }
    }),
    hide: addHiddenColumns()
  });

  const columns = table.createColumns([
    table.column({
      accessor: "Name",
      header: "Name",
      plugins: {
        sort: { disable: false },
        filter: { exclude: false },
      },
    }),
    table.column({
      accessor: "Birthday",
      header: "Birthday",
      plugins: {
        sort: { disable: false },
        filter: { exclude: false },
      },
    }),
    table.column({
      accessor: "VolType",
      header: "Volunteer Type",
      plugins: {
        sort: { disable: true },
        filter: { exclude: false },
      },
    }),
    table.column({
      accessor: "_id",
      header: "id",
      plugins: {
        sort: { disable: true },
        filter: { exclude: true },
      },
    }),
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
    table.createViewModel(columns);

  const { filterValue: tableFilterValue } = pluginStates.filter;

  filterValue.subscribe(value => {
    tableFilterValue.set(value);
  });

  function nextPage() {
    currentPage.update(n => {
      const totalPages = Math.ceil($filteredData.length / rowsPerPage);
      return n < totalPages - 1 ? n + 1 : n;
    });
  }

  function prevPage() {
    currentPage.update(n => Math.max(n - 1, 0));
  }

  function handleFilterInput(event: { detail: string; }) {
    filterValue.set(event.detail);
  }

  const { hiddenColumnIds } = pluginStates.hide;
  const ids = flatColumns.map((col) => col.id);

  let hideForId = Object.fromEntries(ids.map((id) => [id, !['_id', 'cum_twrr_cons'].includes(id)]));
  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

  const hidableCols = ["Birthday", "VolType", "_id"];
  const volTypes = ['Student', 'Faculty', 'Staff', 'Alumnus', 'Friend'];

  let selectedTypeDisplay = 'All';
  $: {
    selectedVolType.subscribe(type => {
      selectedTypeDisplay = type || 'All';
    });
  }

  function handleTypeSelect(type: string) {
    selectedVolType.set(type);
  }

</script>
<!-- Pagination controls -->
<div class="flex items-center justify-end space-x-4 py-4">
  <Button
    variant="outline"
    size="sm"
    on:click={prevPage}
    disabled={$currentPage === 0}
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    on:click={nextPage}
    disabled={($currentPage + 1) * rowsPerPage >= $filteredData.length}
  >
    Next
  </Button>
</div>
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
      {selectedTypeDisplay}&nbsp;
      <i class="fa-solid fa-chevron-down"></i>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item on:click={() => handleTypeSelect('All')}>All</DropdownMenu.Item>
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
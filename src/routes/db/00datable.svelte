<script lang="ts">
  import {
    Render,
    Subscribe,
    createTable,
    createRender,
  } from "svelte-headless-table";
  import {
    addHiddenColumns,
    addSortBy,
    addTableFilter
  } from "svelte-headless-table/plugins";
  import { writable, type Writable } from "svelte/store";

  // UI components
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$comp/ui/button";
  import * as DropdownMenu from "$comp/ui/dropdown-menu";
  import * as Dialog from "$comp/ui/dialog";
  import DatableActions from "./datable-actions.svelte";

  // Types
  import type { Volunteer } from './sort'; // Import the type directly from sort.ts
	import { Alert } from "$lib/components/ui/alert";
	import { Badge } from "$comp/ui/badge";

  export let data: Volunteer[];
  export let filterValue: Writable<string>;
  export let selectedVolType: Writable<string>;
  const dataStore = writable<Volunteer[]>([]);

  // Pagination state
  const rowsPerPage = 13;
  const currentPage = writable(0);
  const totalPages = writable(0);
  const canGoPrev = writable(true);
  const canGoNext = writable(true);

  const filteredData = writable<Volunteer[]>([]);
  const paginatedData = writable<Volunteer[]>([]);

  // Update data store with incoming data
  $: dataStore.set(data);

  // Update filteredData when selectedVolType or filterValue changes
  $: {
    selectedVolType.subscribe(volType => {
      const currentFilterValue = $filterValue.toLowerCase();
      const newFilteredData = $dataStore.filter(item => {
        const matchesSearch = item.Name.toLowerCase().includes(currentFilterValue);
        const matchesVolType = volType === 'All' || item.VolType === volType;
        return matchesSearch && matchesVolType;
      });

      filteredData.set(newFilteredData);

      // Reset page and total pages on new filter
      currentPage.set(0);
      totalPages.set(Math.ceil(newFilteredData.length / rowsPerPage));
    });
  }

  // Update paginatedData when filteredData or currentPage changes
  $: {
    $filteredData;
    const numFilteredItems = $filteredData.length;
    $totalPages = Math.ceil(numFilteredItems / rowsPerPage);

    // Adjust currentPage if it is out of range
    $currentPage = Math.min($currentPage, $totalPages - 1);

    if (numFilteredItems === 0) {
      paginatedData.set([]);
    } else {
      const startIndex = $currentPage * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, numFilteredItems);
      paginatedData.set($filteredData.slice(startIndex, endIndex));
    }

    // Determine if the previous and next buttons should be enabled
    canGoPrev.set($currentPage > 0 && numFilteredItems > 0);
    canGoNext.set($currentPage < $totalPages - 1 && numFilteredItems > 0);
  }

  // Create table with paginated data
  const table = createTable(paginatedData, {
    sort: addSortBy(),
    filter: addTableFilter(),
    hide: addHiddenColumns()
  });

  type ColumnConfig = {
    accessor: keyof Volunteer;
    header: string;
    sort: boolean;
    filter: boolean;
    customRender?: (value: any) => any; // Optional custom render function
  };

  const columnsConfig: ColumnConfig[] = [
    { accessor: "Name", header: "Name", sort: true, filter: true },
    { accessor: "Birthday", header: "Birthday", sort: true, filter: true },
    { accessor: "VolType", header: "Volunteer Type", sort: false, filter: true },
    { accessor: "_id", header: "", sort: false, filter: false, customRender: (value) => createRender(DatableActions, { id: value }) },
  ];

  const columns = table.createColumns(
    columnsConfig.map(({ accessor, header, sort, filter, customRender }) =>
      table.column({
        accessor,
        header,
        cell: customRender ? ({ value }) => customRender(value) : undefined,
        plugins: {
          sort: { disable: !sort },
          filter: { exclude: !filter },
        }
      })
    )
  );

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
    table.createViewModel(columns);

  const { filterValue: tableFilterValue } = pluginStates.filter;

  filterValue.subscribe(value => {
    tableFilterValue.set(value);
  });

  const { hiddenColumnIds } = pluginStates.hide;
  const ids = flatColumns.map((col) => col.id);

  const hidableCols = ["Birthday", "VolType"];
  const volTypes = ['Student', 'Faculty', 'Staff', 'Alumnus', 'Friend'];

  const initiallyVisibleColumns = ['Name', 'Birthday', 'VolType', "_id"];
  let hideForId = Object.fromEntries(ids.map((id) => [id, initiallyVisibleColumns.includes(id)]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

  let selectedTypeDisplay = 'All';
  $: {
    selectedVolType.subscribe(type => {
      selectedTypeDisplay = type || 'All';
    });
  }

  function handleTypeSelect(type: string) {
    selectedVolType.set(type);
  }

  function changePage(newPage: number) {
    if (newPage >= 0 && newPage < $totalPages) {
      currentPage.set(newPage);
    }
  }

  // For VolType Badges

  // Define a mapping of volunteer types to their corresponding classes
  const volTypeClasses: Record<string, string> = {
    Student: 'student',
    Faculty: 'faculty',
    Staff: 'staff',
    Alumnus: 'alumnus',
    Friend: 'friend'
  };

  // Function to get the class for a given volunteer type
  function getBadgeClass(volType: string): string {
    return "volunteer-badge " + volTypeClasses[volType] || ''; // Return an empty string if no class is found
  }

</script>

<div class="flex justify-between items-center -mt-5 -mb-5">

  <div id="left">
    <!-- Columns -->
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button 
          variant="outline"
          class="ml-auto py-4"
          size="sm" builders={[builder]}>
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
        <Button
        variant="outline"
        class="ml-auto py-4 min-w-[6.2rem] justify-between items-center"
        size="sm" builders={[builder]}>
          <div>{selectedTypeDisplay}&nbsp;</div>
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
  </div>

  <!-- Pagination Controls -->
  <div class="pagination-controls flex justify-between items-center space-x-2 py-4">
    <Button 
      variant="outline"
      size="sm"
      on:click={() => changePage($currentPage - 1)} 
      disabled={!$canGoPrev}
    >
      Prev
    </Button>
    <span class="text-sm w-10 text-center">
      {$currentPage + 1} of {$totalPages}
    </span>
    <Button
      variant="outline"
      size="sm"
      on:click={() => changePage($currentPage + 1)} 
      disabled={!$canGoNext}
    >
      Next
    </Button>
  </div>
  
  
</div>

<!-- Table -->

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
      <Subscribe rowAttrs={row.attrs()}>
        <Table.Row {...row.attrs()}>
          {#each row.cells as cell (cell.id)}
            <Subscribe attrs={cell.attrs()} let:attrs>
              <Table.Cell {...attrs}>
                {#if cell.id === "VolType"}
                <!-- Ensure the content is treated as a string before passing to getBadgeClass -->
                <Badge variant="secondary" class={getBadgeClass(String(cell.render()))}>
                  {cell.render()}
                </Badge>
              {:else}
                <!-- Default rendering for other cells -->
                <Render of={cell.render()} />
              {/if}
              </Table.Cell>
            </Subscribe>
          {/each}
        </Table.Row>
      </Subscribe>
    {/each}
  </Table.Body>  
</Table.Root>
</div>

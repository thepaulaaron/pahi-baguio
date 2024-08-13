<script lang="ts">
  import {
    Render,
    Subscribe,
    createTable
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

  // Types
  import type { Volunteer } from './sort'; // Import the type directly from sort.ts

  export let data: Volunteer[];
  export let filterValue: Writable<string>;
  export let selectedVolType: Writable<string>;

  // Comment out pagination logic
  // const rowsPerPage = 12;
  // const currentPage = writable(0);
  const filteredData = writable<Volunteer[]>(data);
  const sortedData = writable<Volunteer[]>([]);

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

  // Reactive statement to sort filteredData and update sortedData
  $: {
    $filteredData;
    const sorted = [...$filteredData].sort((a, b) => {
      // Default sorting logic (sort by Name)
      return a.Name.localeCompare(b.Name);
    });
    sortedData.set(sorted);
  }

  // Create table with full data
  const table = createTable(sortedData, {
    sort: addSortBy(),  // Default sort configuration without custom `fn`
    filter: addTableFilter(),
    hide: addHiddenColumns()
  });

  type ColumnConfig = {
    accessor: keyof Volunteer;
    header: string;
    sort: boolean;
    filter: boolean;
  };

  const columnsConfig: ColumnConfig[] = [
    { accessor: "Name", header: "Name", sort: true, filter: true },
    { accessor: "Birthday", header: "Birthday", sort: true, filter: true },
    { accessor: "VolType", header: "Volunteer Type", sort: false, filter: true },
    { accessor: "_id", header: "id", sort: false, filter: false }
  ];

  const columns = table.createColumns(
    columnsConfig.map(({ accessor, header, sort, filter }) =>
      table.column({
        accessor,
        header,
        plugins: {
          sort: { disable: !sort },
          filter: { exclude: !filter }
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

<!-- Remove pagination controls -->

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
    <Button variant="outline" class="ml-auto min-w-[7.5rem] justify-between items-center" builders={[builder]}>
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

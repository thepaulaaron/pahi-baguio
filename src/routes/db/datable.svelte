<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import DatableActions from "./datable-actions.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  import { Button } from "$lib/components/ui/button/index.js";
  import Input from "$lib/components/ui/input/input.svelte";

  import { readable, writable } from "svelte/store";
  
  
  import { createRender, createTable, Render, Subscribe } from "svelte-headless-table";
  import { addSortBy, addPagination, addTableFilter, addHiddenColumns } from "svelte-headless-table/plugins";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";

  // Data Store
  export let data: Record<string, any>[] = [];
  console.log(data);

  // Initialize the writable store with an explicit type
  const dataStore = writable<Record<string, any>[]>([]);

  $: {

   // Filter out rows where all values are invalid (undefined, null, or empty)
   const validData = data.filter((record) => {
    // Check if there is at least one valid value in the row (excluding _id)
    return Object.entries(record)
      .filter(([key]) => key !== "_id") // Exclude the '_id' key
      .some(([_, value]) => value !== undefined && value !== null && value !== ""); // Check the value
  });

  // Process data to add 'Name' field dynamically
  const processedData = validData.map((record) => ({
    ...record,
    Name: [
      record.Fname      || "", // Use empty string if `FirstName` is undefined
      record.Midname    || "",   // Use empty string if `MidName` is undefined
      record.Surname    || "",
      record.Suffixname || ""    // Use empty string if `Surname` is undefined
    ]
    .filter((entry) => entry && entry.trim() !== "") // Purge empty or invalid values
    .join(" "),
  }));
  dataStore.set(processedData); // Update the store with processed data
}

  // Initialize the table
  const table = createTable(dataStore, {
    sort: addSortBy({
      toggleOrder: ["asc", "desc"],
    }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    hide: addHiddenColumns(),
  });

  // Column configuration
  type ColumnConfig = {
    accessor: string; // Using 'string' for accessor to accommodate all column names
    header: string;
    sort: boolean;
    filter: boolean;
    customRender?: (value: any, row: any) => any; // Optional custom render function
  };

  const columnsConfig: ColumnConfig[] = [
    { accessor: "Fname",      header: "First",            sort: true,   filter: true },
    { accessor: "Midname",    header: "Middle",           sort: true,   filter: true },
    { accessor: "Surname",    header: "Surname",          sort: true,   filter: true },
    { accessor: "Name",       header: "Name",             sort: true,   filter: true },
    { accessor: "StudNum",    header: "Student Number",   sort: true,   filter: true },
    { accessor: "UPMail",     header: "Email",            sort: true,   filter: true },
    { accessor: "MobNum",     header: "Phone",            sort: true,   filter: false },
    { accessor: "Birthday",   header: "Birthday",         sort: true,   filter: true },
    { accessor: "VolType",    header: "Volunteer Type",   sort: false,  filter: true },
    { accessor: "_id",        header: "ID",               sort: false,  filter: false },
    {
		accessor: "action",
		header: "",
		customRender: (value: any, row: any) => createRender(DatableActions, { id: row._id }),
		sort: false,
		filter: false
	},
  ];

  const columns = table.createColumns(
    columnsConfig.map(({ accessor, header, sort, filter, customRender }) =>
      table.column({
        accessor,
        header,
        cell: customRender
          ? ({ value, row }: { value: any; row: any }) => customRender(value, row)
          : undefined,
        plugins: {
          sort: { disable: !sort },
          filter: { exclude: !filter },
        },
      })
    )
  );

  // Table ViewModel
  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } = table.createViewModel(columns);
  const { filterValue } = pluginStates.filter;
  const { hiddenColumnIds } = pluginStates.hide;
  const ids = flatColumns.map((col) => col.id);

  const hidableCols = ["Birthday", "VolType", "_id", 'StudNum'];
  const initiallyVisibleColumns = ['Name', 'Fname', 'Midname', 'Surname', 'StudNum', 'Birthday', 'VolType', "_id", "action"];
  let hideForId = Object.fromEntries(ids.map((id) => [id, initiallyVisibleColumns.includes(id)]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);
</script>

<div class="space-y-3">

  <!-- Search and Column Visibility Dropdown -->
<div class="flex items-center justify-between">
  <div class="flex flex-1 items-center space-x-3">
    <Input
      placeholder="Search..."
      class="h-8 w-[150px] lg:w-[250px]"
      type="search"
      bind:value={$filterValue}
    />

    <div>asds</div>
  </div>

  <div>
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
  </div>
</div>

<!-- Table Display -->
<div>
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                  <Table.Head {...attrs}>
                    {#if cell.id === "Surname" || cell.id === "StudNum" || cell.id === "Name"}
                      <div class="flex items-center p-1 h-8 w-[150px] lg:w-[250px]">
                        <Render of={cell.render()} />
                        <Button
                          variant="ghost"
                          on:click={props.sort.toggle}
                          class="ml-1 p-0.5 h-5 w-7"
                        >
                          <ArrowUpDown class="w-4" />
                        </Button>
                      </div>
                    {:else}
                      <div class="flex items-center p-1">
                        <Render of={cell.render()} />
                      </div>
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
                    <div class="flex items-center pl-1">
                      <Render of={cell.render()} />
                    </div>
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>

</div>
<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import DatableActions from "./datable-actions.svelte";
  import AddUser from "./adder.svelte"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import ImportModal from "$lib/components/ImportModal.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import Input from "$lib/components/ui/input/input.svelte";

  import { readable, writable } from "svelte/store";
  import { createRender, createTable, Render, Subscribe } from "svelte-headless-table";
  import { addSortBy, addPagination, addTableFilter, addHiddenColumns } from "svelte-headless-table/plugins";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
	import Settings2 from "lucide-svelte/icons/settings-2";
	import { Badge } from "$lib/components/ui/badge";
	import { showAddUserModal } from "$str";
	import type { Volunteer } from "$lib/models/volunteerModel";

  // ------------------ LET-TERS

  // Data Store
  // export let data: Record<string, any>[] = [];
  export let data: Volunteer[] = [];
  
  // console.log(data);

  // Initialize the writable store with an explicit type
  const dataStore = writable<Record<string, any>[]>([]);
  const selectedVolunteer = writable<Record<string, any> | null>(null);
  const selectedVolType = writable<string | null>(null);
  const showPopup = writable(false);
  const isOpenImport = writable(false);

  // State for toggling name display format
  let nameFormat = writable<'firstLast' | 'lastFirst'>('firstLast');

  $: {
  // Filter out rows where all values are invalid (undefined, null, or empty), excluding _id
  const validData = data.filter((record) => {
    return Object.entries(record)
      .filter(([key]) => key !== "_id") // Exclude the '_id' key
      .some(([_, value]) => value !== undefined && value !== null && value !== ""); // Check the value
  });

  // Apply volType filter
  const filteredByVolType = $selectedVolType
  ? validData.filter(record => record.VolType === $selectedVolType)
  : validData;

  const finalData = filteredByVolType.map((record) => ({
    ...record,
    Name: $nameFormat === 'firstLast'
      // Format: First name first
      ? [record.Fname || "", record.Midname || "", record.Surname || "", record.Suffixname || ""].filter(Boolean).join(" ")
      // Format: Surname first
      : [record.Surname ? `${record.Surname},` : "",
         record.Fname || "", record.Midname || "", record.Suffixname || ""]
      .filter(Boolean).join(" ")
  }));

  dataStore.set(finalData);
}

  export let handleDelete: (row_id: any) => void;
  export let handleEdit: (row: any) => void;
  export let handleAdd: (row: any) => void;
  export let handleImport: (row: any) => void;

  // TABLE: Initialization
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
    { accessor: "Name",       header: "Name",             sort: true,   filter: true },
    { accessor: "StudNum",    header: "Student Num",   sort: true,   filter: true },
    { accessor: "UPMail",     header: "UP Mail",            sort: true,   filter: true },
    { accessor: "PersonalMail",     header: "Personal Mail",            sort: true,   filter: false },
    { accessor: "MobNum",     header: "Phone",            sort: true,   filter: false },
    { accessor: "Birthday",   header: "Birthday",         sort: true,   filter: true },
    { accessor: "_id",        header: "ID",               sort: false,  filter: false },
    {
		accessor: "action",
		header: "",
    customRender: (value: any, row: any) => {

      // ----- for indiv id
      // const id = row.original._id;
      // return createRender(DatableActions, { id });

      return createRender(DatableActions, { row, handleDelete, handleEdit });  // Pass the entire row
    },
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

  const hidableCols = ["Birthday", "VolType", "_id", 'StudNum', "MobNum"];
  const initiallyVisibleColumns = ['Name', 'StudNum', "MobNum", 'UPMail', 'PersonalMail', 'Birthday', "action"];
  let hideForId = Object.fromEntries(ids.map((id) => [id, initiallyVisibleColumns.includes(id)]));

  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);

// ------------------ FUNCTIONS

function toggleNameFormat() {
  nameFormat.update(current => current === 'firstLast' ? 'lastFirst' : 'firstLast');
}

  // ----- For VolType Badges

  function getVolTypeByRowId(row: any): string | null {
  // Access the row data from row.original
  const rowData = row.original; 
  return rowData?.VolType || null;  // Return the VolType from the row data
}

  // Define a mapping of volunteer types to their corresponding classes
  const volTypeClasses: Record<string, string> = {
    Student: 'student',
    Faculty: 'faculty',
    Staff: 'staff',
    Alumnus: 'alumnus',
    Friend: 'friend'
  };

  const volTypes = Object.keys(volTypeClasses);

  function handleTypeSelect(type: any) {
    selectedVolType.set(type);
  }

  $: selectedTypeDisplay = $selectedVolType ?? 'All Types';

  // Function to get the class for a given volunteer type
  function getBadgeClass(volType: string): string {
    return "volunteer-badge " + volTypeClasses[volType] || ''; // Return an empty string if no class is found
  }

  function openIMPORT() {
    isOpenImport.set(true);
  }

  function closeIMPORT () {
    isOpenImport.set(false);
  }
</script>

{#if $showAddUserModal}
  <AddUser on:close={() => showAddUserModal.set(false)} exportHandleAdd={handleAdd} />
{/if}


<ImportModal
  bind:open={$isOpenImport}
  onClose={closeIMPORT}
  exportHandleImport={handleImport}
/>

<div class="space-y-3">

<!-- Table Modifiers, Filters, etc. -->
<div class="flex items-center justify-between">

  <div id="LEFT" class="flex flex-1 items-center space-x-3">
    
    <!-- Search Bar -->
    <Input
      placeholder="Search..."
      class="h-8 w-[150px] lg:w-[250px]"
      type="search"
      bind:value={$filterValue}
    />
    
    <!-- Add User -->
    <Button variant="default" size="sm" on:click={() => showAddUserModal.set(true)}>
      Add New
    </Button>

    <Button variant="default" size="sm" on:click={openIMPORT}>
      Import
    </Button>

  </div>

  <div id="RIGHT" >
    <!-- VolType Filter Dropdown -->
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button
          variant="outline"
          class="h-8 px-2 border rounded justify-between min-w-[6rem]"
          size="sm"
          builders={[builder]}>
          <span>{selectedTypeDisplay}</span>
          <i class="fa-solid fa-chevron-down ml-2"></i>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content class="z-50">
        <DropdownMenu.Item on:click={() => handleTypeSelect(null)}>
          All Types
        </DropdownMenu.Item>
        {#each volTypes as type}
          <DropdownMenu.Item on:click={() => handleTypeSelect(type)}>
            {type}
          </DropdownMenu.Item>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>

    <!-- Show/Hide Columns -->
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
                  <Table.Head {...attrs} class="header-cell">
                    {#if cell.id === "StudNum"}
                      <div class="flex justify-between items-center p-1 h-8 w-13
                                whitespace-nowrap sm:whitespace-normal
                                md:whitespace-nowrap lg:whitespace-nowrap">
                        <Render of={cell.render()} />
                        <Button
                          variant="ghost"
                          on:click={props.sort.toggle}
                          class="ml-1 p-0.5 h-5"
                        >
                          <ArrowUpDown class="w-4" />
                        </Button>
                      </div>
                    {:else if cell.id === "Name"}
                      <div class="flex justify-between items-center p-1 h-8">
                        <Render of={cell.render()} />

                        <div class="flex">
                          <Button 
                          variant="ghost"
                          on:click={toggleNameFormat}
                          class="ml-1 p-0.5 h-5 w-7">
                          <Settings2 class="w-4"/>
                          </Button>

                          <Button
                            variant="ghost"
                            on:click={props.sort.toggle}
                            class="ml-1 p-0.5 h-5 w-7">
                            <ArrowUpDown class="w-4" />
                          </Button>
                        </div>
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
                      
                      {#if cell.id === 'Name'}
                        <div class="flex justify-between items-center w-full">
                          <Render of={cell.render()} />

                          <Badge 
                            variant="secondary" 
                            class={`mr-2 ${getBadgeClass(getVolTypeByRowId(row) || '')}`}>
                            {getVolTypeByRowId(row) || 'N/A'}
                          </Badge>
                        </div>

                      <!-- {:else if cell.id === 'action'}
                        <DatableActions 
                          id={row.id}
                          volunteer={row.props()} /> -->
                      
                      {:else}
                        <Render of={cell.render()} />
                    {/if}
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
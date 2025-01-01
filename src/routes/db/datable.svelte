<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import DatableActions from "./datable-actions.svelte";

  import { createRender, createTable, Render, Subscribe  } from "svelte-headless-table";
  import { addSortBy, addPagination, addTableFilter } from "svelte-headless-table/plugins";
  import { readable, writable } from "svelte/store";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
  import { Button } from "$lib/components/ui/button/index.js";
	import type { Volunteer } from "./sort";
	import Input from "$lib/components/ui/input/input.svelte";

  export let data: Record<string, any>[] = []; // MongoDB data
  const dataStore = writable<Volunteer[]>([]);

  $: dataStore.set(data as Volunteer[]);

  // const dataStore = writable(data);
  const table = createTable(dataStore, {
    sort: addSortBy({
			toggleOrder: ["asc", "desc"],
		}),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
    }),
  });

  const columns = table.createColumns([
    table.column({
      header: "Surname",
      accessor: "Surname",
      plugins: {
        sort: {
          disable: false
        },
        filter: {
          exclude: false
        }
      },
    }),
    table.column({
      header: "Student Number",
      accessor: "StudNum",
      plugins: {
        sort: {
          disable: false
        },
        filter: {
          exclude: false
        }
      },
    }),
    table.column({
      header: "Email",
      accessor: "UPMail",
      plugins: {
        sort: {
          disable: false
        },
        filter: {
          exclude: false
        }
      },
    }),
    table.column({
      header: "Phone",
      accessor: "MobNum",
      plugins: { sort: { disable: false } },
    }),
    
    table.column({
      accessor: "_id",
      header: "ideh",
    }),

    table.column({
      accessor: ({ _id }) => _id,
      header: "",
      cell: ({ value }) => {
        return createRender(DatableActions, { id: value });
      },
    }),
  ]);

  // const { rows, headerRows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns);

  // const { sortKeys } = pluginStates.sort;
  // const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  // const { filterValue } = pluginStates.filter;
  // const { selectedDataIds } = pluginStates.select;

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
  
  const { filterValue } = pluginStates.filter;
</script>

<div class="flex items-center justify-between">
  <div class="flex flex-1 items-center space-x-2">
    <Input
      placeholder="Search..."
      class="h-8 w-[150px] lg:w-[250px]"
      type="search"
      bind:value={$filterValue}
    />

  <div>dedef</div>
  </div>

  <div>dedesf</div>
</div>


<!-- <div class="rounded-md border">
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>Name</Table.Head>
        <Table.Head>Birthday</Table.Head>
        <Table.Head>Volunteer Type</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each $dataStore as volunteer (volunteer._id)}
        <Table.Row>
          <Table.Cell>{volunteer.Fname} {volunteer.Midname} {volunteer.Surname}</Table.Cell>
          <Table.Cell>{volunteer.Birthday}</Table.Cell>
          <Table.Cell>{volunteer.VolType}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div> -->

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
                  {#if cell.id === "Surname"}
                    <Button variant="ghost" on:click={props.sort.toggle}>
                      <Render of={cell.render()} />
                      <ArrowUpDown class={"ml-2 h-4 w-4"} />
                    </Button>
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
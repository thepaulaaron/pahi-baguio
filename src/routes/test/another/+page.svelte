<!-- MainPage.svelte -->

<script>
// @ts-nocheck

  import Button from "$lib/components/ui/button/button.svelte";
  import * as Table from "$lib/components/ui/table";
  import { array, setSort } from './sort.js'; // Import sorting logic

  // Function to handle sorting
  function handleSort(column) {
    setSort(column);
  }
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>
        id
        <Button on:click={() => handleSort("id")}>sort</Button>
      </Table.Head>

      <Table.Head>
        val
        <Button on:click={() => handleSort("val")}>sort</Button>
      </Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each $array as row}
      <Table.Row>
        <Table.Cell>{row.id}</Table.Cell>
        <Table.Cell>{row.val}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>

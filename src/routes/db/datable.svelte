<script lang="ts">
  import { array, setSort } from './sort'; // Import sorting logic
  import { Button } from "$comp/ui/button";
  import * as Table from "$comp/ui/table";

  // Props
  export let data: { Name: string; Birthday: string }[] = [];

  // Function to handle sorting
  function handleSort(column: any) {
    setSort(column);
  }
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>
        Name
        <Button on:click={() => handleSort("Name")}>sort</Button>
      </Table.Head>

      <Table.Head>
        bday
        <Button on:click={() => handleSort("Birthday")}>sort</Button>
      </Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data as row}
      <Table.Row>
        <Table.Cell>{row.Name}</Table.Cell>
        <Table.Cell>{row.Birthday}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>

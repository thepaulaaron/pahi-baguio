<script lang="ts">
  import { writable } from "svelte/store";

  import type { Volunteer } from './sort';
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$comp/ui/button";

  export let data: Record<string, any>[] = [];
  const dataStore = writable<Volunteer[]>([]);


  $: dataStore.set(data as Volunteer[]);
</script>

<!-- Table -->
<div class="rounded-md border">
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
</div>

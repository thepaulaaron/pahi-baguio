<script lang="ts">
  import { onMount } from 'svelte';
  
  let data: { _id: string; Surname: string; Fname: string }[] = [];
  
  onMount(async () => {
    const res = await fetch('/api/volunteers');
    const fetchedData = await res.json();
    data = fetchedData;
  });
</script>

<table>
  <thead>
    <tr>
      <th>Volunteer Name</th>
      <th>Contact</th>
    </tr>
  </thead>
  <tbody>
    {#if data.length > 0}
      {#each data as volunteer}
        <tr>
          <td>{volunteer.Surname}</td>
          <td>{volunteer.Fname}</td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="2">No volunteers available.</td>
      </tr>
    {/if}
  </tbody>
</table>

<script lang="ts">
	import DarkToggle from "$lib/components/dark-toggle.svelte";
	import { UserNav } from "$lib/components/dashboard";
	import { onMount, createEventDispatcher } from "svelte";
  import { toast } from "svelte-sonner";
	import Datable from "./datable.svelte";

  import { mode } from 'mode-watcher';
	import type { Volunteer } from "$lib/models/volunteerModel";

  // export let data: Record<string, any>[] = [];
  let data: Volunteer[] = [];
  const dispatch = createEventDispatcher();

  $: dark = $mode != 'light';

  onMount(async () => {
    const res = await fetch('/api/volunteers');
    data = await res.json();
  });

  async function handleEdit(row: any) {
    // console.log("Received in Dashboard [edit]: ", row);

    try {
      const res = await fetch(`/api/volunteers/${row._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row)
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const updated = await res.json();
      dispatch("saved", updated);
      console.log("Updated: ", JSON.stringify(row, null, 2));

      // Update the data for the table
      data = data.map(v => v._id === row._id ? row : v);

      toast.warning("Updated!", {
        duration: 2500
      });
    } catch (err) {
      console.error('Failed to update volunteer:', err);
    }
  }

  async function handleDelete(row_id : any) {
    // console.log("Received in Dashboard: ", row_id);
    
    try {
      const res = await fetch(`/api/volunteers/${row_id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        const errorText = await res.text(); // Only read once
        console.error('Delete failed:', errorText);
        alert('Delete failed: ' + errorText);
        return;
      }

      // ✅ Update local data to remove the deleted row
      data = data.filter(v => v._id !== row_id);
    } catch (err) {
      console.error('Failed to delete volunteer:', err);
    }
  }
</script>

<div class="h-full flex-1 flex-col space-y-5 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
      <h2 class="text-3xl font-bold flex items-center">
        <span class={(dark ? "text-3xl text-[#3578ca]" : "text-3xl text-pahi-blue")}>Pahi</span><span class={(dark ? "text-3xl text-[#ebebeb]" : "text-3xl text-black-300")}>Baguio</span>
        <span class="text-xl font-normal">&nbsp;|&nbsp;Dashboard</span>
      </h2>
			<p class="text-muted-foreground">Pahinungód Volunteer Database</p>
		</div>
		<div class="flex items-center space-x-2">
      <DarkToggle />
			<UserNav />
		</div>
	</div>
	<Datable {data} {handleDelete} {handleEdit} />
</div>

<!-- <div>
  <h2>Dashbsoard</h2>
  {#if data.length > 0}

  <Datable {data} /> -->

    <!-- <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {#each data as entry, index}
          <tr>
            <td colspan="2"><strong>Entry {index + 1}</strong></td>
          </tr>
          {#each Object.entries(entry) as [key, value]}
            <tr>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          {/each}
        {/each}
      </tbody>
    </table> -->
    
  <!-- {:else}
    <p>No data available.</p>
  {/if}
</div> -->

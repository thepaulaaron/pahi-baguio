<script lang="ts">
	import { UserNav } from "$lib/components/dashboard";
	import Datable from "./Datable.svelte";

  export let data: Record<string, any>[] = [];
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
			<p class="text-muted-foreground">This is Pahinungód's Volunteer Database.</p>
		</div>
		<div class="flex items-center space-x-2">
			<UserNav />
		</div>
	</div>
	<Datable {data} />
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

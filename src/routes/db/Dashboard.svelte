<script lang="ts">
	import DarkToggle from "$lib/components/dark-toggle.svelte";
	import { UserNav } from "$lib/components/dashboard";
	import Datable from "./datable.svelte";

  export let data: Record<string, any>[] = [];

  import { mode } from 'mode-watcher';
  $: dark = $mode != 'light';
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

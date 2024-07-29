<!-- DASHBOARD -->

<script lang="ts">
	
	import {
		// Datable,
		Search,
		UserNav,
	} from "../../lib/components/dashboard/index.js";
	import Overview from "./overview.svelte";

	// Shadcn Components

	import DarkToggle from "$comp/dark-toggle.svelte";
	import { Button } from "$comp/ui/button/index.js";
	import * as Card from "$comp/ui/card/index.js";
	import * as Tabs from "$comp/ui/tabs/index.js";
	// import DatePickerWithRange from "$lib/registry/new-york/example/date-picker-with-range.svelte";
	// import DashboardLight from "$lib/img/examples/dashboard-light.png?enhanced";
	// import DashboardDark from "$lib/img/examples/dashboard-dark.png?enhanced";

	// For Datable
  import Datable from "./datable.svelte"
	import { array } from './sort';
	import type { Volunteer } from './sort';

	let data: Volunteer[] = [];

	// Subscribe to the store to get data updates
	const unsubscribe = array.subscribe(value => {
			data = value;
	});

	// Cleanup subscription on component destroy
	onDestroy(() => {
			unsubscribe();
	});

	// For Dark Mode
	import { mode } from 'mode-watcher';
	let dark: boolean;
	$: dark = $mode !== 'light';

	// For Database Search
	import { writable } from 'svelte/store';
	import SearchBar from "./search-bar.svelte";
	import { onDestroy } from "svelte";
  let activeTab = writable('overview');

	const filterValue = writable('');
	function handleFilterInput(event: { detail: any; }) {
    filterValue.set(event.detail);
  }
</script>

<div class="hidden flex-col md:flex">
	
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-3xl font-bold flex items-center">
				<span class={(dark ? "text-[#3578ca]" : "text-pahi-blue")}>Pahi</span><span class={(dark ? "text-[#ebebeb]" : "text-black-300")}>Baguio</span>
				<span class="text-xl font-normal">&nbsp;|&nbsp;Dashboard</span>
			</h2>
			
			<div class="flex items-center space-x-2">
				<DarkToggle/>
				<UserNav />
				<!-- <Button size="sm">
					<Download class="mr-2 h-4 w-4" />
					Download
				</Button> -->
			</div>
		</div>

		<Tabs.Root bind:value={$activeTab} class="space-y-4">
			<div class="flex items-center space-x-3">
				<Tabs.List>
					<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
					<Tabs.Trigger value="database">Database</Tabs.Trigger>
					<Tabs.Trigger value="editor" disabled>Editor</Tabs.Trigger>
					<Tabs.Trigger value="settings" disabled>Settings</Tabs.Trigger>
				</Tabs.List>
				
				{#if $activeTab === 'database'}
          <SearchBar bind:filterValue={$filterValue} on:input={handleFilterInput} />
        {/if}
			</div>

			<!-- OVERVIEW -->
			<Tabs.Content value="overview" class="space-y-4">
				<Overview/>
			</Tabs.Content>

			<!-- Database -->
			<Tabs.Content value="database" class="space-y-4">
				<Datable {data} {filterValue}/>
			</Tabs.Content>

		</Tabs.Root>
	</div>
</div>
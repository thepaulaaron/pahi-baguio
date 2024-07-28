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
	import { Button } from "../../lib/components/ui/button/index.js";
	import * as Card from "../../lib/components/ui/card/index.js";
	import * as Tabs from "../../lib/components/ui/tabs/index.js";
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

	import { darkMode } from '$str';
	import { onDestroy } from "svelte";

    // To use the store in the component
    let dark: boolean;
    darkMode.subscribe(value => {
        dark = value;
    });
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
		<Tabs.Root value="overview" class="space-y-4">
			<Tabs.List>
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
				<Tabs.Trigger value="database">Database</Tabs.Trigger>
				<Tabs.Trigger value="reports" disabled>Reports</Tabs.Trigger>
				<Tabs.Trigger value="notifications" disabled>Notifications</Tabs.Trigger>
			</Tabs.List>

			<!-- OVERVIEW -->

			<Tabs.Content value="overview" class="space-y-4">
				<Overview/>
			</Tabs.Content>

			<!-- Database -->

			<Tabs.Content value="database" class="space-y-4">
				<Datable {data} />
			</Tabs.Content>

		</Tabs.Root>
	</div>
</div>
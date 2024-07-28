<!-- DASHBOARD -->

<script lang="ts">
	import Activity from "lucide-svelte/icons/activity";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import DollarSign from "lucide-svelte/icons/dollar-sign";
	import Download from "lucide-svelte/icons/download";
	import Users from "lucide-svelte/icons/users";
	
	import {
		// Datable,
		Search,
		UserNav,
	} from "../../lib/components/dashboard/index.js";

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
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
							<DollarSign class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">$45,2s31.89</div>
							<p class="text-xs text-muted-foreground">+20.1% from last month</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Subscriptions</Card.Title>
							<Users class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+2350</div>
							<p class="text-xs text-muted-foreground">+180.1% from last month</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Sales</Card.Title>
							<CreditCard class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+12,234</div>
							<p class="text-xs text-muted-foreground">+19% from last month</p>
						</Card.Content>
					</Card.Root>
					<Card.Root>
						<Card.Header
							class="flex flex-row items-center justify-between space-y-0 pb-2"
						>
							<Card.Title class="text-sm font-medium">Active Now</Card.Title>
							<Activity class="h-4 w-4 text-muted-foreground" />
						</Card.Header>
						<Card.Content>
							<div class="text-2xl font-bold">+573</div>
							<p class="text-xs text-muted-foreground">+201 since last hour</p>
						</Card.Content>
					</Card.Root>
				</div>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Card.Root class="col-span-4">
						<Card.Header>
							<Card.Title>Overview</Card.Title>
						</Card.Header>
						<Card.Content>
							<!-- <Overview /> -->
						</Card.Content>
					</Card.Root>
					<Card.Root class="col-span-3">
						<Card.Header>
							<Card.Title>Recent Sales</Card.Title>
							<Card.Description>You made 265 sales this month.</Card.Description>
						</Card.Header>
						<Card.Content>
							<!-- <RecentSales /> -->
						</Card.Content>
					</Card.Root>
				</div>
			</Tabs.Content>

			<!-- Database -->

			<Tabs.Content value="database" class="space-y-4">
				<Datable {data} />
			</Tabs.Content>

		</Tabs.Root>
	</div>
</div>
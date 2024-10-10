<script lang="ts">
  import Activity from "lucide-svelte/icons/activity";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import DollarSign from "lucide-svelte/icons/dollar-sign";
	import Download from "lucide-svelte/icons/download";
	import Users from "lucide-svelte/icons/users";

  import * as Card from "$comp/ui/card";

  import type { Volunteer } from "./sort";
  export let data: Volunteer[];
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <Card.Root>
    <Card.Header
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <Card.Title class="text-sm font-medium">Total Volunteers Today</Card.Title>
      <DollarSign class="h-4 w-4 text-muted-foreground" />
    </Card.Header>
    <Card.Content>
      <div class="text-2xl font-bold">{data.length} Volunteers</div>
      <p class="text-xs text-muted-foreground">+20.1% from last month</p>
    </Card.Content>
  </Card.Root>
  <Card.Root>
    <Card.Header
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <Card.Title class="text-sm font-medium">Student Volunteers</Card.Title>
      <Users class="h-4 w-4 text-muted-foreground" />
    </Card.Header>
    <Card.Content>
      <div class="text-2xl font-bold">+15</div>
      <p class="text-xs text-muted-foreground">+180.1% from last month</p>
    </Card.Content>
  </Card.Root>
  
  <Card.Root>
    <Card.Header
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <Card.Title class="text-sm font-medium">New Volunteers</Card.Title>
      <Activity class="h-4 w-4 text-muted-foreground" />
    </Card.Header>
    <Card.Content>
      <div class="text-2xl font-bold">+24</div>
      <p class="text-xs text-muted-foreground">Added from the previous semester</p>
    </Card.Content>
  </Card.Root>
  <Card.Root>
    <Card.Header
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <Card.Title class="text-sm font-medium">Active Volunteers</Card.Title>
      <Activity class="h-4 w-4 text-muted-foreground" />
    </Card.Header>
    <Card.Content>
      <div class="text-2xl font-bold">+573</div>
      <p class="text-xs text-muted-foreground">Last updated on: MM/DD/YYYY</p>
    </Card.Content>
  </Card.Root>
</div>
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
  <Card.Root class="col-span-4">
    <Card.Header>
      <Card.Title>Overview</Card.Title>
      <Card.Description>Pahi Volunteer Database</Card.Description>
    </Card.Header>
    <Card.Content>
      Hello there.
    </Card.Content>
  </Card.Root>
  <Card.Root class="col-span-3">
    <Card.Header>
      <Card.Title>Recent Updates</Card.Title>
      <Card.Description>Gained 24 new volunteers this month.</Card.Description>
    </Card.Header>
    <Card.Content>
     ...
    </Card.Content>
  </Card.Root>
</div>
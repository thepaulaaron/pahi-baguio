<script>
  import Activity from "lucide-svelte/icons/activity";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import DollarSign from "lucide-svelte/icons/dollar-sign";
	import Download from "lucide-svelte/icons/download";
	import Users from "lucide-svelte/icons/users";

  import * as Card from "$comp/ui/card";
</script>

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
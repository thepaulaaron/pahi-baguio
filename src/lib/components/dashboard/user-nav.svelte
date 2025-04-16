<script lang="ts">
	import * as Avatar from "../ui/avatar";
	import { Button } from "../ui/button";
	import * as DropdownMenu from "../ui/dropdown-menu";

	import { isAuthenticated } from '$str/auth';
	import { goto } from '$app/navigation';

	function handleLogout() {
		isAuthenticated.set(false); // Reset authentication state
		goto('/'); // Redirect to the login page
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src="/images/pahi-logo.png" style="background-color:azure;"/>
				<Avatar.Fallback>SC</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">Administrator</p>
				<p class="text-xs leading-none text-muted-foreground">Ugnayan ng Pahinungód</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<!-- <DropdownMenu.Item class="cursor-pointer">Settings</DropdownMenu.Item> -->
			<DropdownMenu.Item class="btn-logout" on:click={handleLogout}>Sign Out</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
<script lang="ts">
// @ts-nocheck
	import { Button } from "./ui/button";
	import * as Dialog from "./ui/dialog";
	import {Input} from "./ui/input";
	import {Label} from "./ui/label";

	import { mode } from 'mode-watcher';
	let dark: boolean;
	$: dark = $mode !== 'light';
</script>

<div class="flex items-center gap-4">

    <button class={"btn secondary" + (dark ? "-dark" : " ")}>
        <p class="text-base sm:text-lg md:text-xl">
            <i class="fa-solid fa-user text-xl">&nbsp;</i>
            As Guest</p>
    </button>

    <Dialog.Root>
        <Dialog.Trigger>

				<button class={"btn primary" + (dark ? "-dark" : " ")}>
					<p class="text-base sm:text-lg md:text-xl">
					<i class="fa-solid fa-user-tie text-xl">&nbsp;</i>
					As Admin</p>
				</button>

        </Dialog.Trigger>
        
				<Dialog.Content class="p-10">
					<Dialog.Header>
						<Dialog.Title>
							<i class="fa-solid fa-exclamation-triangle text-l text-[var(--pahi-red)]">&nbsp;</i>
							Admin Access Only</Dialog.Title>
						<Dialog.Description class="pt-4 text-justify text-base">
							This system is for authorized users of the Pahinungód. Unauthorized access is strictly prohibited and may result in legal action under the Data Privacy Act of the Philippines.
						</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4 py-3">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="name" class="text-right">Username</Label>
							<Input id="name" value="paul@pahi" class="col-span-3" />
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="username" class="text-right">Password</Label>
							<Input id="username" value="pass" class="col-span-3" />
						</div>
					</div>
					<Dialog.Footer>
						<Button type="submit" class="text-sm">Sign In</Button>
					</Dialog.Footer>
				</Dialog.Content>

      </Dialog.Root>

</div>

<script lang="ts">
	import { cubicInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	// import ExampleCodeLink from "./example-code-link.svelte";
	import { page } from "$app/stores";
	// import { examples } from "$lib/config/docs.js";
	import { cn } from "$lib/utils.js";
	import { ScrollArea } from "../ui/scroll-area";
	import { Equal } from "lucide";
	
  type Example = {
	name: string;
	href: string;
	label?: string;
	code: string;
};
  const examples: Example[] = [
	{
		name: "Mail",
		href: "/db/another",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/(app)/examples/mail",
	},
	{
		name: "Dashboard",
		href: "/db",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/(app)/examples/dashboard",
	},
	{
		name: "Cards",
		href: "/examples/cards",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/(app)/examples/cards",
	},
	{
		name: "Tasks",
		href: "/examples/tasks",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/(app)/examples/tasks",
	},
	{
		name: "Playground",
		href: "/examples/playground",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/(app)/examples/playground",
	},
	{
		name: "Forms",
		href: "/examples/forms",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/(app)/examples/forms",
	},
	{
		name: "Music",
		href: "/examples/music",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/(app)/examples/music",
	},
	{
		name: "Authentication",
		href: "/examples/authentication",
		code: "https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/(app)/examples/authentication",
	},
];


	let className: string | undefined | null = undefined;
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut,
	});
</script>

<div class="relative">
	<div class="lg:max-w-none">
		<ScrollArea orientation="both" scrollbarXClasses="invisible">
			<div
				class={cn("mb-4 flex items-center overflow-y-auto pb-3 md:pb-0", className)}
				{...$$restProps}
			>
				{#each examples as example, index (index)}
					{@const isActive =
						$page.url.pathname == example.href ||
						($page.url.pathname === "/" && index === 0)}

					<a
						href={example.href}
						data-sveltekit-noscroll
						class={cn(
							"relative flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
							isActive ? "font-medium text-primary" : "text-muted-foreground"
						)}
					>
						{#if isActive}
							<div
								class="absolute inset-0 rounded-full bg-muted"
								in:send={{ key: "activetab" }}
								out:receive={{ key: "activetab" }}
							/>
						{/if}
						<div class="relative">
							{example.name}
							{#if example.label}
								<span
									class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs font-medium leading-none text-[#000000] no-underline group-hover:no-underline"
								>
									{example.label}
								</span>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		</ScrollArea>
	</div>

	<!-- <ExampleCodeLink /> -->
</div>
<script lang="ts">
  import { cubicInOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { page } from "$app/stores";
  import { cn } from "$lib/utils.js";

  let className: string | undefined | null = undefined;
  export { className as class };

  const [send, receive] = crossfade({
    duration: 100000,
    easing: cubicInOut,
  });

  const examples = [
    { href: "/db", name: "Examp 1", label: "New" },
    { href: "/db/another", name: "Exampx 2" },
    // { href: "/example-3", name: "Example 3", label: "Updated" },
  ];
</script>

<div class="relative">
  <div class="lg:max-w-none">
    <div class={cn("mb-4 flex items-center overflow-y-auto pb-3 md:pb-0", className)}>
      {#each examples as example, index}
        {@const isActive = $page.url.pathname === example.href}

        <a
          href={example.href}
          class={cn(
            "relative flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
            isActive ? "font-medium text-primary" : "text-muted-foreground"
          )}
        >
          {#if isActive}
            <div
              class="absolute inset-0 rounded-full bg-red-100"
              in:send={{ key: example.href }}
              out:receive={{ key: example.href }}
            />
          {/if}
          <div class="relative">
            {example.name}
            {#if example.label}
              <span class="ml-2 rounded-md bg-gray-200 px-1.5 py-0.5 text-xs font-medium leading-none text-black">
                {example.label}
              </span>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

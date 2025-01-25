<script lang="ts">
  import Ellipsis from "lucide-svelte/icons/ellipsis";
  import * as DropdownMenu from "$comp/ui/dropdown-menu";
  import * as Dialog from "$comp/ui/dialog";
  import { Button } from "$comp/ui/button";
  
  export let row: any;
  let origRow = row?.original;
 </script>
  
 <DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
   <Button
    variant="ghost"
    builders={[builder]}
    size="icon"
    class="relative h-8 w-8 p-0"
   >
    <span class="sr-only">Open menu</span>
    <Ellipsis class="h-4 w-4" />
   </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
   <DropdownMenu.Group>
    <DropdownMenu.Label>Actions</DropdownMenu.Label>
    <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(origRow?._id)}>
     Copy payment ID
    </DropdownMenu.Item>
   </DropdownMenu.Group>
   <DropdownMenu.Separator />
   <DropdownMenu.Item>

    <Dialog.Root>
      <!-- todo -->
    </Dialog.Root>

   </DropdownMenu.Item>
   <DropdownMenu.Item>View payment details</DropdownMenu.Item>
  </DropdownMenu.Content>
 </DropdownMenu.Root>
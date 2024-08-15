<script lang="ts">
  import * as Dialog from "./ui/dialog";

  export let content: string = "Are you sure?";
  export let buttonText: string = "Confirm";
  export let open: boolean = false;
  export let onConfirm: (param: number | null) => void = () => {};
  export let onCancel: () => void = () => {};
  export let confirmParam: number | null = null;

  function handleOpenChange(event: Event) {
    // Emit the event with the open state
    const openChangeEvent = new CustomEvent<boolean>('openChange', {
      detail: open
    });
    dispatchEvent(openChangeEvent);
  }
</script>

<Dialog.Root open={open} on:openChange={handleOpenChange}>
  <Dialog.Title>Confirmation</Dialog.Title>
  <Dialog.Content>
    <p>{content}</p>
    <div style="margin-top: 1em; text-align: center;">
      <button on:click={() => { onConfirm(confirmParam); open = false; }}>{buttonText}</button>
      <button on:click={() => { onCancel(); open = false; }} style="margin-left: 1em;">Cancel</button>
    </div>
  </Dialog.Content>
</Dialog.Root>

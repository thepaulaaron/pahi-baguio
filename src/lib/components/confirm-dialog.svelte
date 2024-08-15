<script lang="ts">
  import * as Dialog from "./ui/dialog";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let content: string = "Are you sure?";
  export let buttonText: string = "Confirm";
  export let open: boolean = false;
  export let onConfirm: (param: number | null) => void = () => {};
  export let onCancel: () => void = () => {};
  export let confirmParam: number | null = null;

  function handleConfirm() {
    onConfirm(confirmParam);
    dispatch('close');
  }

  function handleCancel() {
    onCancel();
    dispatch('close');
  }

  function handleOverlayClick() {
    dispatch('close');
  }

  function handleDialogClose() {
    dispatch('close');
  }
</script>

<Dialog.Root open={open} onOpenChange={(open) => { if (!open) handleDialogClose(); }}>
  <Dialog.Overlay on:click={handleOverlayClick} />
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Title>Confirmation</Dialog.Title>
    <p>{content}</p>
    <div style="margin-top: 1em; text-align: center;">
      <button on:click={handleConfirm}>{buttonText}</button>
      <button on:click={handleCancel} style="margin-left: 1em;">Cancel</button>
    </div>
  </Dialog.Content>
</Dialog.Root>
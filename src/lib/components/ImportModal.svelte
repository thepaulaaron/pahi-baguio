<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import * as XLSX from 'xlsx';
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
  } from "$comp/ui/dialog";
	import Button from './ui/button/button.svelte';

  export let open = false;
  let dialogWrapper;
  export let onClose: () => void;

  const dispatch = createEventDispatcher();
  let fileInput: HTMLInputElement;
  let previewData: Record<string, any>[] = [];

  async function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet);
    previewData = json as Record<string, any>[];
  }

  async function submitData() {
    for (const row of previewData) {
      try {
        const res = await fetch('/api/volunteers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(row)
        });
        if (!res.ok) throw new Error('Failed to add');
      } catch (err) {
        console.error('Error:', err);
      }
    }

    dispatch("imported", previewData); // you can use this to refresh table
    onClose();
  }
</script>
  
<Dialog bind:open>
  <div bind:this={dialogWrapper} class="dialog-wrapper">
    <DialogContent
    class="sm:min-w-2xl volunteer-dialog p-12"
    on:escapeKeyDown={() => dispatch('close')}
    on:clickOutside={() => dispatch('close')}
    >
      <DialogHeader>
        <DialogTitle class="dialog-title">Importing New Users</DialogTitle>
      </DialogHeader>

      <DialogDescription class="sm:min-h-96 overflow-auto p-1">
        <input type="file" bind:this={fileInput} accept=".xlsx,.xls,.csv" on:change={handleFileUpload} />

        {#if previewData && previewData.length}
          <table class="table-auto w-full border border-gray-900 mt-4">
            <thead>
              <tr>
                {#each Object.keys(previewData[0]) as key}
                  <th class="border border-gray-900 px-4 py-2 bg-gray-900">{key}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each previewData as row}
                <tr>
                  {#each Object.values(row) as value}
                    <td class="border border-gray-900 px-4 py-2">{value}</td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
      </DialogDescription>

      <DialogFooter class="mt-4">
        <Button on:click={submitData}>Save</Button>
        <Button variant="ghost" on:click={onClose}>Cancel</Button>
      </DialogFooter>
      
    </DialogContent>
  </div>
</Dialog>
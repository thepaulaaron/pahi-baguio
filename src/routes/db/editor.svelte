<script lang="ts">
  import { writable } from "svelte/store";
  import ConfirmDialog from "$comp/confirm-dialog.svelte";
  import type { Volunteer } from "./sort";
  import { selectedVolunteerId } from '$lib/context'; // Ensure this path is correct
	import { activeTab } from "$str";

  export let data: Volunteer[];
  
  let volunteerId: string | undefined;
  $: $selectedVolunteerId, volunteerId = $selectedVolunteerId;

  // Use volunteerId as needed

  const showDialog = writable(false);
  let currentIndex: number | null = null;

  function openDialog(index: number) {
    currentIndex = index;
    showDialog.set(true);
  }

  function saveChanges(index: number) {
    const updatedVolunteer = { ...data[index] };
    const { _id, ...updateData } = updatedVolunteer;

    console.log('Saving volunteer with ID:', _id);

    fetch(`/api/volunteers/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => console.log('Data saved:', data))
      .catch(error => console.error('Error saving data:', error));
  }

  function handleConfirm(param: number | null) {
    if (param !== null) {
      saveChanges(param);
    }
    currentIndex = null;
    showDialog.set(false);
  }

  function handleCancel() {
    currentIndex = null;
    showDialog.set(false);
  }

  function handleDialogClose() {
    showDialog.set(false);
  }
</script>

<p>Selected Volunteer ID: {volunteerId}</p>

<div>
  {#if $showDialog}
    <ConfirmDialog
      content="Are you sure you want to proceed?"
      buttonText="Yes"
      open={$showDialog}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      confirmParam={currentIndex}
      on:close={handleDialogClose}
    />
  {/if}

  <!-- {#each data as volunteer, index}
    <div class="volunteer">
      <input bind:value={volunteer.Fname} placeholder="Name" />
      <input bind:value={volunteer.VolType} placeholder="Volunteer Type" />
      <button on:click={() => openDialog(index)}>Save</button>
    </div>
  {/each} -->
</div>
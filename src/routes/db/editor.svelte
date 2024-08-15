<script lang="ts">
	import type { Volunteer } from "./sort";

  export let data: Volunteer[];

  function saveChanges(index: number) {
    const updatedVolunteer = { ...data[index] };
    const { _id, ...updateData } = updatedVolunteer;

    console.log('Saving volunteer with ID:', _id); // Debug log

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
</script>

<div>

  {#each data as volunteer, index}
<div class="volunteer">
<input bind:value={volunteer.Fname} placeholder="Name" />
<input bind:value={volunteer.VolType} placeholder="Volunteer Type" />
<button on:click={() => saveChanges(index)}>Save</button>
</div>
{/each}

</div>
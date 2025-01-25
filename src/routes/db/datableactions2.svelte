<script lang="ts">
  export let row: any;  // Receive the entire row data
</script>

<div class="actions">
  <!-- Access and display the data from the row object -->
  <span>Volunteer ID: {row.original._id}</span><br />
  <span>Name: {row.original.Name}</span><br />
  <span>Student Number: {row.original.StudNum}</span><br />
  <span>UP Mail: {row.original.UPMail}</span><br />
  <span>Phone: {row.original.MobNum}</span><br />
  <span>Birthday: {row.original.Birthday}</span><br />

  <!-- Action Buttons -->
  <button on:click={() => alert(`Details of ${row.original.Name} (ID: ${row.original._id})\n` +
                                `Student Number: ${row.original.StudNum}\n` +
                                `UP Mail: ${row.original.UPMail}\n` +
                                `Phone: ${row.original.MobNum}\n` +
                                `Birthday: ${row.original.Birthday}`)}>View Details</button>
  <button on:click={() => alert(`Editing volunteer with ID: ${row.original._id}`)}>Edit</button>
  <button on:click={() => alert(`Deleting volunteer with ID: ${row.original._id}`)}>Delete</button>
</div>

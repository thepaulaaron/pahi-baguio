<script lang="ts">
  import { writable } from "svelte/store";
  import ConfirmDialog from "$comp/confirm-dialog.svelte";
  import type { Volunteer } from "./sort";
  import { updateData as updator } from './sort';
  import { selectedVolunteerId } from '$lib/context'; // Import the selected volunteer ID store
  import { activeTab } from "$str"; // Import active tab store
	import { Separator } from "$comp/ui/separator";

  // Prop received from parent
  export let data: Volunteer[];

  // Track the currently selected volunteer's ID
  let volunteerId: string | undefined;
  $: $selectedVolunteerId, volunteerId = $selectedVolunteerId;

  // Find the selected volunteer based on the ID
  let selectedVolunteer: Volunteer | undefined;
  $: selectedVolunteer = data.find(volunteer => volunteer._id === volunteerId);

  // Dialog visibility state
  const isOpen = writable(false);
  let currentIndex: number | null = null;

  // Open the confirmation dialog for the selected volunteer
  function openDialog(index: number) {
    currentIndex = index;
    isOpen.set(true);
  }

  function closeDialog() {
    isOpen.set(false);
  }

  // Update the local data with the modified volunteer information
  function updateLocalData(updatedVolunteer: Volunteer) {
    data = data.map(volunteer =>
      volunteer._id === updatedVolunteer._id ? updatedVolunteer : volunteer
    );
  }

  // Save changes to the server and update local data
  function saveChanges(index: number) { 
    const updatedVolunteer = { ...data[index] };
    const { _id, ...updateData } = updatedVolunteer;

    // Update data for +page.svelte
    updator(data);

    console.log('Saving volunteer with ID:', _id);

    fetch(`/api/volunteers/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(updatedData => {
        console.log('Data saved:', updatedData);
        updateLocalData({ ...updatedVolunteer, ...updatedData });

        // Update selected volunteer directly if it's currently selected
        if (selectedVolunteer) {
          Object.assign(selectedVolunteer, updatedData);
        }
      })
      .catch(error => console.error('Error saving data:', error));
  }

  // Handle confirmation from the dialog
  function handleConfirm(param: number | null) {
    if (param !== null) {
      saveChanges(param);
    }
    currentIndex = null;
    isOpen.set(false);
  }

  // Handle cancellation of the dialog
  function handleCancel() {
    currentIndex = null;
    isOpen.set(false);
  }

  // Handle closing of the dialog
  function handleDialogClose() {
    isOpen.set(false);
  }
</script>

{#if selectedVolunteer}
  <div class="volunteer">

    <div class="space-y-6">
      <div>
        <div class="flex justify-between">
          <div class="text-lg font-medium">Add Volunteer</div>
          <div>
            <!-- Trigger the save operation -->
            <!-- <button on:click={() => openDialog(data.findIndex(volunteer => volunteer._id === selectedVolunteer._id))}> -->
            <button>
              Save
            </button>
          </div>
        </div>
        <!-- <p class="text-muted-foreground text-sm">Details of {selectedVolunteer.Name}</p> -->
        <Separator />
      </div>

      <!-- <div id="empty"></div> -->

      <div id="name"
        class="flex space-x-4 pahi-input">
        <div class="input-thirty">
          <p class="text-muted-foreground text-sm">First Name</p>
          <input bind:value={selectedVolunteer.Fname} placeholder="First Name"/>
          <!-- <input placeholder="First Name"/> -->
        </div>

        <div class="input-thirty">
          <p class="text-muted-foreground text-sm">Middle Name</p>
          <!-- <input bind:value={selectedVolunteer.Midname} placeholder="Middle Name"/> -->
          <input placeholder="Middle Name"/>
        </div>

        <div class="input-thirty">
          <p class="text-muted-foreground text-sm">Last Name</p>
          <!-- <input bind:value={selectedVolunteer.Surname} placeholder="Last Name"/> -->
          <input placeholder="Last Name"/>
        </div>
        
        <div class="input-ten">
          <p class="text-muted-foreground text-sm">Suffix</p>
          <!-- <input bind:value={selectedVolunteer.Suffixname} placeholder="Suffix"/> -->
          <input placeholder="Suffix"/>
        </div>
      </div>

      <div id="row2"
        class="flex space-x-4 pahi-input">

        <div id="voltype"
          class="input-ten">
          <p class="text-muted-foreground text-sm">Volunteer Type</p>
          <input placeholder="Student, Faculty," />
        </div>

        <!-- be inclusive of pronouns? -->
        <div id="sex"
          style="width: 8rem">
          <p class="text-muted-foreground text-sm">Sex</p>
          <input placeholder="Male, Female, etc." />
        </div>

        <div id="bday"
          class="input-ten">
          <p class="text-muted-foreground text-sm">Birthday</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="MM/DD/YY" />
        </div>

        <div id="email1"
          class="input-thirty">
          <p class="text-muted-foreground text-sm">UP Mail</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="@up.edu.ph" />
        </div>

        <div id="email2"
          class="input-thirty">
          <p class="text-muted-foreground text-sm">Personal Mail</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="@gmail.com" />
        </div>

        <div id="phone-num"
          class="input-ten">
          <p class="text-muted-foreground text-sm">Mobile Number</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="09xx-xxx-xxxx" />
        </div>

      </div>

      <div id="row3"
        class="flex space-x-4 pahi-input">

        <div id="stud-num"
          class="input-ten">
          <p class="text-muted-foreground text-sm">Student Number</p>
          <input placeholder="xxxx-xxxxx" />
        </div>

        <div id="college"
          style="width: 8rem">
          <p class="text-muted-foreground text-sm">College</p>
          <input placeholder="CS, CAC, CSS" />
        </div>

        <div id="program"
          class="input-ten">
          <p class="text-muted-foreground text-sm">Degree Program</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="BS Computer Science" />
        </div>

        <div id="address"
          class="input-thirty">
          <p class="text-muted-foreground text-sm">Address</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="Street, City, Province" />
        </div>

        <div id="emergency-contact"
          style="width:19rem;">
          <p class="text-muted-foreground text-sm">Emergency Contact</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="Contact Name" />
        </div>

        <div id="relationship"
          style="width:10rem;">
          <p class="text-muted-foreground text-sm">Relationship</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="Mother, Father, etc." />
        </div>

        <div id="phone-num2"
          class="input-ten">
          <p class="text-muted-foreground text-sm">Mobile Number</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="09xx-xxx-xxxx" />
        </div>
      </div>

      <div id="row4"
        class="flex space-x-4 pahi-input">
        <div id="department"
          style="width:14.25rem;">
          <p class="text-muted-foreground text-sm">Department</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="DMCS, DB, DPS, etc." />
        </div>

        <div id="designation"
          style="width:14.5rem;">
          <p class="text-muted-foreground text-sm">Designation</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="Professor, Lecturer, etc." />
        </div>

        <div id="volunteer-status"
          style="width:14rem;">
          <p class="text-muted-foreground text-sm">Volunteer Status</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="Active, Inactive" />
        </div>

        <div id="volunteer-since"
          style="width:15rem;">
          <p class="text-muted-foreground text-sm">Volunteer Since</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input placeholder="MM/DD/YY" />
        </div>

        <div id="volunteer-since"
          style="width:41rem;
            height:20rem;">
          <p class="text-muted-foreground text-sm">Notes:</p>
          <!-- <input bind:value={selectedVolunteer.Birthday} placeholder="Birthday:" /> -->
          <input/>
        </div>

      </div>
    </div>
  <div>



      
      
      <!-- <input bind:value={selectedVolunteer.MobileNum} placeholder="Mobile Num:" />
      <input bind:value={selectedVolunteer.PersonalMail} placeholder="Personal Mail:" />
      <input bind:value={selectedVolunteer.Address} placeholder="Address:" />
      <input bind:value={selectedVolunteer.UPMail} placeholder="UP Mail:" />
      <input bind:value={selectedVolunteer.StudentNumber} placeholder="Student Number:" />
      <input bind:value={selectedVolunteer.DegreeProgram} placeholder="Degree Program:" />
      <input bind:value={selectedVolunteer.College} placeholder="College:" />
      <input bind:value={selectedVolunteer.Department} placeholder="Department:" />
      <input bind:value={selectedVolunteer.Designation} placeholder="Designation:" />
      <input bind:value={selectedVolunteer.EmergencyContactName} placeholder="Emergency Contact Name:" />
      <input bind:value={selectedVolunteer.EmergencyContactRelationship} placeholder="Relationship:" />
      <input bind:value={selectedVolunteer.EmergencyContactNumber} placeholder="Contact Number:" />
      <input bind:value={selectedVolunteer.VolunteerStatus} placeholder="Volunteer Status:" />
      <input bind:value={selectedVolunteer.VolunteerSince} placeholder="Volunteer Since:" />
      <input bind:value={selectedVolunteer.DatabaseID} placeholder="Database ID:" />
      <input bind:value={selectedVolunteer.Notes} placeholder="Notes:" /> -->
    </div>


  </div>
<!-- {:else} -->
  <!-- <p>No volunteer selected</p> -->
{/if}

<!-- {#if $isOpen} -->
  <ConfirmDialog
    content="Are you sure you want to proceed?"
    buttonText="Yes"
    open={$isOpen}
    onConfirm={handleConfirm}
    onCancel={handleCancel}
    confirmParam={currentIndex}
    on:close={handleDialogClose}
  />
<!-- {/if} -->
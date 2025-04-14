<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { showAddUserModal } from "$str";
	import { Separator } from "$comp/ui/separator";
	import { ScrollArea } from "$comp/ui/scroll-area";
	import { Label } from "$comp/ui/label";
	import { Input } from "$comp/ui/input";
  import { Button } from "$comp/ui/button"
  import * as Dialog from "$comp/ui/dialog";
  let dialogWrapper: HTMLDivElement;

  import InputWithIcon from "$lib/components/InputWithIcon.svelte";
  import { createBlankVolunteer } from '$lib/models/volunteerModel';

  import { 
    Ellipsis, 
    CalendarIcon, 
    PhoneIcon, 
    CircleUser, 
    Users,
    Fingerprint,
    Mail,
	  MailPlus,
	  GraduationCap,
	  BookUser,
	  Building,
	  School,
	  BriefcaseBusiness,
	  HandHeart,
	  HandMetal,
	  MapPin,
  } from "lucide-svelte/icons";

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }

  // function submitForm() {
  //   // Handle your form submission logic here
  //   closeModal(); // Optional: close after submission
  // }

  let newUser = createBlankVolunteer();

  async function addVolunteer() {
    const { _id, ...newVolunteerData } = newUser;

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVolunteerData)
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const createdVolunteer = await res.json();
      console.log("Created: ", JSON.stringify(createdVolunteer, null, 2));
      

      // Clear form
      newUser = createBlankVolunteer();

      // Optionally close the modal here too
      closeModal();

    } catch (err) {
      console.error('Failed to add volunteer:', err);
    }
  }


</script>

<Dialog.Root open={$showAddUserModal} onOpenChange={(open) => { if (!open) closeModal(); }}>
  <div bind:this={dialogWrapper} class="dialog-wrapper">
    <Dialog.Content class="volunteer-dialog p-10">
      <Dialog.Header>
        <Dialog.Title class="dialog-title mb-2">Add New User</Dialog.Title>
        <!-- <Dialog.Description> -->

          <!-- <ScrollArea class="mt-4 pl-5 pr-5 h-[calc(100%-180px)] w-full"> -->
            <div class="ml-1 mb-1 flex space-x-4 text-base">
              
              <!-- Personal Info -->
              <div class="vert flex flex-col space-y-2">
                <strong class="info-heading text-lg">Personal Info</strong> 
                <Separator />
            
                <Label for="fname">First Name</Label>
                <Input id="fname" type="text" bind:value={newUser.Fname}/>
            
                <Label for="midname">Middle Name</Label>
                <Input id="midname" type="text" bind:value={newUser.Midname}/>
            
                <Label for="surname">Surname</Label>
                <Input id="surname" type="text" bind:value={newUser.Surname}/>
            
                <Label for="suffixname">Suffix</Label>
                <Input id="suffixname" type="text" bind:value={newUser.Suffixname}/>
            
                <InputWithIcon label="Sex" icon={Fingerprint} id="sex" bind:value={newUser.Sex}/> 
                <InputWithIcon label="Birthday" icon={CalendarIcon} id="birthday" bind:value={newUser.Birthday}/> 
                <InputWithIcon label="Mobile Number" icon={PhoneIcon} id="mobnum" bind:value={newUser.MobNum}/> 
                <InputWithIcon label="Personal Mail" icon={Mail} id="personalmail" bind:value={newUser.PersonalMail}/> 
                <InputWithIcon label="Address" icon={MapPin} id="address" bind:value={newUser.Address}/> 
              </div>
            
              <!-- Campus Info -->
              <div class="vert flex flex-col space-y-2">
                <strong class="info-heading text-lg">Campus Info</strong> 
                <Separator />
            
                <InputWithIcon label="UP Mail" icon={MailPlus} id="upmail" bind:value={newUser.UPMail}/>
                <InputWithIcon label="Student Number" icon={BookUser} id="studnum" bind:value={newUser.StudNum}/>
                <InputWithIcon label="Degree Program" icon={GraduationCap} id="degprog" bind:value={newUser.DegProg}/>
                <InputWithIcon label="College" icon={Building} id="college" bind:value={newUser.College}/>                       
                <InputWithIcon label="Department" icon={School} id="dept" bind:value={newUser.Dept}/> 
                <InputWithIcon label="Designation" icon={BriefcaseBusiness} id="designation" bind:value={newUser.Designation}/>
              </div>
            
              <!-- Emergency Contact --> 
              <div class="vert flex flex-col space-y-2">
                <strong class="info-heading text-lg">Emergency Contact</strong>                   
                <Separator />
            
                <InputWithIcon label="Name" icon={CircleUser} id="emergname" bind:value={newUser.EmergName}/>
                <InputWithIcon label="Relationship" icon={Users} id="relationship" bind:value={newUser.Relationship}/>
                <InputWithIcon label="Contact Number" icon={PhoneIcon} id="emergnum" bind:value={newUser.EmergNum}/>                
            
                <!-- Others --> 
                <div class="h-5"></div> 
                <strong class="info-heading text-lg">Others</strong> 
                <Separator />
            
                <InputWithIcon label="Volunteer Status" icon={HandMetal} id="volstatus" bind:value={newUser.VolStatus}/>
                <InputWithIcon label="Volunteer Since" icon={HandHeart} id="volsince" bind:value={newUser.VolSince}/>
            
                <Label for="databaseid">Database ID</Label>
                <Input id="databaseid" type="text" bind:value={newUser.DatabaseID}/>
            
                <Label for="notes">Notes</Label>
                <Input id="notes" type="text" bind:value={newUser.Notes}/>
              </div>
            </div>            
          <!-- </ScrollArea> -->

        <!-- </Dialog.Description> -->
      </Dialog.Header>

      <Dialog.Footer class="">
        <Button type="button" on:click={addVolunteer}>Save new user</Button>
      </Dialog.Footer>
      
    </Dialog.Content>
  </div>
</Dialog.Root>
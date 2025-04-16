<script lang="ts">
  import { Input } from "$comp/ui/input";
  import { Button } from "$comp/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
  } from "$comp/ui/dialog";
  import { Separator } from "$comp/ui/separator";
  import { Label } from "$lib/components/ui/label";
  import { createEventDispatcher } from "svelte";
  import InputWithIcon from "./InputWithIcon.svelte";

  import {
    Fingerprint,
    CalendarIcon,
    PhoneIcon,
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
    CircleUser,
    Users
  } from "lucide-svelte/icons";

  import type { Volunteer } from "$lib/models/volunteerModel";
  // export let row: Volunteer | undefined | null;  // Allow null as well

  // export let open: boolean;
  // export let onClose: () => void;
  export let volunteer: Volunteer = {} as Volunteer; // Ensure this is typed correctly

  // export let readonly = false;
  // export let className = '';

  const dispatch = createEventDispatcher();
  let dialogWrapper;

  // // If row is passed, sync volunteer data
  // $: if (row) {
  //   volunteer = { ...row.original }; // This ensures the volunteer data gets updated
  // }

  export let row: any;
  	// // If row is passed, sync volunteer data
	$: if (row) {
	  volunteer = { ...row.original }; // This ensures the volunteer data gets updated
	}

  // export let row: Volunteer = {} as Volunteer; // Directly using row as the volunteer data
  export let open: boolean;
  export let onClose: () => void;
  // export let volunteer;

  const fields: { personal: { id: keyof Volunteer, label: string, icon?: string }[] } = {
    personal: [
      { id: 'Fname', label: 'First Name' },
      { id: 'Midname', label: 'Middle Name' },
      { id: 'Surname', label: 'Surname' },
      { id: 'Suffixname', label: 'Suffix' },
      { id: 'Sex', label: 'Sex', icon: 'icon' },
      { id: 'Birthday', label: 'Birthday', icon: 'icon' },
      { id: 'MobNum', label: 'Mobile Number', icon: 'icon' },
      { id: 'PersonalMail', label: 'Personal Mail', icon: 'icon' },
      { id: 'Address', label: 'Address', icon: 'icon' },
    ]
  };
  //   campus: [
  //     { id: 'UPMail', label: 'UP Mail', icon: MailPlus },
  //     { id: 'StudNum', label: 'Student Number', icon: BookUser },
  //     { id: 'DegProg', label: 'Degree Program', icon: GraduationCap },
  //     { id: 'College', label: 'College', icon: Building },
  //     { id: 'Dept', label: 'Department', icon: School },
  //     { id: 'Designation', label: 'Designation', icon: BriefcaseBusiness },
  //   ],
  //   emergency: [
  //     { id: 'EmergName', label: 'Name', icon: CircleUser },
  //     { id: 'Relationship', label: 'Relationship', icon: Users },
  //     { id: 'EmergNum', label: 'Contact Number', icon: PhoneIcon },
  //   ],
  //   others: [
  //     { id: 'VolStatus', label: 'Volunteer Status', icon: HandMetal },
  //     { id: 'VolSince', label: 'Volunteer Since', icon: HandHeart },
  //   ]
  // };

  // function handleInputChange(field: keyof Volunteer, newValue: string) {
  //   volunteer[field] = newValue;  // Safely update the volunteer model
  // }

    // Handle changes in input fields
    const handleInputChange = (field: keyof Volunteer, newValue: string) => {
    if (row) { // Check if row is not undefined
      row[field] = newValue; // Update the row only if it is defined
    }
  };

  // Save edited volunteer data
  const handleSaveEdit = async () => {
    // if (row) { // Check if row is not undefined
      const response = await fetch(`/api/volunteers/${volunteer._id}`, {
        method: 'PUT',
        body: JSON.stringify(volunteer),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        console.log('Volunteer updated');
        onClose();
      } else {
        console.error('Failed to update volunteer');
      }
    }
  // };
</script>


<Dialog bind:open>
  <div bind:this={dialogWrapper} class="dialog-wrapper">
    

    <DialogContent
      class="sm:min-w-2xl volunteer-dialog p-10 overflow-auto"
      on:escapeKeyDown={() => dispatch('close')}
      on:clickOutside={() => dispatch('close')}
    >
      <DialogHeader>
        <DialogTitle class="dialog-title">Editing {volunteer?.Name ?? "N/A"}</DialogTitle>
      </DialogHeader>

      <DialogDescription>
        <div class="ml-1 mb-1 flex space-x-4 text-base">
          <!-- Personal Info -->
          <div class="vert flex flex-col space-y-2">
            <!-- <strong class="info-heading text-lg">Personal Info</strong>
            <Separator />

            {#each fields.personal as field}
            <InputWithIconEditable
              id={field.id}
              label={field.label}
              value={volunteer ? volunteer[field.id] : ''}
              icon={null} 
              onChange={handleInputChange} 
              field={field.id}         
            />
          {/each}
          </div> -->

          <strong class="info-heading text-lg">Personal Info</strong> 
                <Separator />
            
                <Label for="fname">First Name</Label>
                <Input id="fname" type="text" value={volunteer.Fname}/>
            
                <Label for="midname">Middle Name</Label>
                <Input id="midname" type="text" bind:value={volunteer.Midname}/>
            
                <Label for="surname">Surname</Label>
                <Input id="surname" type="text" bind:value={volunteer.Surname}/>
            
                <Label for="suffixname">Suffix</Label>
                <Input id="suffixname" type="text" bind:value={volunteer.Suffixname}/>
            
                <InputWithIcon label="Sex" icon={Fingerprint} id="sex" bind:value={volunteer.Sex}/> 
                <InputWithIcon label="Birthday" icon={CalendarIcon} id="birthday" bind:value={volunteer.Birthday}/> 
                <InputWithIcon label="Mobile Number" icon={PhoneIcon} id="mobnum" bind:value={volunteer.MobNum}/> 
                <InputWithIcon label="Personal Mail" icon={Mail} id="personalmail" bind:value={volunteer.PersonalMail}/> 
                <InputWithIcon label="Address" icon={MapPin} id="address" bind:value={volunteer.Address}/> 
              </div>

          <!-- Campus Info -->
          <div class="vert flex flex-col space-y-2">
            <strong class="info-heading text-lg">Campus Info</strong>
            <Separator />

            <InputWithIcon label="UP Mail" icon={MailPlus} id="upmail" bind:value={volunteer.UPMail} />
            <InputWithIcon label="Student Number" icon={BookUser} id="studnum" bind:value={volunteer.StudNum} />
            <InputWithIcon label="Degree Program" icon={GraduationCap} id="degprog" bind:value={volunteer.DegProg} />
            <InputWithIcon label="College" icon={Building} id="college" bind:value={volunteer.College} />
            <InputWithIcon label="Department" icon={School} id="dept" bind:value={volunteer.Dept} />
            <InputWithIcon label="Designation" icon={BriefcaseBusiness} id="designation" bind:value={volunteer.Designation} />
          </div>

          <!-- Emergency Contact -->
          <div class="vert flex flex-col space-y-2">
            <strong class="info-heading text-lg">Emergency Contact</strong>
            <Separator />

            <InputWithIcon label="Name" icon={CircleUser} id="emergname" bind:value={volunteer.EmergName} />
            <InputWithIcon label="Relationship" icon={Users} id="relationship" bind:value={volunteer.Relationship} />
            <InputWithIcon label="Contact Number" icon={PhoneIcon} id="emergnum" bind:value={volunteer.EmergNum} />

            <!-- Others -->
            <strong class="info-heading text-lg">Others</strong>
            <Separator />

            <InputWithIcon label="Volunteer Status" icon={HandMetal} id="volstatus" bind:value={volunteer.VolStatus} />
            <InputWithIcon label="Volunteer Since" icon={HandHeart} id="volsince" bind:value={volunteer.VolSince} />

            <Label for="databaseid">Database ID</Label>
            <Input id="databaseid" type="text" bind:value={volunteer.DatabaseID} />

            <Label for="notes">Notes</Label>
            <Input id="notes" type="text" bind:value={volunteer.Notes} />
          </div>
        </div>
      </DialogDescription>

      <DialogFooter class="mt-4">
        <Button on:click={handleSaveEdit}>Save</Button>
        <Button variant="ghost" on:click={onClose}>Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </div>
</Dialog>

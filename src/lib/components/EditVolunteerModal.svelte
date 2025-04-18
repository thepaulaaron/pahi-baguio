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
  import { createEventDispatcher } from "svelte";
  import InputWithIconOnly from "./InputWithIconOnly.svelte";

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

  import { VOL_TYPES, type Volunteer } from '$lib/models/volunteerModel';

  const dispatch = createEventDispatcher();
  let dialogWrapper;
  export let open: boolean;
  export let onClose: () => void;
  export let row: any;
  export let volunteer: Volunteer = {} as Volunteer;
  export let exportHandleEdit: (row: Volunteer) => void;

	$: if (row) {
	  volunteer = { ...row.original };
	}

  function inputHandler(field: keyof typeof volunteer) {
    return (e: Event) => {
      volunteer = { ...volunteer, [field]: (e.target as HTMLInputElement).value };
    };
  }

  async function handleSave() {
    try {
      // console.log("Passing from EditModal: ", volunteer)
      exportHandleEdit(volunteer);
      onClose();
    } catch (err) {
      console.error('Failed to update volunteer:', err);
    }
  }
</script>


<Dialog bind:open>
  <div bind:this={dialogWrapper} class="dialog-wrapper">
    <DialogContent
      class="sm:min-w-2xl volunteer-dialog p-12 overflow-auto"
      on:escapeKeyDown={() => dispatch('close')}
      on:clickOutside={() => dispatch('close')}
    >
      <DialogHeader>
        <DialogTitle class="dialog-title">Editing {row.original.Name ?? "N/A"}</DialogTitle>
      </DialogHeader>

      <DialogDescription>
        <div class="ml-1 mb-1 flex space-x-4 text-base">
          <!-- Personal Info -->
          <div class="vert flex flex-col space-y-2">
            <strong class="info-heading text-lg">Personal Info</strong>
            <Separator />
        
            <InputWithIconOnly label="First Name" icon={Fingerprint}>
              <Input id="fname" value={volunteer.Fname} on:input={inputHandler('Fname')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Middle Name" icon={Fingerprint}>
              <Input id="midname" value={volunteer.Midname} on:input={inputHandler('Midname')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Surname" icon={Fingerprint}>
              <Input id="surname" value={volunteer.Surname} on:input={inputHandler('Surname')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Suffix" icon={Fingerprint}>
              <Input id="suffixname" value={volunteer.Suffixname} on:input={inputHandler('Suffixname')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Sex" icon={Fingerprint}>
              <Input id="sex" value={volunteer.Sex} on:input={inputHandler('Sex')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Birthday" icon={CalendarIcon}>
              <Input id="birthday" value={volunteer.Birthday} on:input={inputHandler('Birthday')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Mobile Number" icon={PhoneIcon}>
              <Input id="mobnum" value={volunteer.MobNum} on:input={inputHandler('MobNum')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Personal Mail" icon={Mail}>
              <Input id="personalmail" value={volunteer.PersonalMail} on:input={inputHandler('PersonalMail')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Address" icon={MapPin}>
              <Input id="address" value={volunteer.Address} on:input={inputHandler('Address')} />
            </InputWithIconOnly>
          </div>
        
          <!-- Campus Info -->
          <div class="vert flex flex-col space-y-2">
            <strong class="info-heading text-lg">Campus Info</strong>
            <Separator />
        
            <InputWithIconOnly label="UP Mail" icon={MailPlus}>
              <Input id="upmail" value={volunteer.UPMail} on:input={inputHandler('UPMail')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Student Number" icon={BookUser}>
              <Input id="studnum" value={volunteer.StudNum} on:input={inputHandler('StudNum')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Degree Program" icon={GraduationCap}>
              <Input id="degprog" value={volunteer.DegProg} on:input={inputHandler('DegProg')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="College" icon={Building}>
              <Input id="college" value={volunteer.College} on:input={inputHandler('College')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Department" icon={School}>
              <Input id="dept" value={volunteer.Dept} on:input={inputHandler('Dept')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Designation" icon={BriefcaseBusiness}>
              <Input id="designation" value={volunteer.Designation} on:input={inputHandler('Designation')} />
            </InputWithIconOnly>
          </div>
        
          <!-- Emergency Contact + Others -->
          <div class="vert flex flex-col space-y-2">
            <strong class="info-heading text-lg">Emergency Contact</strong>
            <Separator />
        
            <InputWithIconOnly label="Name" icon={CircleUser}>
              <Input id="emergname" value={volunteer.EmergName} on:input={inputHandler('EmergName')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Relationship" icon={Users}>
              <Input id="relationship" value={volunteer.Relationship} on:input={inputHandler('Relationship')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Contact Number" icon={PhoneIcon}>
              <Input id="emergnum" value={volunteer.EmergNum} on:input={inputHandler('EmergNum')} />
            </InputWithIconOnly>
        
            <div class="h-5"></div>
            <strong class="info-heading text-lg">Others</strong>
            <Separator />
        
            <InputWithIconOnly label="Volunteer Status" icon={HandMetal}>
              <Input id="volstatus" value={volunteer.VolStatus} on:input={inputHandler('VolStatus')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Volunteer Since" icon={HandHeart}>
              <Input id="volsince" value={volunteer.VolSince} on:input={inputHandler('VolSince')} />
            </InputWithIconOnly>

            <InputWithIconOnly label="Volunteer Type" icon={HandHeart}>
              <select
                id="voltype"
                class="p-2 rounded-md w-full bg-[#030712]"
                value={volunteer.VolType}
                on:change={inputHandler('VolType')}
              >
                <option value="">Select Type</option>
                {#each VOL_TYPES as type}
                  <option value={type}>{type}</option>
                {/each}
              </select>
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Database ID" icon={Fingerprint}>
              <Input id="databaseid" value={volunteer.DatabaseID} on:input={inputHandler('DatabaseID')} />
            </InputWithIconOnly>
        
            <InputWithIconOnly label="Notes" icon={Fingerprint}>
              <Input id="notes" value={volunteer.Notes} on:input={inputHandler('Notes')} />
            </InputWithIconOnly>
          </div>
        </div>        
      </DialogDescription>

      <DialogFooter class="mt-4">
        <Button on:click={handleSave}>Save</Button>
        <Button variant="ghost" on:click={onClose}>Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </div>
</Dialog>

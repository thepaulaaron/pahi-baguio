<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { showAddUserModal } from "$str";
	import { Separator } from "$comp/ui/separator";
	import { ScrollArea } from "$comp/ui/scroll-area";
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";
  import * as Dialog from "$comp/ui/dialog";
  let dialogWrapper: HTMLDivElement;

  import InputWithIcon from "$lib/components/InputWithIcon.svelte";

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

  function submitForm() {
    // Handle your form submission logic here
    closeModal(); // Optional: close after submission
  }
</script>

<Dialog.Root open={$showAddUserModal} onOpenChange={(open) => { if (!open) closeModal(); }}>
  <div bind:this={dialogWrapper} class="dialog-wrapper">
    <Dialog.Content class="volunteer-dialog p-10">
      <Dialog.Header>
        <Dialog.Title class="dialog-title">Add New User</Dialog.Title>
        <Dialog.Description>

<ScrollArea class="mt-4 pl-5 pr-5 h-[calc(100%-180px)] w-full">
  <div class="ml-1 mb-1 flex space-x-4 text-base">
    
    <!-- Personal Info -->
    <div class="vert flex flex-col space-y-2">
      <strong class="info-heading text-lg">Personal Info</strong> 
      <Separator />

      <Label for="fname">First Name</Label>
      <Input id="fname" type="text"/>

      <Label for="midname">Middle Name</Label>
      <Input id="midname" type="text"/>

      <Label for="surname">Surname</Label>
      <Input id="surname" type="text"/>

      <Label for="suffixname">Suffix</Label>
      <Input id="suffixname" type="text"/>

      <InputWithIcon label="Sex" icon={Fingerprint} id="sex"/> 
      <InputWithIcon label="Birthday" icon={CalendarIcon} id="birthday"/> 
      <InputWithIcon label="Mobile Number" icon={PhoneIcon} id="mobnum"/> 
      <InputWithIcon label="Personal Mail" icon={Mail} id="personalmail"/> 
      <InputWithIcon label="Address" icon={MapPin} id="address" /> 
    </div>

    <!-- Campus Info -->
    <div class="vert flex flex-col space-y-2">
      <strong class="info-heading text-lg">Campus Info</strong> 
      <Separator />

      <InputWithIcon label="UP Mail" icon={MailPlus} id="upmail" />
      <InputWithIcon label="Student Number" icon={BookUser} id="studnum"/>
      <InputWithIcon label="Degree Program" icon={GraduationCap} id="degprog"/>
      <InputWithIcon label="College" icon={Building} id="college" />                       
      <InputWithIcon label="Department" icon={School} id="dept"/> 
      <InputWithIcon label="Designation" icon={BriefcaseBusiness} id="designation"/>
    </div>

    <!-- Emergency Contact --> 
    <div class="vert flex flex-col space-y-2">
      <strong class="info-heading text-lg">Emergency Contact</strong>                   
      <Separator />

      <InputWithIcon label="Name" icon={CircleUser} id="emergname"/>
      <InputWithIcon label="Relationship" icon={Users} id="relationship"/>
      <InputWithIcon label="Contact Number" icon={PhoneIcon} id="emergnum"/>                

      <!-- Others --> 
      <div class="h-5"></div> 
        <strong class="info-heading text-lg">Others</strong> 
        <Separator />

        <InputWithIcon label="Volunteer Status" icon={HandMetal} id="volstatus" />
        <InputWithIcon label="Volunteer Since" icon={HandHeart} id="volsince"/>

        <Label for="databaseid">Database ID</Label>
        <Input id="databaseid" type="text"/>

        <Label for="notes">Notes</Label>
        <Input id="notes" type="text"/>
    </div>
  </div>
</ScrollArea>

</Dialog.Description>
</Dialog.Header>
</Dialog.Content>
</div>
</Dialog.Root>

<div class="fixed -top-5 left-0 w-screen h-screen flex items-center justify-center bg-black/50 z-50">
  <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
    <h2 class="text-lg font-semibold mb-4">Add New User</h2>
    <form on:submit|preventDefault={submitForm}>
      <!-- Add your inputs here -->
      <input class="mb-2 w-full border p-2" placeholder="First Name" />
      <input class="mb-2 w-full border p-2" placeholder="Last Name" />
      <!-- Add more fields as needed -->

      <div class="flex justify-end gap-2 mt-4">
        <button type="button" class="px-4 py-2 bg-gray-300 rounded" on:click={closeModal}>Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </div>
    </form>
  </div>
</div>
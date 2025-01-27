<script lang="ts">

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

  import * as DropdownMenu from "$comp/ui/dropdown-menu";
  import * as Dialog from "$comp/ui/dialog";
  import { Button } from "$comp/ui/button";
	import { writable } from "svelte/store";
	import { Separator } from "$comp/ui/separator";
	import ScrollArea from "$comp/ui/scroll-area/scroll-area.svelte";
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";
  
	import InputWithIcon from "$lib/components/InputWithIcon.svelte";
  
  export let row: any;

  const isOpenVIEW = writable(false);
  const isOpenEDIT = writable(false);
  let dialogWrapper: HTMLDivElement;

  function openVIEW() {
    isOpenVIEW.set(true);
  }

  function closeVIEW() {
    isOpenVIEW.set(false);
  }

  function handleViewVolunteer() {
    openVIEW();
  }

  function openEDIT() {
    isOpenEDIT.set(true);
  }

  function closeEDIT() {
    isOpenEDIT.set(false);
  }

  function handleEditVolunteer() {
    openEDIT();
  }

  function getValue(property: any) {
    return row?.original?.[property] ?? "N/A";
  }
 </script>

<!-- VIEW Dialog -->

<Dialog.Root open={$isOpenVIEW} onOpenChange={(open) => { if (!open) closeVIEW(); }}>
  <div bind:this={dialogWrapper} class="dialog-wrapper">

      <Dialog.Content class="volunteer-dialog p-10">
        <Dialog.Header>
          <Dialog.Title class="dialog-title">{getValue('Name')}</Dialog.Title>
          <Dialog.Description>
            <Separator class="my-5" />
            <div class="flex space-x-4 text-base">
              
              <!-- Personal Info -->
              <div class="vert">
                <strong class="text-lg whiten">Personal Info</strong>
                <div class="space-y-2 mt-2">
                  <p>First Name: {getValue('Fname')}</p>
                  <p>Middle Name: {getValue('Midname')}</p>
                  <p>Surname: {getValue('Surname')}</p>
                  <p>Suffix: {getValue('Suffixname')}</p>
                  <p>Sex: {getValue('Sex')}</p>
                  <p>Birthday: {getValue('Birthday')}</p>
                  <p>Mobile Num: {getValue('MobNum')}</p>
                  <p>Personal Mail: {getValue('PersonalMail')}</p>
                  <p>Address: {getValue('Address')}</p>
                </div>
              </div>

              <!-- Campus Info -->
              <div class="vert">
                <strong class="text-lg whiten">Campus Info</strong>
                <div class="space-y-2 mt-2">
                  <p>UP Mail: {getValue('UPMail')}</p>
                  <p>Student Number: {getValue('StudNum')}</p>
                  <p>Degree Program: {getValue('DegProg')}</p>
                  <p>College: {getValue('College')}</p>
                  <p>Department: {getValue('Dept')}</p>
                  <p>Designation: {getValue('Designation')}</p>
                </div>
              </div>

              <div class="vert space-y-10">
                <!-- Emergency Contact -->
                <div class="box">
                  <strong class="text-lg whiten">Emergency Contact</strong>
                  <div class="space-y-2 mt-2">
                    <p>Name: {getValue('EmergName')}</p>
                    <p>Relationship: {getValue('Relationship')}</p>
                    <p>Contact Number: {getValue('EmergNum')}</p>
                  </div>
                </div>

                <!-- Others -->
                <div class="box">
                  <strong class="text-lg whiten">Others</strong>
                  <div class="space-y-2 mt-2">
                    <p>Volunteer Status: {getValue('VolStatus')}</p>
                    <p>Volunteer Since: {getValue('VolSince')}</p>
                    <p>Database ID: {getValue('DatabaseID')}</p>
                    <p>Notes: {getValue('Notes')}</p>
                  </div>
                </div>
              </div>            

            </div>
          </Dialog.Description>
        </Dialog.Header>
      </Dialog.Content>    
  </div>
</Dialog.Root>

<!-- Edit Dialog -->

<Dialog.Root open={$isOpenEDIT} onOpenChange={(open) => { if (!open) closeEDIT(); }}>
  <div bind:this={dialogWrapper} class="dialog-wrapper">
    <Dialog.Content class="volunteer-dialog p-10">
      <Dialog.Header>
        <Dialog.Title class="dialog-title">Editing {row?.original?.Name ?? "N/A"}</Dialog.Title>
        <Dialog.Description>
          <!-- Scrollable area -->
          <ScrollArea class="mt-4 pl-5 pr-5 h-[calc(100%-180px)] w-full">
            <div class="ml-1 mb-1 flex space-x-4 text-base">
              
              <!-- Personal Info -->
              <div class="vert flex flex-col space-y-2">
                <strong class="info-heading text-lg">Personal Info</strong>

                <Separator />

                <Label for="fname">First Name</Label>
                <Input id="fname" type="text" value={getValue('Fname')} />

                <Label for="midname">Middle Name</Label>
                <Input id="midname" type="text" value={getValue('Midname')} />

                <Label for="surname">Surname</Label>
                <Input id="surname" type="text" value={getValue('Surname')} />

                <Label for="suffixname">Suffix</Label>
                <Input id="suffixname" type="text" value={getValue('Suffixname')} />

                <InputWithIcon label="Sex" icon={Fingerprint} id="sex" value={getValue('Sex')} />

                <InputWithIcon label="Birthday" icon={CalendarIcon} id="birthday" value={getValue('Birthday')} />

                <InputWithIcon label="Mobile Number" icon={PhoneIcon} id="mobnum" value={getValue('MobNum')} />

                <InputWithIcon label="Personal Mail" icon={Mail} id="personalmail" value={getValue('PersonalMail')} />

                <InputWithIcon label="Address" icon={MapPin} id="address" value={getValue('Address')} />

              </div>

              <!-- Campus Info -->
              <div class="vert flex flex-col space-y-2">
                <strong class="info-heading text-lg">Campus Info</strong>

                <Separator />

                <InputWithIcon label="UP Mail" icon={MailPlus} id="upmail" value={getValue('UPMail')} />

                <InputWithIcon label="Student Number" icon={BookUser} id="studnum" value={getValue('StudNum')} />

                <InputWithIcon label="Degree Program" icon={GraduationCap} id="degprog" value={getValue('DegProg')} />

                <InputWithIcon label="College" icon={Building} id="college" value={getValue('College')} />            
                
                <InputWithIcon label="Department" icon={School} id="dept" value={getValue('Dept')} />

                <InputWithIcon label="Designation" icon={BriefcaseBusiness} id="designation" value={getValue('Designation')} />
              </div>

              <!-- Emergency Contact -->

              <div class="vert flex flex-col space-y-2">
                <strong class="info-heading text-lg">Emergency Contact</strong>
                  
                <Separator />

                <Label for="emergname" class="flex">Name</Label>
                <div class="input-box flex items-center border rounded-md bg-[#1f2937]">
                  <CircleUser class="input-icon ml-3 mr-3 h-5 w-5" />
                  <Input id="emergname" type="text"  class="border-0" value={getValue('EmergName')} />
                </div>

                <Label for="relationship" class="flex">Relationship</Label>
                <div class="input-box flex items-center border rounded-md bg-[#1f2937]">
                  <Users class="input-icon ml-3 mr-3 h-5 w-5" />
                  <Input id="relationship" type="text"  class="border-0" value={getValue('Relationship')} />
                </div>

                  <Label for="emergnum" class="flex">Contact Number</Label>
                  <div class="input-box flex items-center border rounded-md bg-[#1f2937]">
                    <PhoneIcon class="input-icon ml-3 mr-3 h-5 w-5" />
                    <Input id="emergnum" type="text"  class="border-0" value={getValue('EmergNum')} />
                  </div>

                <!-- Others -->

                <div class="h-5"></div>

                  <strong class="info-heading text-lg">Others</strong>

                  <Separator />

                  <InputWithIcon label="Volunteer Status" icon={HandMetal} id="volstatus" value={getValue('VolStatus')} />

                  <InputWithIcon label="Volunteer Since" icon={HandHeart} id="volsince" value={getValue('VolSince')} />

                  <Label for="databaseid">Database ID</Label>
                  <Input id="databaseid" type="text" value={getValue('DatabaseID')} />

                  <Label for="notes">Notes</Label>
                  <Input id="notes" type="text" value={getValue('Notes')} />
              </div>
            </div>
          </ScrollArea>
        </Dialog.Description>
      </Dialog.Header>
    </Dialog.Content>
  </div>
</Dialog.Root>
  
 <DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
   <Button
    variant="ghost"
    builders={[builder]}
    size="icon"
    class="relative h-8 w-8 p-0"
   >
    <span class="sr-only">Open menu</span>
    <Ellipsis class="h-4 w-4" />
   </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
   <DropdownMenu.Group>
    <DropdownMenu.Label>Actions</DropdownMenu.Label>
    <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(getValue("_id"))}>
     Copy user ID
    </DropdownMenu.Item>
    <DropdownMenu.Item on:click={handleViewVolunteer}>
      View Volunteer
    </DropdownMenu.Item>
   </DropdownMenu.Group>
   <DropdownMenu.Separator />
   <DropdownMenu.Item on:click={handleEditVolunteer}>Edit Volunteer</DropdownMenu.Item>
  </DropdownMenu.Content>
 </DropdownMenu.Root>
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
	import { ScrollArea } from "$comp/ui/scroll-area";
	import { Label } from "$lib/components/ui/label";
	import { Input } from "$lib/components/ui/input";

	import InputWithIcon from "$lib/components/InputWithIcon.svelte";
  import EditVolunteerModal from "$lib/components/EditVolunteerModal.svelte";
  
  export let row: any;

  const isOpenVIEW = writable(false);
  const isOpenEDIT = writable(false);
  let dialogWrapper: HTMLDivElement;
  let selectedRow: any;

  function openVIEW() {
    isOpenVIEW.set(true);
  }

  function closeVIEW() {
    isOpenVIEW.set(false);
  }

  function handleViewVolunteer() {
    openVIEW();
  }

  function openEDIT(row: null) {
    selectedRow = row;
    isOpenEDIT.set(true);
  }

  function closeEDIT() {
    selectedRow = null;
    isOpenEDIT.set(false);
  }

  function getValue(property: any) {
    return row?.original?.[property] ?? "N/A";
  }

  function sendEmail(toAddress: any) {
    window.location.href = `mailto:${toAddress}`;
  }
 </script>

<!-- VIEW Dialog -->

<Dialog.Root open={$isOpenVIEW} onOpenChange={(open) => { if (!open) closeVIEW(); }}>
  <div bind:this={dialogWrapper} class="dialog-wrapper">
    <Dialog.Content class="volunteer-dialog p-10">
      <Dialog.Header>
        <Dialog.Title class="dialog-title">{row?.original?.Name ?? "N/A"}</Dialog.Title>
        <Dialog.Description>
          
          <ScrollArea class="mt-4 pl-5 pr-5 h-[calc(100%-180px)] w-full">
            <div class="ml-1 mb-1 flex space-x-4 text-base">
              
              <!-- Personal Info -->
              <div class="vert flex flex-col space-y-2">
                <strong class="info-heading text-lg">Personal Info</strong> 
                <Separator />

                <Label for="fname">First Name</Label>
                <Input id="fname" type="text" value={getValue('Fname')} readonly={true} />

                <Label for="midname">Middle Name</Label>
                <Input id="midname" type="text" value={getValue('Midname')} readonly={true} />

                <Label for="surname">Surname</Label>
                <Input id="surname" type="text" value={getValue('Surname')} readonly={true} />

                <Label for="suffixname">Suffix</Label>
                <Input id="suffixname" type="text" value={getValue('Suffixname')} readonly={true} />

                <InputWithIcon label="Sex" icon={Fingerprint} id="sex" value={getValue('Sex')} readonly={true} /> 
                <InputWithIcon label="Birthday" icon={CalendarIcon} id="birthday" value={getValue('Birthday')} readonly={true} /> 
                <InputWithIcon label="Mobile Number" icon={PhoneIcon} id="mobnum" value={getValue('MobNum')} readonly={true} /> 
                <InputWithIcon label="Personal Mail" icon={Mail} id="personalmail" value={getValue('PersonalMail')} readonly={true} /> 
                <InputWithIcon label="Address" icon={MapPin} id="address" value={getValue('Address')} readonly={true} /> 
              </div>

              <!-- Campus Info -->
              <div class="vert flex flex-col space-y-2">
                <strong class="info-heading text-lg">Campus Info</strong> 
                <Separator />

                <InputWithIcon label="UP Mail" icon={MailPlus} id="upmail" value={getValue('UPMail')} readonly={true} />
                <InputWithIcon label="Student Number" icon={BookUser} id="studnum" value={getValue('StudNum')} readonly={true} />
                <InputWithIcon label="Degree Program" icon={GraduationCap} id="degprog" value={getValue('DegProg')} readonly={true} />
                <InputWithIcon label="College" icon={Building} id="college" value={getValue('College')} readonly={true} />                       
                <InputWithIcon label="Department" icon={School} id="dept" value={getValue('Dept')} readonly={true} /> 
                <InputWithIcon label="Designation" icon={BriefcaseBusiness} id="designation" value={getValue('Designation')} readonly={true} />
              </div>

              <!-- Emergency Contact --> 
              <div class="vert flex flex-col space-y-2">
                <strong class="info-heading text-lg">Emergency Contact</strong>                   
                <Separator />

                <InputWithIcon label="Name" icon={CircleUser} id="emergname" value={getValue('EmergName')} readonly={true} />
                <InputWithIcon label="Relationship" icon={Users} id="relationship" value={getValue('Relationship')} readonly={true} />
                <InputWithIcon label="Contact Number" icon={PhoneIcon} id="emergnum" value={getValue('EmergNum')} readonly={true} />                

                <!-- Others --> 
                <div class="h-5"></div> 
                  <strong class="info-heading text-lg">Others</strong> 
                  <Separator />

                  <InputWithIcon label="Volunteer Status" icon={HandMetal} id="volstatus" value={getValue('VolStatus')} readonly={true} />
                  <InputWithIcon label="Volunteer Since" icon={HandHeart} id="volsince" value={getValue('VolSince')} readonly={true} />

                  <Label for="databaseid">Database ID</Label>
                  <Input id="databaseid" type="text" value={getValue('DatabaseID')} readonly={true} />

                  <Label for="notes">Notes</Label>
                  <Input id="notes" type="text" value={getValue('Notes')} readonly={true} />
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
      variant="ghost" builders={[builder]}
      size="icon" class="relative h-8 w-8 p-0">
      <span class="sr-only">Open menu</span>
      <Ellipsis class="h-4 w-4" />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      
      <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(getValue("StudNum"))}>
        Copy Stud #
      </DropdownMenu.Item>
      
      <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(getValue("StudNum"))}>
        Copy Phone #
      </DropdownMenu.Item>
      
      <DropdownMenu.Item on:click={() => sendEmail(getValue("UPMail"))}>
        Send email <div class="italic">&nbsp;(@up.edu)</div>
      </DropdownMenu.Item>
      
      <DropdownMenu.Item on:click={() => sendEmail(getValue("PersonalMail"))}>
      Send email <div class="italic">&nbsp;(@gmail)</div>
      </DropdownMenu.Item>
    
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    
    <DropdownMenu.Item on:click={handleViewVolunteer}>
      View Volunteer
    </DropdownMenu.Item>
    <DropdownMenu.Item on:click={() => openEDIT(row)}>
      Edit Details
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<EditVolunteerModal
  row={selectedRow}
  bind:open={$isOpenEDIT}
  onClose={closeEDIT}
/>
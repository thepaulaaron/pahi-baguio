<script lang="ts">
  //@ts-nocheck
  import Header from "$comp/Header.svelte";
  import Dashboard from "./Dashboard.svelte";
  import TestNav from "$comp/dashboard/main-nav.svelte";
  import Datable from "./00datable.svelte";
  
  // Shadcn-Svelte imports
  import * as Avatar from "$comp/ui/avatar";
  import * as Card from "$comp/ui/card";
  import { Button } from "$comp/ui/button";
  import { Badge } from "$comp/ui/badge";
  import * as Table from "$comp/ui/table";

  // Load only when verified admin
  import { isAuthenticated } from '$str/auth';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { writable, get } from 'svelte/store';

  // Create a writable store for `data2`
  export let data2 = writable([]);

  // Fetch data on mount and update the store
  onMount(async () => {
    try {
      const res = await fetch('/api/volunteers');
      if (!res.ok) {
        throw new Error(`Error fetching volunteers: ${res.statusText}`);
      }
      const fetchedData = await res.json();
      data2.set(fetchedData); // Update the store with fetched data
    } catch (error) {
      console.error(error);
    }
  });

  // Clean up if needed
  onDestroy(() => {
    data2.set([]); // Reset store or perform cleanup
  });

  // import { array, updateData } from './sort';
  // export let data: { volunteers: Volunteer[] } = { volunteers: [] }; // Ensure data has the correct structure

  // let data2: { _id: string; Surname: string; Fname: string }[] = [];
  
  // // Log data on mount
  // // onMount(() => {
  // //   console.log("Initial data in +page.svelte:");
  // // });

  // onMount(async () => {
  //   const res = await fetch('/api/volunteers');
  //   const fetchedData = await res.json();
  //   data2 = fetchedData;
  // });

  // // Update the store when data changes
  // $: {
  //   console.log("data in pageB:");

  //   if (data && data.volunteers && data.volunteers.length > 0) {
  //     console.log("+page.svelte: Trying to update volunteers data!");
  //     updateData(data.volunteers); // Update store with new data
  //   }
  // }

  // // Subscribe to the store to get the updated volunteers
  // let volunteers: Volunteer[] = [];
  // const unsubscribe = array.subscribe(value => {
  //   volunteers = value;
  //   console.log("Updated volunteers from store:", volunteers);
  // });

  // // Clean up the subscription on destroy
  // import { onDestroy } from 'svelte';
  // onDestroy(() => {
  //   unsubscribe();
  // });
</script>

<!-- <table>
  <thead>
    <tr>
      <th>Volunteer Name</th>
      <th>Contact</th>
    </tr>
  </thead>
  <tbody>
    {#each data2 as volunteer}
      <tr>
        <td>{volunteer.Surname}</td>
        <td>{volunteer.Fname}</td>
      </tr>
    {/each}
  </tbody>
</table> -->

<Dashboard data={$data2}/>

<!-- Here you can pass the data to other components or use the updated array -->

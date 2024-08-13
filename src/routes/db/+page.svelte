<script lang="ts">
  //@ts-nocheck
  import Header from "$comp/Header.svelte";
  import Dashboard from "./Dashboard.svelte";
  import TestNav from "$comp/dashboard/main-nav.svelte";
  import Datable from "./datable.svelte"

  // Shadcn-Svelte imports
	import * as Avatar from "$comp/ui/avatar";
  import * as Card from "$comp/ui/card";
  import { Button } from "$comp/ui/button";
  import { Badge } from "$comp/ui/badge";
  import * as Table from "$comp/ui/table";

  // Load only when verified admin
  import { isAuthenticated } from '$str/auth';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';

  onMount(() => {
    if (typeof window !== 'undefined' && !get(isAuthenticated)) {
      goto('/'); // Redirect to the login page if not authenticated
    }
  });

  import type { PageData } from "./$types";
  import { array } from './sort';
  export let data: PageData;

  const computeName = (volunteer: Volunteer): string => {
    const { Fname, Midname, Surname, Suffixname } = volunteer;
    
    // Handle null names
    const suffix = Suffixname ? `, ${Suffixname}` : '';
    const midname = Midname ? ` ${Midname}` : '';

    return `${Fname}${midname} ${Surname}${suffix}`;
  };

  // Reactive statement to update the store with computed Name
  $: {
    if (data && data.volunteers) {
      const volunteerNames = data.volunteers.map(volunteer => ({
        ...volunteer,
        Name: computeName(volunteer)
      }));
      array.set(volunteerNames);
    }
  }

  // Set dark mode as default
  // import { onMount } from 'svelte';
  import { userPrefersMode } from 'mode-watcher';

  // onMount(() => {
    userPrefersMode.set('dark');
  // });
</script>

<Dashboard data={$array}/>
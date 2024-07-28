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
  import { onMount } from 'svelte';

  function setDarkMode() {
    const userPrefersDark = localStorage.getItem('theme') === 'dark';
    const html = document.documentElement;

    if (userPrefersDark || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  onMount(() => {
    setDarkMode();
  });
</script>

<Dashboard data={$array}/>
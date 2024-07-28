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
	

  export let data: PageData;
   // Initialize the array store with data from server
  $: array.set(data.volunteers);

  // For Sorting
  import { array, setSort } from './sort';

</script>

<Dashboard data={$array}/>
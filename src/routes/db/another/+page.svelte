<script lang="ts">
  import Header from "$comp/Header.svelte";

  // Shadcn-Svelte imports
	import * as Avatar from "$comp/ui/avatar";
  import * as Card from "$comp/ui/card";
  import { Button } from "$comp/ui/button";
  import { Badge } from "$comp/ui/badge";

  import type { PageData } from "../$types";
	import Dashboard from "$routes/db/00Dashboard.svelte";
  import TestNav from "$comp/dashboard/main-nav.svelte";

  // export let data: PageData;
  // $: volunteers = data.volunteers;
</script>

<TestNav/>
<!-- <Header/> -->
<!-- <Dashboard/> -->

<!--
<main>
  <div class="grid grid-cols-3 gap-8 p-6 bg-gray-800">
    {#each volunteers as student}
      <Card.Root class="flex flex-col justify-between">
        <Card.Header class="flex-row gap-4 items-center">
          <Avatar.Root>
            <Avatar.Image src="../images/pahi-logo.png"/>
            <Avatar.Fallback>
              {student.Name.slice(0,2)}
            </Avatar.Fallback>
          </Avatar.Root>
          <div>
            <Card.Title>{student.Name}</Card.Title>
            <Card.Description>{student._id}</Card.Description>
          </div>
        </Card.Header>
        <Card.Content>
          <p>{student.Birthday}</p>
          <p>{student.DegProg}</p>
          <p>{student.MobNum}</p>
        </Card.Content>
        <Card.Footer class="flex justify-between">
          <Button variant="default">View student</Button>
          <Badge variant="secondary">Hey!</Badge>
        </Card.Footer>
      </Card.Root>
    {/each}
  </div>
</main>
-->

<nav>
  <a href="/">Home</a>
  <a href="/db">databasss</a>
  <a href="/dash">Dshboard</a>
  <!-- <a href="/user/1">User 1 Profile</a>
  <a href="/user/2">User 2 Profile</a> -->
</nav>
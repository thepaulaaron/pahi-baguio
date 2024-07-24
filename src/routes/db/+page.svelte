<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import * as Card from "$lib/components/ui/card";

  import type { PageData } from "./$types";
  export let data: PageData;
  $: volunteers = data.volunteers;
</script>

<Header/>

<main>
  <div class="grid grid-cols-3 gap-8 p-6 bg-gray-800">
    {#each volunteers as student}
      <Card.Root class="flex flex-col justify-between">
        <Card.Header class="flex-row gap-4 items-center">
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
          <button>View student</button>
            <p>Hey!</p>
        </Card.Footer>
      </Card.Root>
    {/each}
  </div>
</main>

<nav>
  <a href="/">Home</a>
  <a href="/db">databasss</a>
  <!-- <a href="/contact">Contact</a>
  <a href="/user/1">User 1 Profile</a>
  <a href="/user/2">User 2 Profile</a> -->
</nav>
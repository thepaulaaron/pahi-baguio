<script lang="ts">
  import { isAuthenticated } from '$str/auth';
  import { goto } from '$app/navigation';

  function handleLogout() {
    isAuthenticated.set(false); // Reset authentication state
    goto('/'); // Redirect to the login page
  }
</script>

<button on:click={handleLogout}>Logout</button>

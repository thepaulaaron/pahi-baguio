<script lang="ts">
  export let data: Record<string, any>[] = [];
</script>

<div>
  <h2>Dashboard</h2>
  {#if data.length > 0}
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {#each data as entry, index}
          <tr>
            <td colspan="2"><strong>Entry {index + 1}</strong></td>
          </tr>
          {#each Object.entries(entry) as [key, value]}
            <tr>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  {:else}
    <p>No data available.</p>
  {/if}
</div>

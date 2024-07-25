<script>
// @ts-nocheck

	import CustomTable from './+page.svelte';

	// Initialize the data array
	let data = [
		{id: 1, val: "hello"},
		{id: 2, val: "world"},
		{id: 3, val: "sorted"},
		{id: 4, val: "table"},
	];
	
	// Holds table sort state, initialized to reflect table sorted by id column ascending
	let sortBy = {col: "id", ascending: true};

	// Reactive statement for sorting the array based on a specified column
	$: sort = (/** @type {string} */ column) => {
		// Toggle the sort order if the column is already the same, otherwise set it to ascending
		sortBy = { col: column, ascending: sortBy.col === column ? !sortBy.ascending : true };

		// Determine the sort order multiplier (1 for ascending, -1 for descending)
		const sortModifier = sortBy.ascending ? 1 : -1;

		// Sort the array using a simple comparator function
		data = data.sort((a, b) => (a[column] > b[column] ? 1 : -1) * sortModifier);
	};
</script>

<CustomTable { data } {sort} />
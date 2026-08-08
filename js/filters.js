/**
 * Aramco CMS Administrative Portal - Filtering & Search Module
 */

window.AramcoFilters = (function () {
  function filterItems(items, query, searchFields) {
    if (!query || !query.trim()) return items;
    const q = query.toLowerCase().trim();

    return items.filter(item => {
      return searchFields.some(field => {
        const val = item[field];
        if (val === null || val === undefined) return false;
        if (typeof val === 'object') {
          return JSON.stringify(val).toLowerCase().includes(q);
        }
        return String(val).toLowerCase().includes(q);
      });
    });
  }

  function filterByField(items, field, selectedValue) {
    if (!selectedValue || selectedValue === 'ALL' || selectedValue.startsWith('All ')) {
      return items;
    }
    return items.filter(item => String(item[field]).toUpperCase() === String(selectedValue).toUpperCase());
  }

  function sortItems(items, sortField, sortOrder) {
    if (!sortField) return items;
    const sorted = [...items];
    const modifier = sortOrder === 'desc' ? -1 : 1;

    sorted.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return -1 * modifier;
      if (valA > valB) return 1 * modifier;
      return 0;
    });

    return sorted;
  }

  return {
    filterItems: filterItems,
    filterByField: filterByField,
    sortItems: sortItems
  };
})();

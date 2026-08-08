/**
 * Aramco CMS Administrative Portal - Client-Side Pagination Module
 */

window.AramcoPagination = (function () {
  function paginate(items, currentPage, pageSize) {
    const total = items.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const page = Math.max(1, Math.min(currentPage, totalPages));
    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, total);
    const pageItems = items.slice(start, end);

    return {
      items: pageItems,
      page: page,
      pageSize: pageSize,
      total: total,
      totalPages: totalPages,
      start: total > 0 ? start + 1 : 0,
      end: end
    };
  }

  function renderPaginationControls(containerEl, paginationState, onPageChange) {
    if (!containerEl) return;
    containerEl.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = 'pagination-bar';

    const info = document.createElement('div');
    info.className = 'pagination-info';
    info.innerText = `Page ${paginationState.page} of ${paginationState.totalPages}`;
    wrap.appendChild(info);

    const controls = document.createElement('div');
    controls.className = 'pagination-controls';

    // Previous
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.innerText = 'Previous';
    prevBtn.disabled = paginationState.page === 1;
    prevBtn.onclick = () => onPageChange(paginationState.page - 1);
    controls.appendChild(prevBtn);

    // Page Numbers
    for (let i = 1; i <= paginationState.totalPages; i++) {
      const pBtn = document.createElement('button');
      pBtn.className = 'page-btn' + (i === paginationState.page ? ' active' : '');
      pBtn.innerText = i;
      pBtn.onclick = () => onPageChange(i);
      controls.appendChild(pBtn);
    }

    // Next
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.innerText = 'Next';
    nextBtn.disabled = paginationState.page === paginationState.totalPages;
    nextBtn.onclick = () => onPageChange(paginationState.page + 1);
    controls.appendChild(nextBtn);

    wrap.appendChild(controls);
    containerEl.appendChild(wrap);
  }

  return {
    paginate: paginate,
    renderControls: renderPaginationControls
  };
})();

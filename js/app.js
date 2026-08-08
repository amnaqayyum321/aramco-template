/**
 * Aramco CMS Administrative Portal - Core Application Controller
 */

window.AramcoApp = (function () {
  let currentScreen = 'dashboard';
  let paginationState = {
    stations: { page: 1, pageSize: 10 },
    securityLogs: { page: 1, pageSize: 10 },
    inquiries: { page: 1, pageSize: 10 }
  };

  let filterState = {
    stationsSearch: '',
    seoSearch: '',
    inquiriesSearch: '',
    inquiriesSubject: 'ALL',
    inquiriesStatus: 'ALL',
    securitySearch: '',
    securityEventType: 'ALL',
    securityStatus: 'ALL'
  };

  let sortState = {
    stations: { field: null, order: 'asc' },
    seo: { field: null, order: 'asc' },
    inquiries: { field: null, order: 'asc' },
    security: { field: null, order: 'asc' }
  };

  // Currently open record for modal/drawer editing
  let activeEditingRecord = null;
  let activeDeleteTarget = null;

  function init() {
    setupEventListeners();
    renderCurrentScreen();
  }

  function renderCurrentScreen() {
    const state = window.AramcoStore.get();
    renderTopbar(state);

    switch (currentScreen) {
      case 'dashboard':
        renderDashboard(state);
        break;
      case 'seo-metadata':
        renderSEO(state);
        break;
      case 'media-assets':
        renderMediaAssets(state);
        break;
      case 'station-locator':
        renderStationLocator(state);
        break;
      case 'contact-inquiries':
        renderContactInquiries(state);
        break;
      case 'page-content':
        renderPageContent(state);
        break;
      case 'web-fonts':
        renderWebFonts(state);
        break;
      case 'security-logs':
        renderSecurityLogs(state);
        break;
      case 'admin-roles':
        renderAdminRoles(state);
        break;
    }
  }

  // --- TOPBAR & USER PROFILE ---
  function renderTopbar(state) {
    const userMeta = document.querySelector('.user-meta');
    if (userMeta) {
      userMeta.innerHTML = `
        <div class="name">${state.currentUser.name}</div>
        <div class="role">${state.currentUser.role}</div>
      `;
    }

    const userDropdownVal = document.querySelector('#user-dropdown .value');
    if (userDropdownVal) {
      userDropdownVal.textContent = state.currentUser.email;
    }

    // Update screen title header
    const screenTitles = {
      'dashboard': 'CONTROL DESK',
      'seo-metadata': 'SEO METADATA MANAGER',
      'media-assets': 'MEDIA ASSET LIBRARY',
      'station-locator': 'STATION LOCATOR REGISTRY',
      'contact-inquiries': 'CUSTOMER CONTACT QUERIES',
      'page-content': 'PAGE CONTENT MANAGER',
      'web-fonts': 'WEB FONTS MANAGER',
      'security-logs': 'SECURITY COMPLIANCE LOGS',
      'admin-roles': 'ADMIN ROLES & PERMISSIONS'
    };

    const titleEl = document.getElementById('current-page-title');
    if (titleEl) {
      titleEl.textContent = screenTitles[currentScreen] || 'CONTROL DESK';
    }
  }

  // --- DASHBOARD ---
  function renderDashboard(state) {
    const activeStatVal = document.querySelector('#stat-active-stations .stat-value');
    const activeStatSub = document.querySelector('#stat-active-stations .stat-sub');
    if (activeStatVal) activeStatVal.textContent = state.stats.activeStationsCount;
    if (activeStatSub) activeStatSub.textContent = `Total locations: ${state.stats.activeStationsTotal}`;

    const inquiriesVal = document.querySelector('#stat-inquiries .stat-value');
    const inquiriesSub = document.querySelector('#stat-inquiries .stat-sub');
    if (inquiriesVal) inquiriesVal.textContent = state.stats.contactInquiriesCount;
    if (inquiriesSub) inquiriesSub.textContent = `Total logged: ${state.stats.contactInquiriesTotal}`;

    const seoVal = document.querySelector('#stat-seo .stat-value');
    if (seoVal) seoVal.textContent = state.stats.seoPagesCount;

    const mediaVal = document.querySelector('#stat-media .stat-value');
    if (mediaVal) mediaVal.textContent = state.stats.mediaAssetsCount;

    // Render Recent Inquiries list
    const inquiriesContainer = document.getElementById('dashboard-recent-inquiries');
    if (inquiriesContainer) {
      inquiriesContainer.innerHTML = state.recentInquiries.map(item => `
        <div class="inquiry-row">
          <div>
            <div class="who">${item.name}</div>
            <div class="subject">${item.subject}</div>
          </div>
          <div class="meta">
            <div class="date">${item.date}</div>
            ${item.isNew ? '<span class="badge badge--new">NEW</span>' : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // --- SEO METADATA MANAGER ---
  function renderSEO(state) {
    let pages = window.AramcoFilters.filterItems(state.seoPages, filterState.seoSearch, ['name', 'routeSlug', 'metaTitle']);
    pages = window.AramcoFilters.sortItems(pages, sortState.seo.field, sortState.seo.order);

    const countEl = document.getElementById('seo-result-count');
    if (countEl) countEl.textContent = `Showing ${pages.length} of ${state.seoPages.length} pages`;

    const tbody = document.getElementById('seo-table-body');
    if (tbody) {
      if (pages.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-table-state">No matching SEO records found.</td></tr>`;
        return;
      }

      tbody.innerHTML = pages.map(page => `
        <tr>
          <td>
            <div class="cell-with-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9z"/></svg>
              <span class="cell-primary">${page.name}</span>
            </div>
          </td>
          <td><a href="#" onclick="event.preventDefault();">${page.routeSlug} <svg style="width:11px;height:11px;display:inline;vertical-align:-1px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M8 7h9v9"/></svg></a></td>
          <td class="cell-secondary" style="color:var(--text);">${page.metaTitle}</td>
          <td><span class="badge badge--index">${page.indexing}</span></td>
          <td class="actions-cell">
            <button type="button" onclick="AramcoApp.openSEODrawer(${page.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>
              Edit Metadata
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  function openSEODrawer(id) {
    const state = window.AramcoStore.get();
    const page = state.seoPages.find(p => p.id === Number(id));
    if (!page) return;

    activeEditingRecord = page;

    const drawer = document.getElementById('seo-edit-drawer-overlay');
    if (!drawer) return;

    // Fill form
    document.getElementById('seo-edit-id').value = page.id;
    document.getElementById('seo-page-name').value = page.name;
    document.getElementById('seo-route-slug').value = page.routeSlug;
    document.getElementById('seo-meta-title').value = page.metaTitle;
    document.getElementById('seo-meta-description').value = page.metaDescription;
    document.getElementById('seo-canonical-url').value = page.canonicalUrl;
    document.getElementById('seo-og-title').value = page.ogTitle || '';
    document.getElementById('seo-og-description').value = page.ogDescription || '';
    document.getElementById('seo-og-image').value = page.ogImageUrl || '';

    const drawerNameEl = document.getElementById('seo-drawer-page-name');
    if (drawerNameEl) drawerNameEl.textContent = page.name;

    updateSEOCharCounters();
    drawer.classList.add('open');
  }

  function updateSEOCharCounters() {
    const titleVal = document.getElementById('seo-meta-title')?.value || '';
    const descVal = document.getElementById('seo-meta-description')?.value || '';

    const titleHint = document.getElementById('seo-title-hint');
    const descHint = document.getElementById('seo-desc-hint');

    if (titleHint) titleHint.textContent = `Recommended length: 50–60 characters. Current: ${titleVal.length}`;
    if (descHint) descHint.textContent = `Recommended length: 150–160 characters. Current: ${descVal.length}`;
  }

  // --- MEDIA ASSET LIBRARY ---
  function renderMediaAssets(state) {
    const tbody = document.getElementById('media-table-body');
    if (tbody) {
      if (!state.mediaAssets || state.mediaAssets.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-table-state">No media assets uploaded yet.</td></tr>`;
        return;
      }

      tbody.innerHTML = state.mediaAssets.map(asset => `
        <tr>
          <td>
            <div class="media-thumb-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;color:var(--blue);"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            </div>
          </td>
          <td>
            <div class="cell-primary" style="font-weight:700;">${asset.fileName}</div>
            <div class="cell-secondary" style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Alt: ${asset.altText}</div>
          </td>
          <td class="cell-secondary" style="color:var(--text-secondary);">${asset.mimeType}</td>
          <td class="cell-secondary" style="color:var(--text-secondary);">${asset.fileSizeFormatted}</td>
          <td class="actions-cell" style="text-align:center;justify-content:center;">
            <button type="button" class="danger" style="color:var(--red);background:none;border:none;padding:0;font-weight:700;font-size:13px;display:inline-flex;align-items:center;justify-content:center;gap:4px;cursor:pointer;margin:0 auto;" onclick="AramcoApp.confirmDelete('media', ${asset.id}, '${asset.fileName}')">
              Delete
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // --- STATION LOCATOR REGISTRY ---
  function renderStationLocator(state) {
    let stations = window.AramcoFilters.filterItems(state.stations, filterState.stationsSearch, ['name', 'address', 'city', 'region', 'country']);
    stations = window.AramcoFilters.sortItems(stations, sortState.stations.field, sortState.stations.order);

    const paginated = window.AramcoPagination.paginate(stations, paginationState.stations.page, paginationState.stations.pageSize);

    const countEl = document.getElementById('station-result-count');
    if (countEl) countEl.textContent = `Showing ${paginated.start} to ${paginated.end} of ${paginated.total} entries`;

    const tbody = document.getElementById('station-table-body');
    if (tbody) {
      if (paginated.items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-table-state">No matching station locations found.</td></tr>`;
      } else {
        tbody.innerHTML = paginated.items.map(s => `
          <tr>
            <td>
              <div class="cell-with-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.6 7-12a7 7 0 10-14 0c0 5.4 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
                <span class="cell-primary">${s.name}</span>
              </div>
            </td>
            <td class="cell-secondary" style="color:var(--text-secondary);">${s.address}</td>
            <td class="cell-secondary" style="color:var(--text-secondary);">${s.lat}, ${s.lng}</td>
            <td>
              <div class="chip-group">
                ${s.services.proforce ? '<span class="chip">ProForce</span>' : ''}
                ${s.services.aStop ? '<span class="chip">A-Stop</span>' : ''}
                ${s.services.carWash ? '<span class="chip">Car Wash</span>' : ''}
                ${s.services.oilChange ? '<span class="chip">Oil Change</span>' : ''}
              </div>
            </td>
            <td><span class="badge badge--active">${s.status}</span></td>
            <td class="actions-cell">
              <button type="button" style="color:var(--blue);font-weight:600;background:none;border:none;padding:0;cursor:pointer;" onclick="AramcoApp.openStationDrawer(${s.id})">Edit Site</button>
            </td>
          </tr>
        `).join('');
      }
    }

    const paginationContainer = document.getElementById('station-pagination-controls');
    window.AramcoPagination.renderControls(paginationContainer, paginated, (newPage) => {
      paginationState.stations.page = newPage;
      renderCurrentScreen();
    });
  }

  function openStationDrawer(id = null) {
    const drawer = document.getElementById('station-edit-drawer-overlay');
    if (!drawer) return;

    const titleEl = document.getElementById('station-drawer-title');

    if (id) {
      const state = window.AramcoStore.get();
      const station = state.stations.find(s => s.id === Number(id));
      if (!station) return;
      activeEditingRecord = station;

      if (titleEl) titleEl.textContent = 'Edit Station Location';
      document.getElementById('station-edit-id').value = station.id;
      document.getElementById('station-name').value = station.name;
      document.getElementById('station-region').value = station.region || '';
      document.getElementById('station-city').value = station.city || '';
      document.getElementById('station-country').value = station.country || '';
      document.getElementById('station-lat').value = station.lat || '';
      document.getElementById('station-lng').value = station.lng || '';
      document.getElementById('station-address').value = station.address || '';
      document.getElementById('srv-proforce').checked = !!station.services?.proforce;
      document.getElementById('srv-carwash').checked = !!station.services?.carWash;
      document.getElementById('srv-astop').checked = !!station.services?.aStop;
      document.getElementById('srv-oilchange').checked = !!station.services?.oilChange;
      document.getElementById('station-status').value = station.status || 'ACTIVE';
    } else {
      activeEditingRecord = null;
      if (titleEl) titleEl.textContent = 'Add New Station Location';
      document.getElementById('station-edit-id').value = '';
      document.getElementById('station-name').value = '';
      document.getElementById('station-region').value = '';
      document.getElementById('station-city').value = '';
      document.getElementById('station-country').value = '';
      document.getElementById('station-lat').value = '';
      document.getElementById('station-lng').value = '';
      document.getElementById('station-address').value = '';
      document.getElementById('srv-proforce').checked = false;
      document.getElementById('srv-carwash').checked = false;
      document.getElementById('srv-astop').checked = false;
      document.getElementById('srv-oilchange').checked = false;
      document.getElementById('station-status').value = 'ACTIVE';
    }

    drawer.classList.add('open');
  }

  // --- CONTACT INQUIRIES ---
  function renderContactInquiries(state) {
    let inquiries = window.AramcoFilters.filterItems(state.contactInquiries, filterState.inquiriesSearch, ['name', 'email', 'subject', 'excerpt', 'message']);
    inquiries = window.AramcoFilters.filterByField(inquiries, 'subject', filterState.inquiriesSubject);
    inquiries = window.AramcoFilters.filterByField(inquiries, 'status', filterState.inquiriesStatus);

    const countEl = document.getElementById('inquiry-result-count');
    if (countEl) countEl.textContent = `Showing 1 to ${inquiries.length} of ${state.contactInquiries.length} entries`;

    const tbody = document.getElementById('inquiry-table-body');
    if (tbody) {
      if (inquiries.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="empty-table-state">No matching contact inquiries found.</td></tr>`;
        return;
      }

      tbody.innerHTML = inquiries.map(inq => `
        <tr>
          <td>
            <div class="cell-primary">${inq.name}</div>
            <div class="cell-secondary" style="color:var(--blue);">${inq.email}</div>
            <div class="cell-secondary">${inq.phone}</div>
          </td>
          <td class="cell-primary" style="font-weight:600;">${inq.subject}</td>
          <td class="cell-secondary" style="color:var(--text-secondary);">${inq.excerpt}</td>
          <td>${inq.attachment ? `<a href="#" onclick="event.preventDefault();"><svg style="width:12px;height:12px;display:inline;vertical-align:-1px;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>View File</a>` : '<span class="cell-secondary">None</span>'}</td>
          <td><span class="badge badge--new">${inq.status}</span></td>
          <td class="cell-secondary" style="color:var(--text-secondary);">${inq.date}</td>
          <td class="actions-cell" style="text-align:center;justify-content:center;">
            <button type="button" style="color:var(--blue);font-weight:600;background:none;border:none;padding:0;cursor:pointer;" onclick="AramcoApp.openInquiryModal(${inq.id})">View</button>
            <button type="button" class="danger" style="color:var(--red);font-weight:600;background:none;border:none;padding:0;cursor:pointer;" onclick="AramcoApp.confirmDelete('inquiry', ${inq.id}, '${inq.name}')">Delete</button>
          </td>
        </tr>
      `).join('');
    }
  }

  function openInquiryModal(id) {
    const state = window.AramcoStore.get();
    const inq = state.contactInquiries.find(i => i.id === Number(id));
    if (!inq) return;

    const modal = document.getElementById('inquiry-view-modal');
    if (!modal) return;

    document.getElementById('inq-modal-name').textContent = inq.name;
    document.getElementById('inq-modal-phone').textContent = inq.phone;
    document.getElementById('inq-modal-email').textContent = inq.email;
    document.getElementById('inq-modal-reason').textContent = inq.subject;
    document.getElementById('inq-modal-message').textContent = inq.message;

    modal.classList.add('open');
  }

  // --- MEDIA ASSETS ---
  function renderMediaAssets(state) {
    const tbody = document.getElementById('media-table-body');
    if (tbody) {
      if (state.mediaAssets.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-table-state">No media assets found.</td></tr>`;
        return;
      }

      tbody.innerHTML = state.mediaAssets.map(asset => `
        <tr>
          <td>
            <img src="${asset.thumbnailUrl}" alt="${asset.altText}" style="width:44px;height:32px;object-fit:cover;border-radius:4px;border:1px solid var(--border);">
          </td>
          <td>
            <div class="cell-primary">${asset.fileName}</div>
            <div class="cell-secondary">Alt: ${asset.altText}</div>
          </td>
          <td class="cell-secondary" style="color:var(--text-secondary);">${asset.mimeType}</td>
          <td class="cell-secondary" style="color:var(--text-secondary);">${asset.fileSizeFormatted}</td>
          <td class="actions-cell">
            <button type="button" class="danger" onclick="AramcoApp.confirmDelete('media', ${asset.id}, '${asset.fileName}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/></svg>
              Delete
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // --- WEB FONTS ---
  function renderWebFonts(state) {
    const activeFamilyEl = document.getElementById('active-font-family-name');
    if (activeFamilyEl) activeFamilyEl.textContent = state.webFonts.activeFontFamily;

    const tbody = document.getElementById('webfonts-table-body');
    if (tbody) {
      tbody.innerHTML = state.webFonts.weights.map(weight => `
        <tr>
          <td class="cell-primary">${weight.weightLabel}</td>
          <td>${weight.format}</td>
          <td class="cell-secondary" style="color:var(--text-secondary);">${weight.path}</td>
          <td>
            ${weight.isFallback ? '<span class="badge badge--missing">Fallback Active</span>' : '<span class="badge badge--live">Live</span>'}
          </td>
          <td class="actions-cell">
            ${weight.isFallback ? `<button type="button">Upload File</button>` : `<button type="button">Replace</button> <button type="button" class="danger" onclick="AramcoCRUD.deleteFontWeight(${weight.id})">Delete</button>`}
          </td>
        </tr>
      `).join('');
    }
  }

  // --- SECURITY LOGS ---
  function renderSecurityLogs(state) {
    let logs = window.AramcoFilters.filterItems(state.securityLogs, filterState.securitySearch, ['timestamp', 'eventType', 'status', 'ip', 'actionBy', 'details']);
    logs = window.AramcoFilters.filterByField(logs, 'eventType', filterState.securityEventType);

    const paginated = window.AramcoPagination.paginate(logs, paginationState.securityLogs.page, paginationState.securityLogs.pageSize);

    const countEl = document.getElementById('security-result-count');
    if (countEl) countEl.textContent = `Showing ${paginated.start} to ${paginated.end} of ${paginated.total} entries`;

    const tbody = document.getElementById('security-table-body');
    if (tbody) {
      if (paginated.items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-table-state">No security log entries found.</td></tr>`;
      } else {
        tbody.innerHTML = paginated.items.map(log => `
          <tr>
            <td class="cell-secondary" style="color:var(--text);">${log.timestamp}</td>
            <td>
              <div><span class="badge badge--neutral">${log.eventType}</span></div>
              <div style="margin-top:6px;"><span class="badge badge--success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                ${log.status}</span></div>
            </td>
            <td>
              <div class="cell-primary" style="font-family:monospace;font-weight:600;">${log.ip}</div>
              <div class="cell-secondary" style="max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${log.userAgent}</div>
            </td>
            <td style="max-width:320px;">
              <div class="cell-primary">${log.actionBy}</div>
              <div class="cell-secondary">${log.details}</div>
            </td>
            <td class="actions-cell">
              <span class="badge badge--active" style="margin-right:8px;">${log.isIpBlocked ? 'Blocked' : 'Active'}</span>
              <button class="btn-block-ip" type="button" onclick="AramcoApp.toggleBlockIp(${log.id})">${log.isIpBlocked ? 'Unblock IP' : 'Block IP'}</button>
            </td>
          </tr>
        `).join('');
      }
    }

    const paginationContainer = document.getElementById('security-pagination-controls');
    window.AramcoPagination.renderControls(paginationContainer, paginated, (newPage) => {
      paginationState.securityLogs.page = newPage;
      renderCurrentScreen();
    });
  }

  function toggleBlockIp(id) {
    const state = window.AramcoStore.get();
    const log = state.securityLogs.find(l => l.id === Number(id));
    if (log) {
      log.isIpBlocked = !log.isIpBlocked;
      window.AramcoStore.save(state);
      renderCurrentScreen();
    }
  }

  // --- ADMIN ROLES & PERMISSIONS ---
  function renderAdminRoles(state) {
    const tbody = document.getElementById('adminroles-table-body');
    if (tbody) {
      if (state.adminUsers.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-table-state">No admin accounts found.</td></tr>`;
        return;
      }

      tbody.innerHTML = state.adminUsers.map(user => {
        let badgeClass = 'badge--role';
        if (user.roleType === 'superadmin') badgeClass = 'badge--superadmin';
        if (user.roleType === 'admin') badgeClass = 'badge--admin';
        if (user.roleType === 'none') badgeClass = 'badge--none';

        return `
          <tr>
            <td>
              <div class="cell-with-icon">
                <svg style="color:var(--green-strong)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><path d="M12 3l7 4v5c0 5-3 8.5-7 9-4-.5-7-4-7-9V7l7-4z"/></svg>
                <span class="cell-primary">${user.fullName}</span>
              </div>
            </td>
            <td class="cell-secondary" style="color:var(--text-secondary);">${user.email}</td>
            <td><span class="badge ${badgeClass}">${user.role}</span></td>
            <td><span class="badge badge--active">${user.status}</span></td>
            <td class="actions-cell">
              <button type="button" onclick="AramcoApp.openAccountDrawer(${user.id})">Edit User</button>
              <button type="button" class="warning" onclick="AramcoCRUD.toggleUserStatus(${user.id})">${user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}</button>
              <button type="button" class="danger" onclick="AramcoApp.confirmDelete('user', ${user.id}, '${user.fullName}')">Delete</button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  function openAccountDrawer(id = null) {
    const drawer = document.getElementById('create-account-drawer-overlay');
    if (!drawer) return;

    if (id) {
      const state = window.AramcoStore.get();
      const user = state.adminUsers.find(u => u.id === Number(id));
      if (!user) return;
      activeEditingRecord = user;

      document.getElementById('acc-edit-id').value = user.id;
      document.getElementById('acc-fullname').value = user.fullName;
      document.getElementById('acc-email').value = user.email;
      document.getElementById('acc-password').value = '••••••••';
      document.getElementById('acc-superadmin').checked = user.roleType === 'superadmin';
      document.getElementById('acc-rolename').value = user.role || '';
    } else {
      activeEditingRecord = null;
      document.getElementById('acc-edit-id').value = '';
      document.getElementById('acc-fullname').value = '';
      document.getElementById('acc-email').value = '';
      document.getElementById('acc-password').value = '';
      document.getElementById('acc-superadmin').checked = false;
      document.getElementById('acc-rolename').value = '';
    }

    drawer.classList.add('open');
  }

  // --- PAGE CONTENT MANAGER ---
  function renderPageContent(state) {
    const settings = state.pageContent.globalSettings;
    const pathInput = document.getElementById('pc-logo-url-path');
    const altInput = document.getElementById('pc-logo-alt');
    const waInput = document.getElementById('pc-whatsapp');
    const callInput = document.getElementById('pc-callcenter');

    if (pathInput) pathInput.value = settings.logoUrlPath;
    if (altInput) altInput.value = settings.logoAltText;
    if (waInput) waInput.value = settings.whatsappNumber;
    if (callInput) callInput.value = settings.callCenterNumber;
  }

  // --- CONFIRMATION MODAL & DELETE DISPATCHER ---
  function confirmDelete(type, id, title) {
    activeDeleteTarget = { type, id };
    const modal = document.getElementById('delete-confirm-modal');
    if (!modal) return;

    document.getElementById('delete-target-title').textContent = title || 'this record';
    modal.classList.add('open');
  }

  function executeDelete() {
    if (!activeDeleteTarget) return;
    const { type, id } = activeDeleteTarget;

    if (type === 'station') window.AramcoCRUD.deleteStation(id);
    if (type === 'inquiry') window.AramcoCRUD.deleteInquiry(id);
    if (type === 'media') window.AramcoCRUD.deleteMediaAsset(id);
    if (type === 'user') window.AramcoCRUD.deleteAdminUser(id);

    activeDeleteTarget = null;
    const modal = document.getElementById('delete-confirm-modal');
    if (modal) modal.classList.remove('open');
  }

  // --- EVENT LISTENERS & FORM SUBMISSIONS ---
  function setupEventListeners() {
    // Navigation items
    document.querySelectorAll('[data-screen-link]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = link.getAttribute('data-screen-link');
        currentScreen = target;

        document.querySelectorAll('[data-screen-link]').forEach(l => {
          l.classList.remove('active');
          const d = l.querySelector('.dot');
          if (d) d.remove();
        });

        link.classList.add('active');
        const dotSpan = document.createElement('span');
        dotSpan.className = 'dot';
        link.appendChild(dotSpan);

        document.querySelectorAll('.screen').forEach(s => {
          s.style.display = s.id === 'screen-' + target ? 'block' : 'none';
        });

        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.remove('open');

        window.scrollTo(0, 0);
        renderCurrentScreen();
      });
    });

    // Login Form Submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', e => {
        e.preventDefault();
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('app-shell').style.display = 'flex';
        renderCurrentScreen();
      });
    }

    // Sign Out
    document.addEventListener('click', e => {
      if (e.target.closest('.btn-signout')) {
        document.getElementById('app-shell').style.display = 'none';
        document.getElementById('login-screen').style.display = 'flex';
      }
    });

    // Search input listeners
    document.getElementById('station-search-input')?.addEventListener('input', e => {
      filterState.stationsSearch = e.target.value;
      paginationState.stations.page = 1;
      renderCurrentScreen();
    });

    document.getElementById('seo-search-input')?.addEventListener('input', e => {
      filterState.seoSearch = e.target.value;
      renderCurrentScreen();
    });

    document.getElementById('inquiry-search-input')?.addEventListener('input', e => {
      filterState.inquiriesSearch = e.target.value;
      renderCurrentScreen();
    });

    document.getElementById('security-search-input')?.addEventListener('input', e => {
      filterState.securitySearch = e.target.value;
      paginationState.securityLogs.page = 1;
      renderCurrentScreen();
    });

    // Filter dropdown listeners
    document.getElementById('inquiry-subject-filter')?.addEventListener('change', e => {
      filterState.inquiriesSubject = e.target.value;
      renderCurrentScreen();
    });

    document.getElementById('inquiry-status-filter')?.addEventListener('change', e => {
      filterState.inquiriesStatus = e.target.value;
      renderCurrentScreen();
    });

    document.getElementById('security-event-filter')?.addEventListener('change', e => {
      filterState.securityEventType = e.target.value;
      renderCurrentScreen();
    });

    // SEO drawer form submit
    document.getElementById('btn-save-seo')?.addEventListener('click', () => {
      const id = document.getElementById('seo-edit-id').value;
      if (!id) return;

      window.AramcoCRUD.saveSEOMetadata({
        id: Number(id),
        name: document.getElementById('seo-page-name').value,
        routeSlug: document.getElementById('seo-route-slug').value,
        metaTitle: document.getElementById('seo-meta-title').value,
        metaDescription: document.getElementById('seo-meta-description').value,
        canonicalUrl: document.getElementById('seo-canonical-url').value,
        ogTitle: document.getElementById('seo-og-title').value,
        ogDescription: document.getElementById('seo-og-description').value,
        ogImageUrl: document.getElementById('seo-og-image').value
      });

      document.getElementById('seo-edit-drawer-overlay').classList.remove('open');
    });

    // SEO char counter listeners
    document.getElementById('seo-meta-title')?.addEventListener('input', updateSEOCharCounters);
    document.getElementById('seo-meta-description')?.addEventListener('input', updateSEOCharCounters);

    // Station drawer save
    document.getElementById('btn-save-station')?.addEventListener('click', () => {
      const id = document.getElementById('station-edit-id').value;
      const name = document.getElementById('station-name').value;
      if (!name.trim()) return alert('Station Name is required.');

      window.AramcoCRUD.saveStation({
        id: id ? Number(id) : null,
        name: name,
        region: document.getElementById('station-region').value,
        city: document.getElementById('station-city').value,
        country: document.getElementById('station-country').value,
        lat: document.getElementById('station-lat').value,
        lng: document.getElementById('station-lng').value,
        address: document.getElementById('station-address').value,
        services: {
          proforce: document.getElementById('srv-proforce').checked,
          carWash: document.getElementById('srv-carwash').checked,
          aStop: document.getElementById('srv-astop').checked,
          oilChange: document.getElementById('srv-oilchange').checked
        },
        status: document.getElementById('station-status').value
      });

      document.getElementById('station-edit-drawer-overlay').classList.remove('open');
    });

    // Create / Edit Account drawer save
    document.getElementById('btn-save-account')?.addEventListener('click', () => {
      const id = document.getElementById('acc-edit-id').value;
      const fullName = document.getElementById('acc-fullname').value;
      const email = document.getElementById('acc-email').value;

      if (!fullName.trim() || !email.trim()) return alert('Full name and email address are required.');

      const isSuper = document.getElementById('acc-superadmin').checked;
      const roleName = document.getElementById('acc-rolename').value || (isSuper ? 'SUPER ADMIN' : 'ADMIN');

      window.AramcoCRUD.saveAdminUser({
        id: id ? Number(id) : null,
        fullName: fullName,
        email: email,
        role: roleName.toUpperCase(),
        roleType: isSuper ? 'superadmin' : 'admin',
        status: 'ACTIVE'
      });

      document.getElementById('create-account-drawer-overlay').classList.remove('open');
    });

    // Confirm Delete action
    document.getElementById('btn-confirm-delete')?.addEventListener('click', executeDelete);

    // Toggle password visibility
    document.getElementById('toggle-password-vis')?.addEventListener('click', () => {
      const passInput = document.getElementById('acc-password');
      if (passInput) {
        passInput.type = passInput.type === 'password' ? 'text' : 'password';
      }
    });

    // Close overlays when clicking close targets or backdrop
    document.addEventListener('click', e => {
      const closer = e.target.closest('[data-close-target]');
      if (closer) {
        const el = document.querySelector(closer.getAttribute('data-close-target'));
        if (el) el.classList.remove('open');
        return;
      }
      if (e.target.classList.contains('overlay')) {
        e.target.classList.remove('open');
        return;
      }

      // User dropdown
      const avatarBtn = e.target.closest('[data-toggle="user-dropdown"]');
      const dropdown = document.getElementById('user-dropdown');
      if (avatarBtn && dropdown) {
        dropdown.classList.toggle('open');
        return;
      }
      if (dropdown && dropdown.classList.contains('open') && !e.target.closest('#user-dropdown')) {
        dropdown.classList.remove('open');
      }

      // Mobile sidebar
      const mobileToggle = e.target.closest('.mobile-menu-btn');
      if (mobileToggle) {
        document.querySelector('.sidebar').classList.toggle('open');
      }
    });
  }

  return {
    init,
    renderCurrentScreen,
    openSEODrawer,
    openStationDrawer,
    openInquiryModal,
    openAccountDrawer,
    confirmDelete,
    toggleBlockIp
  };
})();

// Document Ready Bootstrap
document.addEventListener('DOMContentLoaded', function () {
  window.AramcoApp.init();
});

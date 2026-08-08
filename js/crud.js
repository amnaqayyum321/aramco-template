/**
 * Aramco CMS Administrative Portal - CRUD Operations Module
 */

window.AramcoCRUD = (function () {
  // Global Store reference
  function getState() {
    return window.AramcoStore.get();
  }

  function saveState(state) {
    window.AramcoStore.save(state);
    if (window.AramcoApp && typeof window.AramcoApp.renderCurrentScreen === 'function') {
      window.AramcoApp.renderCurrentScreen();
    }
  }

  // --- STATIONS CRUD ---
  function saveStation(stationData) {
    const state = getState();
    if (stationData.id) {
      // Edit existing
      const idx = state.stations.findIndex(s => s.id === Number(stationData.id));
      if (idx !== -1) {
        state.stations[idx] = { ...state.stations[idx], ...stationData };
      }
    } else {
      // Create new
      const newId = state.stations.length ? Math.max(...state.stations.map(s => s.id)) + 1 : 1;
      state.stations.unshift({
        id: newId,
        ...stationData
      });
      state.stats.activeStationsCount = state.stations.filter(s => s.status === 'ACTIVE').length;
      state.stats.activeStationsTotal = state.stations.length;
    }
    saveState(state);
  }

  function deleteStation(id) {
    const state = getState();
    state.stations = state.stations.filter(s => s.id !== Number(id));
    state.stats.activeStationsCount = state.stations.filter(s => s.status === 'ACTIVE').length;
    state.stats.activeStationsTotal = state.stations.length;
    saveState(state);
  }

  // --- SEO METADATA CRUD ---
  function saveSEOMetadata(seoData) {
    const state = getState();
    const idx = state.seoPages.findIndex(p => p.id === Number(seoData.id));
    if (idx !== -1) {
      state.seoPages[idx] = { ...state.seoPages[idx], ...seoData };
    }
    saveState(state);
  }

  // --- ADMIN USERS CRUD ---
  function saveAdminUser(userData) {
    const state = getState();
    if (userData.id) {
      const idx = state.adminUsers.findIndex(u => u.id === Number(userData.id));
      if (idx !== -1) {
        state.adminUsers[idx] = { ...state.adminUsers[idx], ...userData };
      }
    } else {
      const newId = state.adminUsers.length ? Math.max(...state.adminUsers.map(u => u.id)) + 1 : 1;
      state.adminUsers.unshift({
        id: newId,
        ...userData
      });
    }
    saveState(state);
  }

  function toggleUserStatus(id) {
    const state = getState();
    const user = state.adminUsers.find(u => u.id === Number(id));
    if (user) {
      user.status = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      saveState(state);
    }
  }

  function deleteAdminUser(id) {
    const state = getState();
    state.adminUsers = state.adminUsers.filter(u => u.id !== Number(id));
    saveState(state);
  }

  // --- INQUIRIES CRUD ---
  function deleteInquiry(id) {
    const state = getState();
    state.contactInquiries = state.contactInquiries.filter(i => i.id !== Number(id));
    state.stats.contactInquiriesCount = state.contactInquiries.length;
    state.stats.contactInquiriesTotal = state.contactInquiries.length;
    saveState(state);
  }

  // --- MEDIA ASSETS CRUD ---
  function deleteMediaAsset(id) {
    const state = getState();
    state.mediaAssets = state.mediaAssets.filter(m => m.id !== Number(id));
    state.stats.mediaAssetsCount = state.mediaAssets.length;
    saveState(state);
  }

  // --- WEB FONTS CRUD ---
  function saveFontWeight(weightData) {
    const state = getState();
    const newId = state.webFonts.weights.length ? Math.max(...state.webFonts.weights.map(w => w.id)) + 1 : 1;
    state.webFonts.weights.push({
      id: newId,
      ...weightData
    });
    saveState(state);
  }

  function deleteFontWeight(id) {
    const state = getState();
    state.webFonts.weights = state.webFonts.weights.filter(w => w.id !== Number(id));
    saveState(state);
  }

  // --- PAGE CONTENT CRUD ---
  function savePageContentSettings(settings) {
    const state = getState();
    state.pageContent.globalSettings = { ...state.pageContent.globalSettings, ...settings };
    saveState(state);
  }

  return {
    saveStation,
    deleteStation,
    saveSEOMetadata,
    saveAdminUser,
    toggleUserStatus,
    deleteAdminUser,
    deleteInquiry,
    deleteMediaAsset,
    saveFontWeight,
    deleteFontWeight,
    savePageContentSettings
  };
})();

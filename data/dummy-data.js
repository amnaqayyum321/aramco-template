/**
 * Aramco CMS Administrative Portal - Dummy Data Storage
 * Structured for easy API integration replacement.
 */

(function () {
  const STORAGE_KEY = 'ARAMCO_CMS_DATA_V1';

  const defaultData = {
    currentUser: {
      name: "Aramco Admin",
      role: "SUPER_ADMIN",
      email: "admin@aramco.stations"
    },

    stats: {
      activeStationsCount: 67,
      activeStationsTotal: 68,
      contactInquiriesCount: 5,
      contactInquiriesTotal: 5,
      seoPagesCount: 9,
      mediaAssetsCount: 1
    },

    systemCompliance: {
      nextJsVersion: "15.5.19",
      storagePath: "public/uploads",
      ormDatabase: "Prisma / PostgreSQL"
    },

    recentInquiries: [
      { id: 1, name: "REENAY", subject: "bvjhugj", date: "7/16/2026", isNew: true },
      { id: 2, name: "hfuju", subject: "vuiuligv", date: "7/16/2026", isNew: true },
      { id: 3, name: "Ureen test", subject: "bjbxuydg", date: "7/13/2026", isNew: true },
      { id: 4, name: "Samama Zargham", subject: "Get fleet Card", date: "7/13/2026", isNew: true },
      { id: 5, name: "test ureen", subject: "dchbsk", date: "7/13/2026", isNew: true }
    ],

    seoPages: [
      {
        id: 1,
        name: "A-Stop Convenience",
        routeSlug: "/a-stop",
        metaTitle: "A-Stop Convenience Stores | Aramco Stations",
        metaDescription: "Refresh and refuel at Aramco A-Stop convenience stores. Quick snacks, premium beverages, and essential travel supplies on the go.",
        canonicalUrl: "https://www.aramco.com.sa/a-stop",
        ogTitle: "A-Stop Convenience Stores | Aramco Stations",
        ogDescription: "Premium snacks, fresh drinks, and clean facilities during your travels at A-Stop.",
        ogImageUrl: "https://www.aramco.com.sa/og/a-stop.jpg",
        indexing: "INDEX"
      },
      {
        id: 2,
        name: "About Us",
        routeSlug: "/about",
        metaTitle: "About Aramco Stations | Fueling Journeys & Communities",
        metaDescription: "Learn about Aramco Stations, our vision, values, and commitment to providing world-class fueling and retail experiences.",
        canonicalUrl: "https://www.aramco.com.sa/about",
        ogTitle: "About Aramco Stations",
        ogDescription: "Fueling journeys & communities across the nation.",
        ogImageUrl: "",
        indexing: "INDEX"
      },
      {
        id: 3,
        name: "Car Wash",
        routeSlug: "/car-wash",
        metaTitle: "Professional Car Wash Services | Aramco Car Wash",
        metaDescription: "Keep your vehicle spotless with Aramco automated and manual car wash services using eco-friendly cleaning formulas.",
        canonicalUrl: "https://www.aramco.com.sa/car-wash",
        ogTitle: "Professional Car Wash Services | Aramco Car Wash",
        ogDescription: "Eco-friendly, fast, and thorough car washing at Aramco.",
        ogImageUrl: "",
        indexing: "INDEX"
      },
      {
        id: 4,
        name: "Contact Us",
        routeSlug: "/contact",
        metaTitle: "Contact Us | Aramco Petroleum Customer Support",
        metaDescription: "Get in touch with Aramco customer support team for inquiries, feedback, fleet card support, or partnership opportunities.",
        canonicalUrl: "https://www.aramco.com.sa/contact",
        ogTitle: "Contact Us | Aramco Petroleum",
        ogDescription: "We are here to assist you 24/7.",
        ogImageUrl: "",
        indexing: "INDEX"
      },
      {
        id: 5,
        name: "Feedback",
        routeSlug: "/feedback",
        metaTitle: "Share Your Feedback | Aramco Stations Pakistan",
        metaDescription: "We value your input. Share your experience at Aramco service stations to help us improve our services.",
        canonicalUrl: "https://www.aramco.com.sa/feedback",
        ogTitle: "Share Your Feedback | Aramco Stations",
        ogDescription: "Help us serve you better by giving feedback.",
        ogImageUrl: "",
        indexing: "INDEX"
      },
      {
        id: 6,
        name: "Find Us / Station Locator",
        routeSlug: "/find-us",
        metaTitle: "Aramco Station Locator | Find a Service Station Near You",
        metaDescription: "Locate nearby Aramco gas stations, view offered services like ProForce fuels, A-Stop stores, car wash, and oil change.",
        canonicalUrl: "https://www.aramco.com.sa/find-us",
        ogTitle: "Aramco Station Locator",
        ogDescription: "Find an Aramco service station near you with interactive map.",
        ogImageUrl: "",
        indexing: "INDEX"
      },
      {
        id: 7,
        name: "Home",
        routeSlug: "/",
        metaTitle: "Aramco Petroleum | Fueling Tomorrow",
        metaDescription: "Welcome to Aramco Stations - providing high-performance ProForce fuels, convenience retail, and top-tier automotive care.",
        canonicalUrl: "https://www.aramco.com.sa/",
        ogTitle: "Aramco Petroleum | Fueling Tomorrow",
        ogDescription: "World-class fueling and retail experiences.",
        ogImageUrl: "",
        indexing: "INDEX"
      },
      {
        id: 8,
        name: "ProForce Fuel",
        routeSlug: "/proforce",
        metaTitle: "ProForce Premium Fuels | Aramco Proforce Fuel",
        metaDescription: "Experience cleaner engine performance, improved fuel efficiency, and maximum engine protection with Aramco ProForce fuels.",
        canonicalUrl: "https://www.aramco.com.sa/proforce",
        ogTitle: "ProForce Premium Fuels",
        ogDescription: "Engineered for maximum power and efficiency.",
        ogImageUrl: "",
        indexing: "INDEX"
      },
      {
        id: 9,
        name: "Fleet Card",
        routeSlug: "/fleet-card",
        metaTitle: "Aramco Fleet Card | Commercial Fuel Management",
        metaDescription: "Manage company fleet fuel expenses effortlessly with Aramco Fleet Card program.",
        canonicalUrl: "https://www.aramco.com.sa/fleet-card",
        ogTitle: "Aramco Fleet Card",
        ogDescription: "Smart commercial fuel management solution.",
        ogImageUrl: "",
        indexing: "INDEX"
      }
    ],

    mediaAssets: [
      {
        id: 1,
        fileName: "home_main_banner_2-1785914851331-247217569.webp",
        mimeType: "image/webp",
        fileSizeFormatted: "248.56 KB",
        altText: "CMS custom branding heroImage",
        thumbnailUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA0NCAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDQiIGhlaWdodD0iMzIiIGZpbGw9IiMxYzI0MmYiLz48dGV4dCB4PSIyMiIgeT0iMjAiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzhiZDM0NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QnJhbmQ8L3RleHQ+PC9zdmc+"
      }
    ],

    stations: [
      {
        id: 1,
        name: "test station",
        address: "Gulberg Main Boulevard, Lahore",
        region: "Punjab",
        city: "Lahore",
        country: "Pakistan",
        lat: "31.5204",
        lng: "74.3587",
        services: { proforce: true, aStop: true, carWash: true, oilChange: false },
        status: "ACTIVE"
      },
      {
        id: 2,
        name: "COCO ARAMCO 1 - LIBERTY",
        address: "Liberty Market, Gulberg, Lahore",
        region: "Punjab",
        city: "Lahore",
        country: "Pakistan",
        lat: "31.5100",
        lng: "74.3400",
        services: { proforce: true, aStop: true, carWash: true, oilChange: true },
        status: "ACTIVE"
      },
      {
        id: 3,
        name: "COCO ARAMCO 2 - EMBASSY",
        address: "Embassy Road, Islamabad",
        region: "ICT",
        city: "Islamabad",
        country: "Pakistan",
        lat: "33.7294",
        lng: "73.0931",
        services: { proforce: true, aStop: true, carWash: true, oilChange: true },
        status: "ACTIVE"
      },
      {
        id: 4,
        name: "COCO ARAMCO 3 - EXPO",
        address: "Near Expo Center, Lahore",
        region: "Punjab",
        city: "Lahore",
        country: "Pakistan",
        lat: "31.4700",
        lng: "74.2700",
        services: { proforce: true, aStop: true, carWash: true, oilChange: true },
        status: "ACTIVE"
      },
      {
        id: 5,
        name: "COCO ARAMCO 4 - SHAHDRA",
        address: "Shahdra, Lahore",
        region: "Punjab",
        city: "Lahore",
        country: "Pakistan",
        lat: "31.6200",
        lng: "74.2800",
        services: { proforce: true, aStop: true, carWash: true, oilChange: true },
        status: "ACTIVE"
      },
      {
        id: 6,
        name: "COCO ARAMCO 5 - HAYATABAD",
        address: "Hayatabad, Peshawar",
        region: "KPK",
        city: "Peshawar",
        country: "Pakistan",
        lat: "33.9900",
        lng: "71.4200",
        services: { proforce: true, aStop: true, carWash: true, oilChange: true },
        status: "ACTIVE"
      },
      {
        id: 7,
        name: "COCO ARAMCO 6 - WAZIRABAD",
        address: "GT Road, Wazirabad",
        region: "Punjab",
        city: "Wazirabad",
        country: "Pakistan",
        lat: "32.4400",
        lng: "74.1200",
        services: { proforce: true, aStop: true, carWash: true, oilChange: true },
        status: "ACTIVE"
      },
      {
        id: 8,
        name: "COCO ARAMCO 7 - MULTAN ROAD",
        address: "Multan Road, Lahore",
        region: "Punjab",
        city: "Lahore",
        country: "Pakistan",
        lat: "31.4900",
        lng: "74.2400",
        services: { proforce: true, aStop: true, carWash: true, oilChange: false },
        status: "ACTIVE"
      },
      {
        id: 9,
        name: "COCO ARAMCO 8 - FAISALABAD",
        address: "Canal Bank Road, Faisalabad",
        region: "Punjab",
        city: "Faisalabad",
        country: "Pakistan",
        lat: "31.4180",
        lng: "73.0790",
        services: { proforce: true, aStop: true, carWash: true, oilChange: true },
        status: "ACTIVE"
      },
      {
        id: 10,
        name: "COCO ARAMCO 9 - RAWALPINDI",
        address: "Peshawar Road, Rawalpindi",
        region: "Punjab",
        city: "Rawalpindi",
        country: "Pakistan",
        lat: "33.5970",
        lng: "73.0470",
        services: { proforce: true, aStop: true, carWash: false, oilChange: true },
        status: "ACTIVE"
      }
    ],

    contactInquiries: [
      {
        id: 1,
        name: "REENAY",
        email: "hbhn@fgh.com",
        phone: "9866748789",
        subject: "Bvjhugj",
        excerpt: "fgdhtfjukmnb",
        message: "fgdhtfjukmnb",
        attachment: null,
        status: "NEW",
        date: "July 16, 2026"
      },
      {
        id: 2,
        name: "hfuju",
        email: "guuj@chgj.com",
        phone: "79856678vuj",
        subject: "Vuiuligv",
        excerpt: "hgikgoilkg",
        message: "hgikgoilkg",
        attachment: "inquiry_document.pdf",
        status: "NEW",
        date: "July 16, 2026"
      },
      {
        id: 3,
        name: "Ureen test",
        email: "jnbu@jbi.com",
        phone: "099879878",
        subject: "Bjbxuydg",
        excerpt: "huigbkjhiuiu",
        message: "huigbkjhiuiu",
        attachment: "attachment_file.pdf",
        status: "NEW",
        date: "July 13, 2026"
      },
      {
        id: 4,
        name: "Samama Zargham",
        email: "waheed.test@yopmail.com",
        phone: "0321171727",
        subject: "Get Fleet Card",
        excerpt: "Shabash said he had no plans for a second term but he...",
        message: "Shabash said he had no plans for a second term but he wanted to clarify details regarding fleet card issuance for commercial operations.",
        attachment: "fleet_request.pdf",
        status: "NEW",
        date: "July 13, 2026"
      },
      {
        id: 5,
        name: "test ureen",
        email: "hksdlh@hbj.com",
        phone: "082898787698",
        subject: "Dchbsk",
        excerpt: "xbcjasvgichk",
        message: "xbcjasvgichk",
        attachment: "support_doc.pdf",
        status: "NEW",
        date: "July 13, 2026"
      }
    ],

    webFonts: {
      activeFontFamily: "ManifaFontManifaPro2Hefty",
      cssName: "ManifaFontManifaPro2Hefty",
      weights: [
        {
          id: 1,
          weightLabel: "300 - Light",
          format: "OPENTYPE",
          path: "/uploads/manifa_fontmanifapro2_light-1784162326754-391255082.otf",
          status: "Live",
          isFallback: false
        },
        {
          id: 2,
          weightLabel: "400 - Regular",
          format: "OPENTYPE",
          path: "/uploads/manifa_fontmanifapro2_hefty-1784162273603-931376216.otf",
          status: "Live",
          isFallback: false
        },
        {
          id: 3,
          weightLabel: "500 - Medium",
          format: "Missing",
          path: "Roboto Fallback",
          status: "Fallback Active",
          isFallback: true
        },
        {
          id: 4,
          weightLabel: "600 - SemiBold",
          format: "OPENTYPE",
          path: "/uploads/manifa_fontmanifapro2_semibold-1784162337784-685733932.otf",
          status: "Live",
          isFallback: false
        },
        {
          id: 5,
          weightLabel: "700 - Bold",
          format: "OPENTYPE",
          path: "/uploads/manifa_fontmanifapro2_bold-1784162347777-830605045.otf",
          status: "Live",
          isFallback: false
        }
      ]
    },

    securityLogs: [
      {
        id: 1,
        timestamp: "Aug 05, 14:37:05",
        eventType: "LOGOUT",
        status: "SUCCESS",
        ip: "116.58.43.26",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KH...",
        actionBy: "Action by: admin@aramco.stations (Super Admin)",
        details: "Administrator logged out",
        isIpBlocked: false
      },
      {
        id: 2,
        timestamp: "Aug 05, 14:37:01",
        eventType: "ADMIN_USER_UPDATE",
        status: "SUCCESS",
        ip: "116.58.43.26",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KH...",
        actionBy: "Action by: admin@aramco.stations (Super Admin)",
        details: "Updated admin user: testuser@gmail.com (isSuperAdmin: false, isActive: true)",
        isIpBlocked: false
      },
      {
        id: 3,
        timestamp: "Aug 05, 14:37:00",
        eventType: "ROLE_UPDATE",
        status: "SUCCESS",
        ip: "116.58.43.26",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KH...",
        actionBy: "Action by: admin@aramco.stations (Super Admin)",
        details: "Updated custom role: Test Role",
        isIpBlocked: false
      },
      {
        id: 4,
        timestamp: "Aug 05, 14:34:05",
        eventType: "LOGOUT",
        status: "SUCCESS",
        ip: "116.58.43.26",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KH...",
        actionBy: "Action by: testuser@gmail.com (Test Role)",
        details: "Administrator logged out",
        isIpBlocked: false
      },
      {
        id: 5,
        timestamp: "Aug 05, 14:24:01",
        eventType: "LOGOUT",
        status: "SUCCESS",
        ip: "116.58.43.26",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KH...",
        actionBy: "Action by: admin@aramco.stations (Super Admin)",
        details: "Administrator logged out",
        isIpBlocked: false
      },
      {
        id: 6,
        timestamp: "Aug 05, 14:23:56",
        eventType: "ADMIN_USER_UPDATE",
        status: "SUCCESS",
        ip: "116.58.43.26",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KH...",
        actionBy: "Action by: admin@aramco.stations (Super Admin)",
        details: "Updated admin user: testuser@gmail.com (isSuperAdmin: false, isActive: true)",
        isIpBlocked: false
      },
      {
        id: 7,
        timestamp: "Aug 05, 14:23:56",
        eventType: "ROLE_UPDATE",
        status: "SUCCESS",
        ip: "116.58.43.26",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KH...",
        actionBy: "Action by: admin@aramco.stations (Super Admin)",
        details: "Updated custom role: Test Role",
        isIpBlocked: false
      }
    ],

    adminUsers: [
      {
        id: 1,
        fullName: "Test User",
        email: "testuser@gmail.com",
        role: "TESTROLE",
        roleType: "role",
        status: "ACTIVE"
      },
      {
        id: 2,
        fullName: "nay khan",
        email: "nay@gmail.com",
        role: "ABC",
        roleType: "role",
        status: "ACTIVE"
      },
      {
        id: 3,
        fullName: "reenay",
        email: "reenaykhan@gmail.com",
        role: "SUPER ADMIN",
        roleType: "superadmin",
        status: "ACTIVE"
      },
      {
        id: 4,
        fullName: "Ureen Jamil",
        email: "idsncl@nd.com",
        role: "NONE",
        roleType: "none",
        status: "ACTIVE"
      },
      {
        id: 5,
        fullName: "Ureen Jamil",
        email: "ureenjamilrana@gmail.com",
        role: "SUPER ADMIN",
        roleType: "superadmin",
        status: "ACTIVE"
      },
      {
        id: 6,
        fullName: "Yousaf Shafqat",
        email: "yousaf.shafqat@gmail.com",
        role: "ADMIN",
        roleType: "admin",
        status: "ACTIVE"
      },
      {
        id: 7,
        fullName: "Yousaf Shafqat",
        email: "yousaf.shafqat@gno.com.pk",
        role: "ADMIN",
        roleType: "admin",
        status: "ACTIVE"
      },
      {
        id: 8,
        fullName: "Aramco Admin",
        email: "admin@aramco.stations",
        role: "SUPER ADMIN",
        roleType: "superadmin",
        status: "ACTIVE"
      }
    ],

    pageContent: {
      activeTab: "GLOBAL SETTINGS",
      globalSettings: {
        scope: "GLOBAL",
        key: "header_logo",
        title: "Header Navigation Branding Logo",
        logoUrlPath: "/icons/aramco-logo.svg",
        logoAltText: "Aramco Logo",
        whatsappNumber: "000 000 000",
        callCenterNumber: "000 000 000",
        logoPreviewUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjM0IiB2aWV3Qm94PSIwIDAgMTQwIDM0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzNCIgaGVpZ2h0PSIzNCIgcng9IjMiIGZpbGw9IiM2ZmNmMmUiLz4KICA8cmVjdCB4PSIzNCIgeT0iMCIgd2lkdGg9IjEwNiIgaGVpZ2h0PSIzNCIgcng9IjMiIGZpbGw9IiMyOWFiZTIiLz4KICA8dGV4dCB4PSI3MiIgeT0iMjMiIGZvbnQtZmFtaWx5PSJBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hcmFtY288L3RleHQ+Cjwvc3ZnPg=="
      }
    }
  };

  // Helper to load or initialize state
  window.AramcoStore = {
    get: function () {
      try {
        const item = localStorage.getItem(STORAGE_KEY);
        if (item) return JSON.parse(item);
      } catch (e) {
        console.warn("localStorage error, using defaults:", e);
      }
      return defaultData;
    },
    save: function (data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn("localStorage save error:", e);
      }
    },
    reset: function () {
      localStorage.removeItem(STORAGE_KEY);
      return defaultData;
    }
  };
})();

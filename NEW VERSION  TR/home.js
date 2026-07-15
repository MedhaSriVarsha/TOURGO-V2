/* =========================================================
   TourGo — Rajamahendravaram
   Data + interactions
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     Data — real places in Rajamahendravaram (Rajahmundry)
     --------------------------------------------------------- */
  const GLYPHS = { temple: "🛕", hotel: "🏨", restaurant: "🍽️" };

  const temples = [
    {
      id: "iskcon",
      img: "iskcon.jpeg",
      name: "ISKCON Dasavatara Temple",
      sub: "Gowthami Ghat Road, near Godavari Bund",
      type: "temple",
      rating: 4.6,
      reviews: "8,280",
      time: "12 min",
      dist: "3.1 km",
      info: [["Best Time","5:30 AM & Sunset"],["Deity","Radha Gopinath"],["Entry","Free"],["Duration","45–60 min"]],
      about: "A calm riverside temple dedicated to Lord Krishna on the Godavari's Gowthami Ghat. Visitors describe elegant architecture, well-kept grounds and an especially peaceful atmosphere during the morning and evening aarti, making it a favourite spot for quiet reflection."
    },
    {
      id: "markandeya",
      img: "markandeya.jpeg",
      name: "Sri Uma Markandeyeswara Temple",
      sub: "Godavari Bund Road, Pushkar Ghat",
      type: "temple",
      rating: 4.7,
      reviews: "2,427",
      time: "18 min",
      dist: "4.2 km",
      info: [["Best Time","6 AM – 9 PM"],["Deity","Shiva & Uma"],["Founded","600+ yrs ago"],["Duration","30–45 min"]],
      about: "One of the city's oldest shrines, set right on the Godavari bund and linked to the sage Markandeya, who is said to have installed the Shiva linga here. The temple also houses shrines to Subrahmanya, the Navagrahas and Ayyappa, and is known for its calming riverside setting."
    },
    {
      id: "mahakaleswar",
      img: "mahakaleswar.jpeg",
      name: "Mahakaleswar Temple",
      sub: "Tyagaraja Nagar, near Railway Station",
      type: "temple",
      rating: 4.9,
      reviews: "1,319",
      time: "9 min",
      dist: "2.4 km",
      info: [["Best Time","4 AM – 12:30 PM"],["Deity","Shiva Jyotirlinga"],["Style","Konkan-influenced"],["Duration","30–40 min"]],
      about: "A newer shrine built as a mirror of Ujjain's Mahakaleshwar temple, an easy walk from the railway station. Visitors highlight the spotless upkeep, the marble idols lining the outer prakara, and a genuinely tranquil space for meditation on the Godavari's banks."
    },
    {
      id: "kotilingeswara",
      img: "kotilingeswara.jpeg",
      name: "Sri Umakotilingeswara Swamy Temple",
      sub: "Kotilingala Veedhi, Seethampet",
      type: "temple",
      rating: 4.6,
      reviews: "1,070",
      time: "16 min",
      dist: "3.8 km",
      info: [["Best Time","5 AM – 12 PM"],["Significance","Shakti Peetha"],["Built","10th century"],["Duration","40–50 min"]],
      about: "An ancient Shakti Peetha built by the Chalukyas and later renovated during the Vijayanagara era, sitting on the Godavari at Kotilingala Ghat. Tradition holds that Lord Rama himself installed the Shiva linga here on his way south, and the complex includes a Sitarama shrine."
    }
  ];

  const hotels = [
    {
      id: "shelton",
      img: "shelton.jpeg",
      name: "Hotel Shelton Rajamahendri",
      sub: "Morampudi Road, Tadithota",
      type: "hotel",
      rating: 4.3,
      reviews: "12,306",
      time: "14 min",
      dist: "3.6 km",
      price: "₹4,200",
      info: [["Check-in","12:00 PM"],["Amenities","Pool, Spa, Gym"],["Price / night","₹4,200"],["Rating","4.3 ★"]],
      about: "A full-service city hotel known for its Citrus restaurant and attentive staff. Guests regularly mention polished service, a good breakfast spread and a comfortable, well-maintained stay, making it a dependable pick for both business and family trips."
    },
    {
      id: "manjeera",
      img: "manjeera.jpeg",
      name: "Manjeera Sarovar Premiere",
      sub: "Suviseshapuram, Arts College Road",
      type: "hotel",
      rating: 4.4,
      reviews: "2,483",
      time: "20 min",
      dist: "5.4 km",
      price: "₹5,600",
      info: [["Check-in","1:00 PM"],["Amenities","Pool, Banquet"],["Price / night","₹5,600"],["Rating","4.4 ★"]],
      about: "Considered one of the city's better stays, with an elegant lobby, a well-lit boardroom for events, and a breakfast buffet guests call generous and delicious. The pool and courteous housekeeping come up often in reviews, along with a genuinely warm check-in experience."
    },
    {
      id: "lahospin",
      img: "lahospin.jpeg",
      name: "La Hospin Hotel",
      sub: "Pushkarghat Road, opp. 3 Town",
      type: "hotel",
      rating: 4.0,
      reviews: "4,877",
      time: "17 min",
      dist: "4.0 km",
      price: "₹3,100",
      info: [["Check-in","12:00 PM"],["Amenities","River-view rooms"],["Price / night","₹3,100"],["Rating","4.0 ★"]],
      about: "River-facing rooms with views of the Godavari and its bridges are the highlight here, along with a sixth-floor café that guests recommend for sunset coffee. Front-desk staff are frequently praised for going out of their way to make stays comfortable."
    },
    {
      id: "riverbay",
      img: "riverbay.jpeg",
      name: "River Bay Resort",
      sub: "Gowthami Ghat Road, near ISKCON",
      type: "hotel",
      rating: 3.9,
      reviews: "5,543",
      time: "12 min",
      dist: "3.0 km",
      price: "₹2,800",
      info: [["Check-in","12:00 PM"],["Amenities","Private river access"],["Price / night","₹2,800"],["Rating","3.9 ★"]],
      about: "A resort-style property with direct Godavari access and river-view balconies, popular for its location right on the water. Best suited for travellers who prioritise the riverside setting over polished finishes."
    }
  ];

  const restaurants = [
    {
      id: "foodpyramid",
      img: "foodpyramid.jpeg",
      name: "Food Pyramid NH 16",
      sub: "Multi-cuisine · Highway food court",
      type: "restaurant",
      rating: 4.7,
      reviews: "12,799",
      price: "₹₹",
      about: "A spacious, well-lit food court on the Rajahmundry highway with ample parking and a big menu spanning breakfast through dinner — a favourite stop for families and travellers passing through."
    },
    {
      id: "rio",
      img: "rio.jpeg",
      name: "Rio Unlimited Multicuisine",
      sub: "Multi-cuisine · Danavai Peta",
      type: "restaurant",
      rating: 4.5,
      reviews: "2,368",
      price: "₹₹",
      about: "A relaxed multi-cuisine spot known for its biryani and starters, with a pleasant ambience and staff regularly described as attentive."
    },
    {
      id: "kalinga",
      img: "kalinga.jpeg",
      name: "Kalinga Kitchen and Bar",
      sub: "Multi-cuisine · Tyagaraja Nagar",
      type: "restaurant",
      rating: 4.6,
      reviews: "1,838",
      price: "₹₹₹",
      about: "A well-regarded restaurant and bar with a broad menu spanning South Indian, Chinese and continental dishes, praised for quick, polished service."
    },
    {
      id: "ironhill",
      img: "ironhill.jpeg",
      name: "Ironhill Rajahmundry",
      sub: "Brewpub · Venkateswara Nagar",
      type: "restaurant",
      rating: 4.5,
      reviews: "3,691",
      price: "₹₹₹",
      about: "A lively brewpub with a good drinks menu and spicy food options, a popular choice for casual get-togethers and evening hangouts."
    },
    {
      id: "shichime",
      img: "shichime.jpeg",
      name: "Shichime Café & Patisserie",
      sub: "Café & desserts · Danavai Peta",
      type: "restaurant",
      rating: 4.6,
      reviews: "580",
      price: "₹₹",
      about: "An all-vegetarian café spanning Asian, Italian and Mexican small plates alongside standout desserts — guests often call it a hidden gem for the city."
    }
  ];

  const allPlaces = [...temples, ...hotels, ...restaurants];

  const bookings = {
    upcoming: [
      { id: "manjeera", name: "Manjeera Sarovar Premiere", sub: "2 Nights • 3 Days", dates: "Aug 14 – Aug 16, 2026", price: "₹11,200", status: "confirmed", type: "hotel" },
      { name: "Godavari Sunrise Temple Trail", sub: "1 Day • Guided, 4 Temples", dates: "Aug 22, 2026", price: "₹1,899", status: "confirmed", type: "temple" },
      { id: "kalinga", name: "Kalinga Kitchen and Bar", sub: "Table for 4 • Dinner", dates: "Aug 30, 2026", price: "₹2,400", status: "pending", type: "restaurant" },
      { id: "lahospin", name: "La Hospin Hotel", sub: "1 Night • River-view Room", dates: "Sep 05 – Sep 06, 2026", price: "₹3,100", status: "confirmed", type: "hotel" }
    ],
    completed: [
      { id: "shelton", name: "Hotel Shelton Rajamahendri", sub: "3 Nights • 4 Days", dates: "May 02 – May 05, 2026", price: "₹16,800", status: "confirmed", type: "hotel" },
      { name: "Temple Trail — Full Day Tour", sub: "1 Day • Guided", dates: "Mar 18, 2026", price: "₹1,499", status: "confirmed", type: "temple" },
      { id: "iskcon", name: "ISKCON Dasavatara Temple", sub: "Sunrise Aarti Visit", dates: "Feb 24, 2026", price: "₹0", status: "confirmed", type: "temple" },
      { id: "ironhill", name: "Ironhill Rajahmundry", sub: "Table for 2 • Evening", dates: "Feb 08, 2026", price: "₹1,850", status: "confirmed", type: "restaurant" },
      { id: "manjeera", name: "Manjeera Sarovar Premiere", sub: "1 Night • 2 Days", dates: "Dec 20 – Dec 21, 2025", price: "₹5,600", status: "confirmed", type: "hotel" }
    ],
    cancelled: [
      { id: "riverbay", name: "River Bay Resort", sub: "2 Nights • 3 Days", dates: "Jan 09 – Jan 11, 2026", price: "₹8,400", status: "cancelled", type: "hotel" },
      { name: "Godavari Heritage & Ghat Cruise", sub: "1 Day • Guided Boat Tour", dates: "Nov 12, 2025", price: "₹2,200", status: "cancelled", type: "temple" },
      { id: "rio", name: "Rio Unlimited Multicuisine", sub: "Table for 6 • Dinner", dates: "Oct 03, 2025", price: "₹3,000", status: "cancelled", type: "restaurant" }
    ]
  };

  /* ---------------------------------------------------------
     Renderers
     --------------------------------------------------------- */
  function starChip(rating) {
    return `<span class="rating-chip">⭐ ${rating}</span>`;
  }

  function renderPlaceCards(list, container) {
    container.innerHTML = list.map(p => `
      <button class="place-card" data-id="${p.id}">
        <div class="glyph tone-${p.type}">
          <img class="card-img" src="${p.img}" alt="${p.name}" loading="lazy">
          ${starChip(p.rating)}
          <span class="type-badge">${GLYPHS[p.type]}</span>
        </div>
        <div class="body">
          <h3>${p.name}</h3>
          <p>${p.sub}</p>
        </div>
      </button>
    `).join("");
  }

  function renderRestaurantList(list, container) {
    container.innerHTML = list.map(r => `
      <button class="list-card" data-id="${r.id}">
        <div class="glyph-sm tone-${r.type}">
          <img class="card-img" src="${r.img}" alt="${r.name}" loading="lazy">
        </div>
        <div class="info">
          <h3>${r.name}</h3>
          <p>${r.sub}</p>
        </div>
        <div class="meta">
          <div class="rating-inline">
            <svg viewBox="0 0 24 24" width="11" height="11"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 16.9 6.2 20l1.1-6.5L2.5 8.9l6.6-.9L12 2z"/></svg>
            ${r.rating}
          </div>
          <p class="price">${r.price} avg</p>
        </div>
      </button>
    `).join("");
  }

  function renderBookings(tab) {
    const list = bookings[tab] || [];
    const container = document.getElementById("bookingList");
    if (!list.length) {
      container.innerHTML = `<p class="muted" style="text-align:center;padding:30px 0;color:rgba(255,255,255,0.7);">No ${tab} bookings yet.</p>`;
      return;
    }
    container.innerHTML = list.map(b => {
      const place = b.id ? allPlaces.find(p => p.id === b.id) : null;
      const thumb = place
        ? `<img class="card-img" src="${place.img}" alt="${b.name}">`
        : `${GLYPHS[b.type]}`;
      return `
      <div class="booking-card">
        <div class="booking-top">
          <div class="glyph-sm tone-${b.type}">${thumb}</div>
          <div class="info">
            <h3>${b.name}</h3>
            <p>${b.sub}</p>
          </div>
          <div class="booking-price">${b.price}</div>
        </div>
        <div class="booking-foot">
          <span class="muted" style="color:var(--ink-soft);font-size:11.5px;">${b.dates}</span>
          <span class="status-badge ${b.status}">${b.status[0].toUpperCase() + b.status.slice(1)}</span>
        </div>
      </div>
    `;
    }).join("");
  }

  /* ---------------------------------------------------------
     Navigation between views
     --------------------------------------------------------- */
  const views = document.querySelectorAll(".view");
  const navBtns = document.querySelectorAll(".nav-btn");

  function showView(name) {
    views.forEach(v => v.classList.toggle("is-active", v.dataset.view === name));
    navBtns.forEach(b => b.classList.toggle("is-active", b.dataset.nav === name));
    document.querySelector(".app").scrollTo?.(0, 0);
    window.scrollTo(0, 0);
  }

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.nav));
  });

  document.querySelectorAll("[data-back]").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.back));
  });

  document.getElementById("btnDrawer").addEventListener("click", () => showView("profile"));

  /* ---------------------------------------------------------
     Category filter chips (Home)
     --------------------------------------------------------- */
  document.getElementById("categoryChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll("#categoryChips .chip").forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
  });

  /* Generic single-select chip groups (planner) */
  function bindChipGroup(id) {
    const group = document.getElementById(id);
    if (!group) return;
    group.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      group.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
    });
  }
  bindChipGroup("interestChips");
  bindChipGroup("durationChips");

  /* ---------------------------------------------------------
     Bookings tabs
     --------------------------------------------------------- */
  document.getElementById("bookingTabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    document.querySelectorAll("#bookingTabs .tab").forEach(t => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    renderBookings(tab.dataset.tab);
  });

  /* ---------------------------------------------------------
     Destination detail
     --------------------------------------------------------- */
  function openDetail(id) {
    const p = allPlaces.find(x => x.id === id);
    if (!p) return;

    document.getElementById("heroGlyph").className = "hero-glyph glyph tone-" + p.type;
    document.getElementById("heroGlyph").innerHTML =
      `<img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
    document.getElementById("detailTag").textContent = p.type[0].toUpperCase() + p.type.slice(1);
    document.getElementById("detailName").textContent = p.name;
    document.getElementById("detailRating").textContent = p.rating;
    document.getElementById("detailReviews").textContent = `(${p.reviews} reviews)`;
    document.getElementById("detailAbout").textContent = p.about;

    const grid = document.getElementById("detailInfoGrid");
    const info = p.info || [["Price", p.price || "—"], ["Type", p.type], ["Rating", p.rating + " ★"], ["Reviews", p.reviews]];
    grid.innerHTML = info.map(([k, v]) => `
      <div class="info-item"><p class="k">${k}</p><p class="v">${v}</p></div>
    `).join("");

    if (p.time && p.dist) {
      document.getElementById("detailRouteVal").textContent = `${p.time} · ${p.dist}`;
      document.querySelector(".route-mini").style.display = "flex";
    } else {
      document.querySelector(".route-mini").style.display = "none";
    }

    document.getElementById("btnDetailNav").onclick = () => {
      setNavDestination(p);
      showView("nav");
    };
    document.getElementById("btnDetailBook").textContent =
      p.type === "restaurant" ? "Get Directions" : "Reserve Now";
    document.getElementById("btnDetailBook").onclick = () => {
      if (p.type === "restaurant") {
        openRealDirections(p, document.getElementById("btnDetailBook"));
      }
    };

    showView("detail");
  }

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".place-card, .list-card");
    if (card && card.dataset.id) openDetail(card.dataset.id);
  });

  /* ---------------------------------------------------------
     Live navigation target
     --------------------------------------------------------- */
  const CURRENT_LOCATION = "Rajamahendravaram, Andhra Pradesh";
  let currentNavPlace = null;

  const btnStartNav = document.getElementById("btnStartNav");
  const routeTimeEl = document.getElementById("routeTime");
  const routeDistEl = document.getElementById("routeDist");
  const navMetaTimeEl = document.getElementById("navMetaTime");
  const navMetaDistEl = document.getElementById("navMetaDist");

  /* ---------------------------------------------------------
     Real directions — reads the phone's actual GPS position and
     hands off to Apple Maps (iOS) or Google Maps (everywhere else)
     with turn-by-turn directions from there to the destination.
     --------------------------------------------------------- */
  function buildDirectionsUrl(p, coords) {
    const destQuery = encodeURIComponent(`${p.name}, ${p.sub}, Rajamahendravaram, Andhra Pradesh`);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
      const saddr = coords ? `&saddr=${coords.lat},${coords.lng}` : "";
      return `https://maps.apple.com/?daddr=${destQuery}${saddr}&dirflg=d`;
    }
    const origin = coords ? `&origin=${coords.lat},${coords.lng}` : "";
    return `https://www.google.com/maps/dir/?api=1${origin}&destination=${destQuery}&travelmode=driving`;
  }

  function openRealDirections(p, triggerBtn) {
    if (!p) return;
    const btn = triggerBtn || null;
    const originalLabel = btn ? btn.textContent : null;
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Locating…";
    }

    function launch(coords) {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalLabel;
      }
      window.open(buildDirectionsUrl(p, coords), "_blank");
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => launch({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => launch(null), // permission denied / unavailable — Maps will ask or use its own last-known location
        { timeout: 8000 }
      );
    } else {
      launch(null);
    }
  }

  btnStartNav.addEventListener("click", () => openRealDirections(currentNavPlace, btnStartNav));

  function setNavDestination(p) {
    currentNavPlace = p;
    document.getElementById("navFromLabel").textContent = CURRENT_LOCATION;
    document.getElementById("navDestName").textContent = p.name;
    document.getElementById("navDestSub").textContent = p.sub;
    document.getElementById("navMetaGlyph").textContent = GLYPHS[p.type] || "📍";
    routeTimeEl.textContent = p.time || "—";
    routeDistEl.textContent = p.dist || "—";
    navMetaTimeEl.textContent = p.time || "—";
    navMetaDistEl.textContent = p.dist || "—";
  }

  document.getElementById("btnCreateTrip").addEventListener("click", () => {
    setNavDestination(temples[1]);
    showView("nav");
  });

  /* ---------------------------------------------------------
     Explore view
     --------------------------------------------------------- */
  function renderExplore() {
    renderPlaceCards(allPlaces, document.getElementById("exploreGrid"));
  }

  document.getElementById("exploreChips")?.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll("#exploreChips .chip").forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    const f = chip.dataset.filter;
    const list = f === "all" ? allPlaces : allPlaces.filter(p => p.type === f);
    renderPlaceCards(list, document.getElementById("exploreGrid"));
  });

  /* ---------------------------------------------------------
     Log out — sends the person back to the onboarding / sign-in flow
     --------------------------------------------------------- */
  const ONBOARDING_URL = "index.html";
  const btnLogOut = document.getElementById("btnLogOut");
  if (btnLogOut) {
    btnLogOut.addEventListener("click", () => {
      window.location.href = ONBOARDING_URL;
    });
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  renderPlaceCards(temples, document.getElementById("templeScroll"));
  renderPlaceCards(hotels, document.getElementById("hotelScroll"));
  renderRestaurantList(restaurants, document.getElementById("restaurantList"));
  renderPlaceCards([temples[1], hotels[0], temples[2]], document.getElementById("aiPickScroll"));
  renderBookings("upcoming");
  renderExplore();
  setNavDestination(temples[1]);

})();
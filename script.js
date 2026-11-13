// Strict mode helps JavaScript catch certain mistakes.
"use strict";
// /** Shared page elements lookup reusable shortcut; reuse instead of repeating getElementById calls. */
// /** Shared USD formatting reusable shortcut for prices displayed throughout the page. */
const money = value =>
  "$" + Number(value).toFixed(2);
// /** Creates a new HTML page item so JavaScript can add content to the page.
// /** Creates a page elements page item with optional class and text content. */
// Makes a new HTML element and optionally gives it a class and text.
function element(tag, className = "", text = "") {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}
// /* ============================================
// 1. ALL 13 MANHATTAN STORE LOCATIONS
// ============================================ */

const stores = [
  {
    name: "Village Revival Records",
    address: "197 Bleecker St, New York, NY",
    neighborhood: "Greenwich Village",
    coordinates: [40.72962942870095, -74.00146147482866],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Generation Records",
    address: "210 Thompson St, New York, NY",
    neighborhood: "Greenwich Village",
    coordinates: [40.72903986087924, -73.99914150551176],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Stranded Records",
    address: "218 E 5th St, New York, NY",
    neighborhood: "East Village",
    coordinates: [40.72732972088685, -73.99036100795793],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "A-1 Record Shop",
    address: "439 E 6th St, New York, NY",
    neighborhood: "East Village",
    coordinates: [40.725860293647564, -73.9844525943435],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Limited to One Records",
    address: "221 E 10th St, New York, NY",
    neighborhood: "East Village",
    coordinates: [40.72955592755726, -73.98551773735012],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Academy Records & CDs",
    address: "12 W 18th St, New York, NY",
    neighborhood: "Flatiron",
    coordinates: [40.738988100111094, -73.99297221715723],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Barnes & Noble — Union Square",
    address: "33 E 17th St, New York, NY",
    neighborhood: "Union Square",
    coordinates: [40.73717110566222, -73.98975309016971],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Barnes & Noble — Fifth Avenue",
    address: "555 Fifth Ave, New York, NY",
    neighborhood: "Midtown",
    coordinates: [40.755904040053466, -73.97898187667485],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Urban Outfitters — Fifth Avenue",
    address: "521 Fifth Ave, New York, NY",
    neighborhood: "Midtown",
    coordinates: [40.75429391690126, -73.97989333249825],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Rough Trade Below",
    address: "30 Rockefeller Plaza, New York, NY",
    neighborhood: "Rockefeller Center",
    coordinates: [40.759321799334046, -73.9795868829805],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Rough Trade Above",
    address: "1250 Sixth Ave, New York, NY",
    neighborhood: "Rockefeller Center",
    coordinates: [40.759914938236285, -73.98052847667482],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Westsider Records",
    address: "233 W 72nd St, New York, NY",
    neighborhood: "Upper West Side",
    coordinates: [40.779412095306384, -73.98272155705537],
    albums: [],
    reputationCopies: 0
  },
  {
    name: "Barnes & Noble — Upper West Side",
    address: "2289 Broadway, New York, NY 10024",
    neighborhood: "Upper West Side",
    coordinates: [40.786572256890594, -73.97870664232926],
    albums: [],
    reputationCopies: 0
  }
];
// /* ============================================
// 2. spreadsheet-style data file NAME NORMALIZATION
// ============================================ */
// /** Normalizes text so names can be compared consistently.
// Makes store names lowercase and removes extra punctuation so names match.
function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

const storeAliases = {
  "village revival records": 0,
  "generation records": 1,
  "stranded records": 2,
  "a 1 record shop": 3,
  "limited to one records": 4,
  "academy records cds": 5,

  "barnes and noble union square": 6,

  "barnes and noble fifth avenue": 7,
  "barnes and noble rockefeller": 7,

  "urban outfitters fifth avenue": 8,

  "rough trade below": 9,
  "rough trade above": 10,

  "westsider records": 11,

  "barnes and noble upper west side": 12
};
// /** Matches an inventory store name to its store record.
// Finds which store in our store list matches a name.
function getStoreIndex(name) {
  const key = normalize(name);

  return Object.prototype.hasOwnProperty.call(
    storeAliases,
    key
  )
    ? storeAliases[key]
    : -1;
}
// /* ============================================
// 3. ALBUM NAME NORMALIZATION
// ============================================ */

const albumOrder = [
  "Taylor Swift (Debut)",
  "Fearless",
  "Fearless (TV)",
  "Speak Now",
  "Speak Now (TV)",
  "Red",
  "Red (TV)",
  "1989",
  "1989 (TV)",
  "Reputation",
  "Lover",
  "Folklore",
  "Evermore",
  "Midnights",
  "TTPD",
  "Life of a Showgirl"
];

const albumAliases = {
  "taylor swift": "Taylor Swift (Debut)",
  "taylor swift debut": "Taylor Swift (Debut)",

  "fearless": "Fearless",
  "fearless tv": "Fearless (TV)",
  "fearless taylors version": "Fearless (TV)",

  "speak now": "Speak Now",
  "speak now tv": "Speak Now (TV)",
  "speak now taylors version": "Speak Now (TV)",

  "red": "Red",
  "red tv": "Red (TV)",
  "red taylors version": "Red (TV)",

  "1989": "1989",
  "1989 tv": "1989 (TV)",
  "1989 taylors version": "1989 (TV)",

  "reputation": "Reputation",
  "lover": "Lover",
  "folklore": "Folklore",
  "evermore": "Evermore",
  "midnights": "Midnights",

  "ttpd": "TTPD",
  "the tortured poets department": "TTPD",

  "life of a showgirl": "Life of a Showgirl",
  "the life of a showgirl": "Life of a Showgirl"
};
// /** Standardizes album titles for matching across datasets.
// Cleans up album names so slightly different spellings still match.
function normalizeAlbum(name) {
  const key = normalize(name);

  return albumAliases[key] ||
    String(name ?? "").trim();
}
// /* ============================================
// 4. spreadsheet-style data file PARSING
// Handles:
// - Extra spaces in headers
// - Dollar signs
// - Quoted spreadsheet-style data file values
// - Windows and Mac line endings
// ============================================ */
// /** Parses spreadsheet-style data file text into structured row objects.
// Reads CSV text one character at a time and turns it into rows and columns.
function parseCSV(text) {
  text = text.replace(/^\uFEFF/, "");

  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      if (quoted && text[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        quoted = !quoted;
      }

    } else if (char === "," && !quoted) {
      row.push(field.trim());
      field = "";

    } else if (
      (char === "\n" || char === "\r") &&
      !quoted
    ) {
      if (
        char === "\r" &&
        text[i + 1] === "\n"
      ) {
        i++;
      }

      row.push(field.trim());

      if (row.some(value => value !== "")) {
        rows.push(row);
      }

      row = [];
      field = "";

    } else {
      field += char;
    }
  }

  row.push(field.trim());

  if (row.some(value => value !== "")) {
    rows.push(row);
  }

  if (!rows.length) {
    return [];
  }

  const headers = rows.shift().map(normalize);

  return rows.map(cells => {
    const result = {};

    headers.forEach((header, index) => {
      result[header] = cells[index] ?? "";
    });

    return result;
  });
}
// /** Fetches and parses a spreadsheet-style data file data file.
// Loads data needed by the page. set of instructions: loadCSV.
// Loads a CSV file from the project folder and reads its contents.
async function loadCSV(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(
      `Failed to load ${path}: HTTP ${response.status}`
    );
  }

  const text = await response.text();

  return parseCSV(text);
}
// /** Reads a field using alternative possible column names.
// Finds a spreadsheet value even when the column has a different heading.
function getField(row, candidates) {
  for (const candidate of candidates) {
    const key = normalize(candidate);

    if (
      Object.prototype.hasOwnProperty.call(
        row,
        key
      )
    ) {
      return row[key];
    }
  }

  return "";
}
// /** Converts a source price value to a numeric amount.
// Turns a price such as "$19.99" into a number.
function parsePrice(value) {
  const cleaned = String(value ?? "")
    .replace(/[$,]/g, "")
    .trim();

  if (!cleaned) {
    return NaN;
  }

  return Number(cleaned);
}
// /* ============================================
// 5. SHARED DATA
// ============================================ */

let albumData = new Map();
let foundAlbums = [];
let missingAlbums = [];
let priceAlbums = [];

let retailReferences = new Map();

let unmatchedRows = [];
let invalidRows = [];

let selectedAlbum = null;
let selectedStoreIndex = null;

let wallMode = "found";
// /* ============================================
// 6. LOAD INVENTORY
// ============================================ */
// /** Builds store and album inventory totals from spreadsheet-style data file rows.
// Counts albums and copies using the inventory spreadsheet.
function processInventory(rows) {
  stores.forEach(store => {
    store.albums = [];
    store.reputationCopies = 0;
  });

  unmatchedRows = [];
  invalidRows = [];

  rows.forEach((row, index) => {
    const storeName = getField(row, [
      "Name of Record Store",
      "Record Store",
      "Store"
    ]);

    const albumName = normalizeAlbum(
      getField(row, [
        "Album",
        "Album Title",
        "Title"
      ])
    );

    const quantity = Number(
      getField(row, [
        "Quantity",
        "Copies"
      ])
    );

    const price = parsePrice(
      getField(row, [
        "Price",
        "Shelf Price"
      ])
    );

    const storeIndex = getStoreIndex(storeName);

    if (
      !storeName ||
      !albumName ||
      !Number.isInteger(quantity) ||
      quantity <= 0 ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      invalidRows.push({
        row: index + 2,
        data: row
      });
      return;
    }

    if (storeIndex === -1) {
      unmatchedRows.push({
        row: index + 2,
        store: storeName
      });
      return;
    }

    stores[storeIndex].albums.push({
      title: albumName,
      quantity,
      price
    });

    if (albumName === "Reputation") {
      stores[storeIndex].reputationCopies += quantity;
    }
  });

  albumData = new Map();

  albumOrder.forEach(title => {
    albumData.set(title, {
      title,
      copies: 0,
      storeIndices: new Set(),
      listings: []
    });
  });

  stores.forEach((store, storeIndex) => {
    store.albums.forEach(album => {
      if (!albumData.has(album.title)) {
        albumData.set(album.title, {
          title: album.title,
          copies: 0,
          storeIndices: new Set(),
          listings: []
        });
      }

      const record = albumData.get(album.title);

      record.copies += album.quantity;
      record.storeIndices.add(storeIndex);

      record.listings.push({
        storeIndex,
        storeName: store.name,
        neighborhood: store.neighborhood,
        quantity: album.quantity,
        price: album.price
      });
    });
  });

  const allAlbums = [...albumData.values()];

  foundAlbums = allAlbums.filter(
    album => album.copies > 0
  );

  missingAlbums = allAlbums.filter(
    album => album.copies === 0
  );

  priceAlbums = foundAlbums.filter(
    album => album.listings.length > 0
  );

  const totalCopies = foundAlbums.reduce(
    (sum, album) => sum + album.copies,
    0
  );

  const storesWithVinyl = stores.filter(
    store => store.albums.length > 0
  ).length;

  const reputationCopies =
    albumData.get("Reputation")?.copies ?? 0;

  document.getElementById("stat-stores").textContent = stores.length;
  document.getElementById("stat-found").textContent = storesWithVinyl;
  document.getElementById("stat-copies").textContent = totalCopies;
  document.getElementById("stat-reputation").textContent =
    reputationCopies;

  if (
    unmatchedRows.length ||
    invalidRows.length
  ) {
    const note = element(
      "div",
      "data-note",
      `${unmatchedRows.length} unmatched store rows ` +
      `and ${invalidRows.length} invalid rows ` +
      "were excluded. Check the browser console."
    );

    document.getElementById("dashboard")
      .querySelector(".section-inner")
      .appendChild(note);

    console.warn(
      "Unmatched stores:",
      unmatchedRows
    );

    console.warn(
      "Invalid inventory rows:",
      invalidRows
    );
  }

  console.log("Inventory summary:", {
    stores: stores.length,
    storesWithVinyl,
    totalCopies,
    reputationCopies
  });
}
// /* ============================================
// 7. LOAD ORIGINAL PRICE spreadsheet-style data file
// Your file currently has:
// Album, Original Price
// Optional future columns:
// Edition, Source
// ============================================ */
// /** Processes historical/reference prices for comparisons.
// Reads the original retail prices from the price spreadsheet.
function processOriginalPrices(rows) {
  retailReferences = new Map();

  rows.forEach((row, index) => {
    const title = normalizeAlbum(
      getField(row, [
        "Album",
        "Album Title",
        "Title"
      ])
    );

    const price = parsePrice(
      getField(row, [
        "Original Price",
        "Original Retail Price",
        "Retail Price",
        "Price"
      ])
    );

    const edition = getField(row, [
      "Edition",
      "Vinyl Edition",
      "Pressing",
      "Description"
    ]).trim();

    const source = getField(row, [
      "Source",
      "Source URL",
      "URL",
      "Link"
    ]).trim();

    if (
      !title ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      console.warn(
        `Skipped original-price row ${index + 2}`
      );
      return;
    }

    if (retailReferences.has(title)) {
      console.warn(
        `Duplicate original-price entry: ${title}`
      );
      return;
    }

    retailReferences.set(title, {
      price,
      edition,
      source
    });
  });
}
// /* ============================================
// 8. clickable or changeable VINYL WALL
// ============================================ */
// /* VINYL WALL — ALL ALBUMS STAY VISIBLE
// Toggle buttons highlight found or missing albums, rather than filtering them.
// Cover images live beside index.html. Add the remaining PNGs as listed below. */
const albumCoverFiles = {
  "Taylor Swift (Debut)": "debut.png",
  "Fearless": "fearless.png",
  "Fearless (TV)": "fearless_tv.png",
  "Speak Now": "speak_now.png",
  "Speak Now (TV)": "speak_now_tv.png",
  "Red": "red.png",
  "Red (TV)": "red_tv.png",
  "1989": "1989.png",
  "1989 (TV)": "1989_TV.png",
  "Reputation": "reputation.png",
  "Lover": "lover.png",
  "Folklore": "folklore.png",
  "Evermore": "evermore.png",
  "Midnights": "midnights.png",
  "TTPD": "TTPD.png",
  "Life of a Showgirl": "the_life_of_a_showgirl.png"
};
// /* Each circular line represents one album, including separate Taylor's Versions. */
let vinylFocusedStore = "all";

// Creates a curved section of a ring, with a small gap between stores.
// Draws one curved piece of a record ring.
function vinylArc(cx, cy, radius, start, end) {
  const point = angle => [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  const a = point(start), b = point(end);
  return `M ${a[0]} ${a[1]} A ${radius} ${radius} 0 ${end-start > Math.PI ? 1 : 0} 1 ${b[0]} ${b[1]}`;
}

// Opens the selected album's details while keeping the existing Spotify player.
// Shows details for the album someone clicked.
function showVinylDetails(title, storeIndex = null) {
  const album = albumData.get(title);
  if (!album) return;
  const panel = document.getElementById("vinyl-details");
  if (!panel) return; // Investigation card was intentionally removed.
  panel.replaceChildren();
  panel.append(element("p", "eyebrow", "Album investigation"), element("h4", "", title));
  panel.append(element("p", "", `${album.copies} recorded copies across ${album.storeIndices.size} of ${stores.length} stores.`));
  const actions = element("div", "vinyl-detail-actions");
  const listen = element("button", "", "Open Spotify player");
  listen.type = "button";
  listen.addEventListener("click", () => playAlbumMusic(title));
  const mapButton = element("button", "secondary", "Explore on map");
  mapButton.type = "button";
  mapButton.addEventListener("click", () => {
    // Focus the map already shown next to the vinyl.
    const target = document.getElementById("vinyl-map-dock");
    if (target) target.scrollIntoView({behavior:"smooth",block:"nearest"});
  });
  actions.append(listen, mapButton);
  panel.append(actions);
  const selector = element("select", "vinyl-select");
  selector.setAttribute("aria-label", "Show one store or all stores");
  const all = element("option", "", "All 13 stores");
  all.value = "all";
  selector.append(all);
  stores.forEach((store, index) => {
    const option = element("option", "", store.name);
    option.value = String(index);
    selector.append(option);
  });
  selector.value = storeIndex === null ? "all" : String(storeIndex);
  selector.addEventListener("change", () => {
    vinylFocusedStore = selector.value;
    renderWall();
    showVinylDetails(title, selector.value === "all" ? null : Number(selector.value));
    if (selector.value !== "all") showStore(Number(selector.value));
  });
  panel.append(selector);
  stores.forEach((store, index) => {
    if (storeIndex !== null && index !== storeIndex) return;
    const matches = store.albums.filter(item => item.title === title);
    const copies = matches.reduce((sum, item) => sum + item.quantity, 0);
    const row = element("div", "vinyl-detail-row");
    const label = element("div");
    label.append(element("strong", "", store.name));
    label.append(element("small", "", copies ? `${copies} recorded ${copies === 1 ? "copy" : "copies"}` : "No copy recorded"));
    const prices = [...new Set(matches.map(item => money(item.price)))];
    row.append(label, element("strong", "", prices.length ? prices.join(", ") : "—"));
    panel.append(row);
  });
}

// Gives every album its own exact color, including separate Taylor’s Version colors.
const vinylAlbumColors = {
  "Taylor Swift (Debut)": "#34F3FF",
  "Fearless": "#f6ed95",
  "Fearless (TV)": "#bb8f67",
  "Speak Now": "#52316B",
  "Speak Now (TV)": "#923c81",
  "Red": "#440201",
  "Red (TV)": "#651D01",
  "1989": "#789ac0",
  "1989 (TV)": "#5b86ae",
  "Reputation": "#727272",
  "Lover": "#fdc0cc",
  "Folklore": "#abaaaa",
  "Evermore": "#7f3c10",
  "Midnights": "#526d85",
  "TTPD": "#a79e8f",
  "Life of a Showgirl": "#5eb298",
};

// Draws one record with an album ring for every album in the site's existing list.
// Draws the album wall and its clickable record rings.
function renderWall() {
  const container = document.getElementById("album-chart");
  container.replaceChildren();
  const showingFound = true; // The vinyl now has one consistent view.
  document.getElementById("wall-title").textContent = "The Vinyl Archive";
  document.getElementById("wall-description").textContent = "Each album has its own colored ring, divided into 13 stores. White sections show which albums were available at each store. Click on a ring to listen to the album. (you can also drag the Spotify box if it gets in the way)";
  const albums = [...albumData.values()];
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  const center = 390, outer = 350, spacing = 18.5;
  svg.setAttribute("viewBox", "0 0 780 780");
  svg.setAttribute("role", "group");
  svg.setAttribute("aria-label", "Sixteen album rings with thirteen store sections each");
  albums.forEach((album, albumIndex) => {
    const radius = outer - albumIndex * spacing;
    const albumSelected = selectedAlbum === album.title;
    // Draw a quiet halo BEHIND the entire selected album ring.
    if (albumSelected) {
      const halo = document.createElementNS(svgNS, "circle");
      halo.setAttribute("cx", center);
      halo.setAttribute("cy", center);
      halo.setAttribute("r", radius);
      halo.setAttribute("fill", "none");
      halo.setAttribute("stroke", "#fff4d8");
      halo.setAttribute("stroke-width", "13");
      halo.setAttribute("stroke-opacity", ".45");
      halo.setAttribute("pointer-events", "none");
      svg.append(halo);
    }
    stores.forEach((store, storeIndex) => {
      const found = store.albums.some(item => item.title === album.title);
      const step = 2 * Math.PI / stores.length;
      const start = -Math.PI / 2 + storeIndex * step + .015;
      const end = -Math.PI / 2 + (storeIndex + 1) * step - .015;
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", vinylArc(center, center, radius, start, end));
      path.setAttribute("fill", "none");
      // White means a copy was recorded; otherwise show this album’s own color.
      path.setAttribute("stroke", found ? "#ffffff" : vinylAlbumColors[album.title] || "#727272");
      path.setAttribute("stroke-width", albumSelected ? "8" : "6.5");
      const inFocus = vinylFocusedStore === "all" || Number(vinylFocusedStore) === storeIndex;
      // Other rings stay colorful; selected ring is unmistakably brighter.
      path.setAttribute("opacity", !inFocus ? ".34" : albumSelected ? "1" : found ? ".94" : ".66");
      // A thin dark under-stroke makes white stock markers visible on light albums.
      if (found) {
        const contrast = document.createElementNS(svgNS, "path");
        contrast.setAttribute("d", path.getAttribute("d"));
        contrast.setAttribute("fill", "none");
        contrast.setAttribute("stroke", "#161616");
        contrast.setAttribute("stroke-width", albumSelected ? "11" : "9");
        contrast.setAttribute("opacity", !inFocus ? ".34" : "1");
        contrast.setAttribute("pointer-events", "none");
        svg.append(contrast);
      }
      path.classList.add("vinyl-ring-segment");
      if (selectedAlbum === album.title) path.classList.add("is-selected");
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", `${album.title}, ${store.name}: ${found ? "recorded in store" : "no copy recorded"}`);
      const title = document.createElementNS(svgNS, "title");
      title.textContent = `${album.title} — ${store.name}: ${found ? "found" : "no copy recorded"}`;
      path.append(title);
      const choose = () => {
        selectAlbum(album.title);
        vinylFocusedStore = String(storeIndex);
        renderWall();
        showVinylDetails(album.title, storeIndex);
        // Reuse the existing marker and store panel without navigating away.
        showStore(storeIndex);
        map.resize();
      };
      path.addEventListener("click", choose);
      path.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(); }
      });
      svg.append(path);
    });
  });
  // The vinyl's center label: a miniature physical record with grooves and a spindle hole.
  // Keep all these SVG shapes non-interactive so they never intercept ring clicks.
  const recordCircle = (radius, fill, stroke = "none", strokeWidth = 0) => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", center);
    circle.setAttribute("cy", center);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", fill);
    circle.setAttribute("stroke", stroke);
    circle.setAttribute("stroke-width", strokeWidth);
    circle.setAttribute("pointer-events", "none");
    svg.append(circle);
    return circle;
  };
  // Dark outer vinyl edge and fine pressed-in grooves.
  recordCircle(62, "#101011", "#38383a", 1.5);
  [58, 55, 52].forEach((radius, index) => {
    const groove = recordCircle(radius, "none", index === 1 ? "#5b5b5b" : "#343434", .8);
    groove.setAttribute("opacity", index === 1 ? ".65" : ".5");
  });
  // Muted cream paper label, like the center of a physical vinyl record.
  recordCircle(46, "#e8dfcd", "#8d8170", 1.5);
  recordCircle(41, "none", "#b2a695", .8);
  recordCircle(33, "none", "#b2a695", .65);
  const centerText = (label, y, size, weight = "normal", color = "#24201e", spacing = "0") => {
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", center);
    text.setAttribute("y", y);
    text.setAttribute("fill", color);
    text.setAttribute("font-size", size);
    text.setAttribute("font-weight", weight);
    text.setAttribute("letter-spacing", spacing);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("pointer-events", "none");
    text.textContent = label;
    svg.append(text);
  };
  centerText("33⅓ RPM", center - 25, "8", "bold", "#54473d", "1.2");
  centerText("TAYLOR SWIFT", center - 10, "9", "bold", "#24201e", ".8");
  centerText("VINYL ARCHIVE", center + 23, "7.5", "bold", "#54473d", "1");
  centerText("NYC · 13 STORES", center + 33, "6.2", "normal", "#54473d", ".5");
  // The spindle hole is drawn last so it stays visible above the paper label.
  recordCircle(6.5, "#171717", "#847969", 1.5);
  recordCircle(2.5, "#080808");
  container.append(svg);
  // The album list makes every ring easy to identify, including on small screens.
  const picker = element("select", "vinyl-select");
  picker.setAttribute("aria-label", "Choose an album ring");
  const prompt = element("option", "", "Choose an album ring…");
  prompt.value = "";
  picker.append(prompt);
  albums.forEach(album => {
    const option = element("option", "", album.title);
    option.value = album.title;
    picker.append(option);
  });
  picker.value = selectedAlbum || "";
  picker.addEventListener("change", () => {
    if (!picker.value) return;
    selectAlbum(picker.value);
    vinylFocusedStore = "all";
    renderWall();
    showVinylDetails(picker.value);
  });
  container.append(picker);
}
// /* ============================================
// 9. PRICE EXPLORER
// ============================================ */
// /** Populates the album dropdown from loaded inventory.

// Adds the album names to the price dropdown.
function populateAlbumSelect() {
  const select = document.getElementById("album-select");
  select.replaceChildren();

  priceAlbums.forEach(album => {
    const option = document.createElement("option");

    option.value = album.title;
    option.textContent = album.title;

    select.appendChild(option);
  });

  if (
    priceAlbums.some(
      album => album.title === "Fearless (TV)"
    )
  ) {
    select.value = "Fearless (TV)";
  }
}
// /** Updates price summary metrics and store results for the selected album.
// Updates the prices and stores shown for the chosen album.
function renderPriceExplorer() {
  const title = document.getElementById("album-select").value;
  const album = albumData.get(title);
  const container = document.getElementById("price-results");
  container.replaceChildren();
  const reference = retailReferences.get(title);
  const listings = album ? [...album.listings].sort((a,b) => a.price-b.price) : [];
  const lowest = listings.length ? listings[0].price : null;
  const highest = listings.length ? listings[listings.length-1].price : null;
  document.getElementById("retail-price").textContent = reference ? money(reference.price) : "Not recorded";
  document.getElementById("lowest-price").textContent = lowest === null ? "Not found" : money(lowest);
  document.getElementById("highest-price").textContent = highest === null ? "Not found" : money(highest);
  document.getElementById("price-difference").textContent = reference && lowest !== null
    ? (lowest < reference.price ? money(reference.price-lowest)+" below retail" :
       lowest > reference.price ? money(lowest-reference.price)+" above retail" : "Same price")
    : "—";
  listings.forEach(listing => {
    const button = element("button", "price-store");
    button.type = "button";
    const details = element("div");
    details.append(element("strong", "", listing.storeName),
      element("small", "", `${listing.neighborhood} · ${listing.quantity} copies`));
    button.append(details,element("span", "amount", money(listing.price)));
    button.addEventListener("click", () => {clearAlbumFilter();openStoreOnMap(listing.storeIndex);});
    container.appendChild(button);
  });
  renderPriceDumbbells();
}

// Uses the existing album palette; the CSV values are the only price sources.
// Draws the chart comparing prices across albums.
function renderPriceDumbbells() {
  const chart = document.getElementById("price-dumbbells");
  chart.replaceChildren();
  const albums = [...new Map([
    ...priceAlbums.map(album => [album.title, album]),
    ...[...retailReferences.keys()].filter(title => !priceAlbums.some(a => a.title === title))
      .map(title => [title, {title, listings: []}])
  ]).values()];
  const allPrices = albums.flatMap(album => {
    const ref = retailReferences.get(album.title);
    return [...(ref ? [ref.price] : []), ...album.listings.map(item => item.price)];
  });
  const maxPrice = Math.max(1, ...allPrices);
  const top = Math.ceil(maxPrice / 10) * 10;
  const yPercent = price => 92 - (price / top) * 83;

  const key = element("div", "vertical-price-key");
  key.innerHTML = '<span><i class="price-key-mark retail"></i> Retail reference</span><span><i class="price-key-mark low"></i> Lowest found</span><span><i class="price-key-mark high"></i> Highest found</span><span class="price-key-note">Different prices have separate circles; matching prices share one.</span>';
  chart.appendChild(key);
  const scroll = element("div", "vertical-price-scroll");
  const plot = element("div", "vertical-price-plot");
  plot.style.setProperty("--price-columns", albums.length);
  const axis = element("div", "vertical-price-axis");
  for (let tick = 0; tick <= 4; tick++) {
    const price = top * tick / 4;
    const line = element("div", "vertical-price-gridline");
    line.style.top = yPercent(price) + "%";
    line.appendChild(element("span", "vertical-price-tick", money(price)));
    axis.appendChild(line);
  }
  plot.appendChild(axis);

  albums.forEach(album => {
    const ref = retailReferences.get(album.title);
    const prices = album.listings.map(item => item.price);
    const cheapest = prices.length ? Math.min(...prices) : null;
    const highest = prices.length ? Math.max(...prices) : null;
    const column = element("button", "vertical-price-album");
    column.type = "button";
    column.style.setProperty("--album-color", vinylAlbumColors[album.title] || "#a7282d");
    const selected = document.getElementById("album-select").value === album.title;
    column.classList.toggle("is-selected", selected);
    column.setAttribute("aria-label", `${album.title}: retail ${ref ? money(ref.price) : "not recorded"}; lowest ${cheapest === null ? "not found" : money(cheapest)}; highest ${highest === null ? "not found" : money(highest)}`);

    const stem = element("span", "vertical-price-stem");
    const known = [ref ? ref.price : null, cheapest, highest].filter(v => v !== null);
    if (known.length > 1) {
      const range = element("span", "vertical-price-range");
      range.style.top = yPercent(Math.max(...known)) + "%";
      range.style.height = (yPercent(Math.min(...known)) - yPercent(Math.max(...known))) + "%";
      stem.appendChild(range);
    }
    // Combine equal prices into ONE marker, with every applicable role in its tooltip.
    const groups = new Map();
    [["Retail", ref ? ref.price : null], ["Low", cheapest], ["High", highest]].forEach(([label, value]) => {
      if (value === null) return;
      if (!groups.has(value)) groups.set(value, []);
      groups.get(value).push(label);
    });
    // Only identical dollar amounts share a marker. Different prices always
    // receive distinct circles on the same stem, even when values are close.
    const STEM_HEIGHT = 350;
    const MIN_GAP = 25; // pixels: slightly larger than the circle diameter
    const points = [...groups.entries()]
      .map(([price, roles]) => ({ price, roles, ideal: STEM_HEIGHT * yPercent(price) / 100 }))
      .sort((a, b) => a.ideal - b.ideal);
    const positions = points.map(p => p.ideal);
    // Spread close markers vertically, without shifting them off the line.
    for (let i = 1; i < positions.length; i++) {
      positions[i] = Math.max(positions[i], positions[i - 1] + MIN_GAP);
    }
    const overflow = Math.max(0, positions[positions.length - 1] - (STEM_HEIGHT - 10));
    if (overflow) for (let i = 0; i < positions.length; i++) positions[i] -= overflow;
    if (positions[0] < 10) {
      const shift = 10 - positions[0];
      for (let i = 0; i < positions.length; i++) positions[i] += shift;
    }
    points.forEach((entry, i) => {
      const point = element("span", "vertical-price-point");
      point.style.top = (positions[i] / STEM_HEIGHT * 100) + "%";
      point.style.left = "50%";
      point.title = `${album.title} — ${entry.roles.join(" / ")}: ${money(entry.price)}`;
      point.setAttribute("aria-label", point.title);
      point.classList.toggle("is-retail", entry.roles.includes("Retail"));
      point.classList.toggle("is-low", entry.roles.includes("Low"));
      point.classList.toggle("is-high", entry.roles.includes("High"));
      point.classList.toggle("is-combined", entry.roles.length > 1);
      // A shared price gets one marker, divided only among the roles it represents.
      // Use solid user-selected colors rather than dashed or patterned symbols.
      if (entry.roles.length > 1) {
        const roleColors = { Retail: "#d4af37", Low: "#0d3225", High: "#6c4040" };
        const step = 100 / entry.roles.length;
        const stops = entry.roles.map((role, roleIndex) => {
          const from = (roleIndex * step).toFixed(4);
          const to = ((roleIndex + 1) * step).toFixed(4);
          return `${roleColors[role]} ${from}% ${to}%`;
        });
        point.style.background = `conic-gradient(${stops.join(", ")})`;
      }
      stem.appendChild(point);
    });
    column.appendChild(stem);
    const cover = element("span", "vertical-price-cover");
    const coverFile = albumCoverFiles[album.title];
    if (coverFile) {
      const img = document.createElement("img");
      img.src = coverFile;
      img.alt = "";
      img.loading = "lazy";
      img.onerror = () => {img.remove(); cover.textContent = "♪";};
      cover.appendChild(img);
    } else cover.textContent = "♪";
    column.appendChild(cover);
    column.appendChild(element("span", "vertical-price-name", album.title));
    const detail = element("span", "vertical-price-detail");
    detail.appendChild(element("span", "", "LOW  " + (cheapest === null ? "—" : money(cheapest))));
    detail.appendChild(element("span", "", "HIGH  " + (highest === null ? "—" : money(highest))));
    detail.appendChild(element("span", "", "RETAIL  " + (ref ? money(ref.price) : "—")));
    column.appendChild(detail);
    if (priceAlbums.some(item => item.title === album.title)) {
      column.addEventListener("click", () => {document.getElementById("album-select").value = album.title; renderPriceExplorer();});
    } else column.disabled = true;
    plot.appendChild(column);
  });
  scroll.appendChild(plot);
  chart.appendChild(scroll);
}

document.getElementById("album-select").addEventListener("change", renderPriceExplorer);
// /* ============================================
// 10. MAPLIBRE + OPENFREEMAP DARK
// API-key-free map with clickable store pins.
// ============================================ */
const map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/dark",
  center: [-73.98, 40.73],
  zoom: 11.5,
  minZoom: 11,
  maxZoom: 18,
  scrollZoom: false
});

const markers = new Map();
stores.forEach((store, index) => {
  const pin = document.createElement("div");
  pin.className = "pin";
  pin.title = store.name;
  pin.setAttribute("role", "button");
  pin.setAttribute("tabindex", "0");
  pin.setAttribute("aria-label", `Show ${store.name} on the map`);
  pin.addEventListener("click", () => showStore(index));
  pin.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showStore(index);
    }
  });
  const marker = new maplibregl.Marker({ element: pin, anchor: "center" })
    .setLngLat([store.coordinates[1], store.coordinates[0]])
    .addTo(map);
  markers.set(index, marker);
});

const storeBounds = new maplibregl.LngLatBounds();
stores.forEach(store => storeBounds.extend([store.coordinates[1], store.coordinates[0]]));
map.on("load", () => {
  map.fitBounds(storeBounds, { padding: 45, maxZoom: 14, duration: 0 });
  map.resize();
});

// Changes the appearance of map pins when filters change.
function refreshMarkers() {
  markers.forEach((marker, index) => {
    let dimmed = false;
    if (selectedAlbum !== null) {
      const album = albumData.get(selectedAlbum);
      dimmed = album
        ? !album.storeIndices.has(index) && selectedStoreIndex !== index
        : false;
    }
    const active = selectedStoreIndex === index;
    const pin = marker.getElement();
    pin.classList.toggle("active", active);
    pin.classList.toggle("dimmed", dimmed);
    pin.style.zIndex = active ? "1000" : "1";
  });
}
// /** Refreshes the map status message.

// Updates the message about what the map is showing.
function updateMapStatus() {
  if (selectedAlbum === null) {
    document.getElementById("status").textContent =
      "Click any of the 13 store pins to explore.";
    return;
  }

  const album = albumData.get(selectedAlbum);
  const count = album?.storeIndices.size ?? 0;

  document.getElementById("status").textContent =
    `${selectedAlbum}: found at ${count} ` +
    `of ${stores.length} stores. ` +
    "Click a pin to view its store details.";
}
// /** Applies an album filter across linked views.

// Filters the website to the album someone selected.
function selectAlbum(title) {
  selectedAlbum = title;
  // Restore the original floating Spotify player for every album selection.
  playAlbumMusic(title);
  selectedStoreIndex = null;

  closePanelOnly();
  refreshMarkers();
  renderWall();
  updateMapStatus();

  const album = albumData.get(title);
  const count = album?.storeIndices.size ?? 0;

  const feedback = document.getElementById("chart-feedback");
  feedback.replaceChildren();

  if (count === 0) {
    feedback.textContent =
      "";
  } else {
    feedback.appendChild(
      document.createTextNode(
        `${title}: found at ${count} stores. `
      )
    );

    const button = element(
      "button",
      "text-link",
      "Explore on the map →"
    );

    button.type = "button";

    button.addEventListener("click", () => {
      scrollToPinnedChapter(1);
    });

    feedback.appendChild(button);
  }

  document.getElementById("clear-filter").hidden = false;
}
// /** Resets the active album filter.
// Filters the displayed results. set of instructions: clearAlbumFilter.
// Removes the selected album filter.
function clearAlbumFilter() {
  selectedAlbum = null;
  vinylFocusedStore = "all";

  document.getElementById("chart-feedback").textContent =
    "Click an album to explore.";

  document.getElementById("clear-filter").hidden = true;

  renderWall();
  refreshMarkers();
  updateMapStatus();
}

document.getElementById("clear-filter").addEventListener(
  "click",
  clearAlbumFilter
);
// /* ============================================
// 11. STORE INFORMATION PANEL
// ============================================ */

const panel = document.getElementById("panel");
// /** Renders a selected store’s details in the side panel.
// Opens the information panel for a record store.
function showStore(index) {
  if (index < 0 || index >= stores.length) {
    return;
  }

  selectedStoreIndex = index;

  const store = stores[index];

  document.getElementById("counter").textContent =
    `STORE ${String(index + 1).padStart(2, "0")}` +
    ` / ${stores.length}`;

  document.getElementById("store-name").textContent = store.name;

  document.getElementById("neighborhood").textContent =
    store.neighborhood;

  document.getElementById("address").textContent =
    store.address;

  document.getElementById("result").textContent =
    store.reputationCopies === 0
      ? "Reputation: Not found"
      : `Reputation: ${store.reputationCopies} copies`;

  const inventory = document.getElementById("inventory");
  inventory.replaceChildren();

  if (!store.albums.length) {
    inventory.appendChild(
      element(
        "p",
        "empty",
        "No Taylor Swift vinyl recorded at this store."
      )
    );
  } else {
    store.albums.forEach(album => {
      const row = element(
        "div",
        "inventory-row"
      );

      const details = document.createElement("div");

      const albumButton = element(
        "button",
        "clickable-album",
        album.title
      );

      albumButton.type = "button";

      albumButton.addEventListener("click", () => {
        playAlbumMusic(album.title);
      });

      details.append(
        albumButton,
        element(
          "div",
          "quantity",
          `${album.quantity} copies`
        )
      );

      row.append(
        details,
        element(
          "div",
          "price",
          money(album.price)
        )
      );

      inventory.appendChild(row);
    });
  }

  document.getElementById("previous").disabled = index === 0;

  document.getElementById("next").disabled =
    index === stores.length - 1;

  panel.classList.add("open");
  panel.setAttribute(
    "aria-hidden",
    "false"
  );

  refreshMarkers();
  updateMapStory();

  // The selected pin is centered in the fully visible map; no overlay offset.
  const marker = markers.get(index);
  if (marker) map.easeTo({center: marker.getLngLat(), duration: 500});
  const extra = document.getElementById("store-extra");
  const toggle = document.getElementById("toggle-store-details");
  if (extra && toggle) {
    extra.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "View full store inventory ↓";
  }
}
// /** Closes the store panel without resetting other state.
// Closes the related panel or item. set of instructions: closePanelOnly.
// Hides the store details panel.
function closePanelOnly() {
  panel.classList.remove("open");

  panel.setAttribute(
    "aria-hidden",
    "true"
  );
}
// /** Closes store details and updates selection state.
// Closes the related panel or item. set of instructions: closeStore.
// Closes store details and resets the selection.
function closeStore() {
  selectedStoreIndex = null;

  closePanelOnly();
  refreshMarkers();
}

document.getElementById("close").addEventListener(
  "click",
  closeStore
);

document.getElementById("previous").addEventListener(
  "click",
  () => {
    if (
      selectedStoreIndex !== null &&
      selectedStoreIndex > 0
    ) {
      showStore(selectedStoreIndex - 1);
    }
  }
);

document.getElementById("next").addEventListener(
  "click",
  () => {
    if (
      selectedStoreIndex !== null &&
      selectedStoreIndex < stores.length - 1
    ) {
      showStore(selectedStoreIndex + 1);
    }
  }
);
// /** Opens and focuses a store in the map interface.

// Moves the map to a selected store.
function openStoreOnMap(index) {
  scrollToPinnedChapter(1);

  map.resize();
  showStore(index);
}
// /* ============================================
// 12. SPOTIFY ALBUM PLAYER
// Paste official Spotify album IDs below
// to enable the other album players.
// ============================================ */

const spotifyAlbumIds = {
  "Taylor Swift (Debut)": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/7mzrIsaAjnXihW3InKjlC3?utm_source=generator&si=fc62660f01e44fd4\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Fearless": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/2dqn5yOQWdyGwOpOIi9O4x?utm_source=generator&si=e3b6d6dee5264700\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Fearless (TV)": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/4hDok0OAJd57SGIT8xuWJH?utm_source=generator&si=7c48344ba26144f5\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Speak Now": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/5MfAxS5zz8MlfROjGQVXhy?utm_source=generator&si=b7fba70dc4df48c9\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Speak Now (TV)": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/5AEDGbliTTfjOB8TSm1sxt?utm_source=generator&si=e8aa2512df3e4bfa\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Red": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/1KlU96Hw9nlvqpBPlSqcTV?utm_source=generator&si=b91ce14b5e3044b7\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Red (TV)": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/6kZ42qRrzov54LcAk4onW9?utm_source=generator&si=7cfd41f0f51e4607\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "1989": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/34OkZVpuzBa9y40DCy0LPR?utm_source=generator&si=04f29ba320284c93\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "1989 (TV)": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/1o59UpKw81iHR0HPiSkJR0?utm_source=generator&si=3cdaec47d6cb4b60\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Reputation": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/6DEjYFkNZh67HP7R9PSZvv?utm_source=generator&si=5883bd7315af476f\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Lover": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/1NAmidJlEaVgA3MpcPFYGq?utm_source=generator&si=b2bab405b444406e\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Folklore": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/1pzvBxYgT6OVwJLtHkrdQK?utm_source=generator&si=08742d07579e4fb4\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Evermore": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/6AORtDjduMM3bupSWzbTSG?utm_source=generator&si=9ca2a70c862346f1\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Midnights": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/1fnJ7k0bllNfL1kVdNVW1A?utm_source=generator&si=4d406f3e6f2c4814\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "TTPD": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/5H7ixXZfsNMGbIE5OBSpcb?utm_source=generator&si=c1658db6a0934c71\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>",
  "Life of a Showgirl": "<iframe data-testid=\"embed-iframe\" style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/album/4hF2gTGuPYlykYuphDxi8J?utm_source=generator&si=bbacc4a261894904\" width=\"100%\" height=\"352\" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe>"
};
// /** Extracts a Spotify album identifier from a supplied value.
// Gets the album ID from a Spotify link or value.
function extractSpotifyAlbumId(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  if (/^[A-Za-z0-9]{22}$/.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(
    /open\.spotify\.com\/(?:embed\/)?album\/([A-Za-z0-9]{22})/
  );

  return match ? match[1] : null;
}
// /** Loads the selected album’s Spotify embed in the floating player.
// Opens the Spotify player for the chosen album.
function playAlbumMusic(title) {
  const player = document.getElementById("album-music");
  const iframe = document.getElementById("album-spotify");

  const id = extractSpotifyAlbumId(
    spotifyAlbumIds[title]
  );

  document.getElementById("music-album-name").textContent = title;

  player.hidden = false;

  if (!id) {
    iframe.src = "about:blank";
    iframe.hidden = true;

    document.getElementById("music-note").textContent =
      "Spotify album ID not yet added in script.js.";

    return;
  }

  iframe.hidden = false;

  iframe.src =
    "https://open.spotify.com/embed/album/" +
    id;

  document.getElementById("music-note").textContent =
    "Press Play in the Spotify player.";
}
// /** Hides and clears the floating Spotify player.
// Closes the related panel or item. set of instructions: closeMusicPlayer.
// Closes the Spotify player.
function closeMusicPlayer() {
  document.getElementById("album-music").hidden = true;

  document.getElementById("album-spotify").src = "about:blank";
  document.getElementById("album-spotify").hidden = true;
}

document.getElementById("close-music").addEventListener(
  "click",
  closeMusicPlayer
);
document.addEventListener(
  "keydown",
  event => {
    if (event.key === "Escape") {
      closeStore();
      closeMusicPlayer();
    }
  }
);
// /* ============================================
// 13. ORIGINAL PRICE COMPARISON
// ============================================ */
// /** Builds a single comparison bar for the retail chart.
// Adds a bar to the price comparison chart.
function addComparisonBar(
  container,
  label,
  price,
  maximum,
  type
) {
  const row = element(
    "div",
    "comparison-row"
  );

  const track = element(
    "div",
    "comparison-track"
  );

  const fill = element(
    "div",
    "comparison-fill " + type
  );

  fill.style.width =
    `${(price / maximum) * 100}%`;

  track.appendChild(fill);

  row.append(
    element(
      "span",
      "comparison-label",
      label
    ),
    track,
    element(
      "span",
      "comparison-value",
      money(price)
    )
  );

  container.appendChild(row);
}
// /** Renders the observed-versus-reference price comparisons.
// /* ============================================
// 14. OPENING SCROLL SEQUENCE
// ============================================ */

const scrolly = document.querySelector(
  ".scrolly"
);

const steps = [
  ...document.querySelectorAll(
    ".scrolly .step"
  )
];
// /** Updates the introductory scroll-driven narrative.
// Updates the page based on scrolling. set of instructions: updateOpeningScroll.
// Changes the opening story as the visitor scrolls.
function updateOpeningScroll() {
  if (!scrolly || !steps.length) {
    return;
  }

  const rect = scrolly.getBoundingClientRect();

  const distance = Math.max(
    1,
    scrolly.offsetHeight - window.innerHeight
  );

  const progress = Math.max(
    0,
    Math.min(
      1,
      -rect.top / distance
    )
  );

  const index = Math.min(
    steps.length - 1,
    Math.floor(progress * steps.length)
  );

  steps.forEach((step, i) => {
    step.classList.toggle(
      "active",
      i === index
    );
  });
}
// /* ============================================
// 15. REPUTATION NEWSPAPER INVESTIGATION
// Self-contained: does not touch inventory, charts, or map.
// ============================================ */

const repEvidenceFiles = {
  masters: {
    title: "Who owns the masters?",

    body: `
      <p>Swift began rerecording her first six albums after Scooter Braun bought Big Machine Label Group in 2019 which included her catalog. In 2020, Braun sold the master rights to Shamrock Holdings for $405 million. In May 2025, she announced that she had purchased her masters from Shamrock Capital for around $360 million, including <em>Reputation</em>.</p>
      <p>Four of those albums received Taylor's Version releases. <em>Reputation (Taylor's Version)</em> had not been released at the time of this investigation. This history is important context, but it does <strong>not</strong> establish why the original record was absent from the 13 stores surveyed.</p>
      <figure><img src="masters-announcement.png" alt="Swift seated among the covers of her first six albums" loading="lazy"><figcaption>Swift's May 2025 masters announcement.</figcaption></figure>
      <p><a href="https://www.taylorswift.com/" target="_blank" rel="noopener noreferrer">Source: Taylor Swift's official website</a></p>`
  },
  personal: {
    title: "Too personal to revisit?",
  
    body: `
      <p>In a May 2025 letter, Swift said she had rerecorded less than a quarter of <em>Reputation</em>. She described the album as a reminder to a particular time in her life and said she had struggled to remake it.</p>
      <p>Some fans connect that difficulty to her former relationship with Joe Alwyn as 10 out of the 15 songs on Reputation are supposedly about Alwyn. <strong>That is a fan interpretation, not a reason Swift confirmed.</strong> She also did not say she would never release the remaining material.</p>
      <figure><img src="reputation-letter.png" alt="Taylor Swift's handwritten letter discussing the status of Reputation Taylor's Version" loading="lazy"><figcaption>Her own words are the strongest evidence; claims about Joe remain unverified.</figcaption></figure>
      <p><a href="https://www.taylorswift.com/" target="_blank" rel="noopener noreferrer">Source: Swift's May 2025 letter</a></p>`
  },
  factory: {
    title: "Reputation Pressing",

    body: `
      <p>The 2017 vinyl edition was a double LP picture disc. Both of the records have printed photographic artwork, and they aren’t the usual solid color vinyl records like her other vinyls.</p>
      <p>The format is visually distinctive compared with many standard album pressings. The standard reputation picture disc has had subsequent pressings, including a documented 2024 pressing. However, a repress does not mean continuous availability. A record can be manufactured again but still be difficult to find if Retailers receive limited quantities or there are long gaps between production runs.</p>
      <p><a href="https://www.upi.com/Top_News/US/2020/02/20/Vinyl-record-production-hurt-by-California-factory-fire/4601582093769/" target="_blank" rel="noopener noreferrer">Source: UPI's 2020 reporting on the Apollo Masters fire ↗</a></p>`
  },
  market: {
    title: "Resellers",
    
    body: `
      <p>The online market tells a different story from the physical shelves. In screenshots collected for this project, a used <em>Reputation</em> picture disc appeared on eBay for <strong>$205</strong>; Amazon marketplace offers were listed at <strong>$299.95–$324.99</strong>.</p>
      <p class="rep-image-pending"><strong>Listing screenshots coming soon.</strong> eBay: $205 asking price; Amazon: $299.95–$324.99 asking prices.</p>
      <p>Another retailer displayed a <strong>$44.99</strong> listing, but with a backorder estimate of 2–12 weeks. That is <strong>not</strong> evidence the record could ship immediately.</p>
      <p class="rep-image-pending">Retail listing screenshot coming soon: $44.99, with a 2–12 week backorder estimate.</p>
      <p>Prices must be compared across matching editions and conditions. These screenshots do not prove completed sales or establish a specific cause of the in-store shortage.</p>`
  }
};

const repFileButtons = [...document.querySelectorAll("[data-rep-file]")];
const repEvidenceTitle = document.getElementById("rep-evidence-title");
const repEvidenceStatus = document.getElementById("rep-evidence-status");
const repEvidenceBody = document.getElementById("rep-evidence-body");
// /** Opens evidence associated with an investigation clipping.
// Opens the related panel or item. set of instructions: openReputationFile.
// Opens a selected piece of evidence in the investigation.
function openReputationFile(key) {
  const file = repEvidenceFiles[key];
  if (!file || !repEvidenceTitle || !repEvidenceStatus || !repEvidenceBody) return;
  repEvidenceTitle.textContent = file.title;
  repEvidenceStatus.textContent = file.status;
  repEvidenceBody.innerHTML = file.body;
  repFileButtons.forEach(button => {
    const isActive = button.dataset.repFile === key;
    button.setAttribute("aria-expanded", String(isActive));
    const stamp = button.querySelector(".rep-news-open");
    if (stamp) stamp.textContent = isActive ? "Now reading ↗" : "Read the evidence ↗";
  });
  if (window.matchMedia("(max-width: 850px)").matches) {
    const chapter = document.getElementById("reputation-investigation");
    const panel = document.getElementById("rep-evidence");
    if(chapter && panel) chapter.scrollTo({top:panel.offsetTop - chapter.offsetTop - 35,behavior:"smooth"});
  }
}
repFileButtons.forEach(button => {
  button.addEventListener("click", () => openReputationFile(button.dataset.repFile));
});
// /** Coordinates opening narrative updates on scroll/resize.
// Updates the page based on scrolling. set of instructions: updateScrollSections.
// Updates the animated story sections while scrolling.
function updateScrollSections() {
  updateOpeningScroll();
}
window.addEventListener("scroll", updateScrollSections, {passive: true});
window.addEventListener("resize", updateScrollSections);
updateScrollSections();
// duplicate scroll/resize listeners. The original handlers above remain active. */
// /* ============================================
// 16. FADE-IN ANIMATIONS
// ============================================ */

const fadeElements = [
  ...document.querySelectorAll(".fade")
];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(
            entry.target
          );
        }
      });
    },
    {
      threshold: .1
    }
  );

  fadeElements.forEach(node => {
    observer.observe(node);
  });

} else {
  fadeElements.forEach(node => {
    node.classList.add("visible");
  });
}
// /* ============================================
// 17. LOAD BOTH spreadsheet-style data file FILES
// ============================================ */
// /** Loads datasets and initializes the website’s clickable or changeable features.
// Loads the data and starts the interactive parts of the website.
async function initializeWebsite() {
  document.getElementById("status").textContent =
    "Loading store inventory...";

  try {
    const [inventoryRows, originalPriceRows] =
      await Promise.all([
        loadCSV("./store_inventory.csv"),
loadCSV("./original_price.csv")
      ]);

    processInventory(inventoryRows);
    processOriginalPrices(originalPriceRows);

    renderWall();
    populateAlbumSelect();
    renderPriceExplorer();
    // Retail comparison now appears in the integrated price dumbbell chart.

    refreshMarkers();
    updateMapStatus();

    console.log(
      "Inventory CSV rows:",
      inventoryRows.length
    );

    console.log(
      "Original price CSV rows:",
      originalPriceRows.length
    );

  } catch (error) {
    console.error(
      "Website data loading error:",
      error
    );

    document.getElementById("status").textContent =
      "Could not load CSV files. " +
      "Check filenames and use Live Server.";

    document.getElementById("chart-feedback").textContent =
      "Data failed to load. " +
      "Check the browser console.";
  }
}

initializeWebsite();
window.addEventListener(
  "resize",
  () => {
    map.resize();
  }
);
window.addEventListener(
  "load",
  () => {
    map.resize();
  }
);
// /* One actual pinned visible screen area, with the existing clickable or changeable sections as scenes.
// Scrolling advances scenes in place. Scroll inside a long website section to explore it. */
(function(){
 const root=document.getElementById('pinned-story');
 if(!root)return;
 const scenes=[...root.querySelectorAll('.pinned-chapter')];
 const bar=root.querySelector('.pinned-progress');
 let active=-1, pending=false;
 function activate(i){
   if(i===active)return;
   active=i;
   scenes.forEach((s,j)=>{
     const on=i===j;
     s.classList.toggle('is-active',on);
     s.setAttribute('aria-hidden',String(!on));
     if('inert' in s)s.inert=!on;
   });
   if(i===1 && typeof map!=='undefined')setTimeout(()=>{
      map.resize();
      map.scrollZoom.disable();
    },80);
 }
 // Refreshes the related page content or state. set of instructions: update.
 function update(){
   pending=false;
   const rect=root.getBoundingClientRect();
   const travel=Math.max(1,rect.height-innerHeight);
   const p=Math.max(0,Math.min(1,-rect.top/travel));
   activate(Math.min(scenes.length-1,Math.floor(p*(scenes.length-1)+0.00001)));
   if(bar)bar.style.width=(p*100)+'%';
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(update)}}
 root.addEventListener('wheel',e=>{
   if(e.ctrlKey || e.target.closest('input,textarea,select,[role="slider"]'))return;
   const chapter=e.target.closest('.pinned-chapter.is-active');
   if(!chapter)return;
   const scrollable=chapter.scrollHeight>chapter.clientHeight+2;
   const atEnd=e.deltaY>0 && chapter.scrollTop+chapter.clientHeight>=chapter.scrollHeight-2;
   const atStart=e.deltaY<0 && chapter.scrollTop<=2;
   if(!scrollable || atEnd || atStart){
     e.preventDefault();
     window.scrollBy({top:e.deltaY,left:0,behavior:'instant'});
   }
 },{passive:false});
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule);

 // When the map or price links jump between website sections, activate target and scroll
 document.addEventListener('click',e=>{
   const link=e.target.closest('a[href^="#"]');
   if(!link)return;
   const target=document.querySelector(link.getAttribute('href'));
   const scene=target?.closest('.pinned-chapter');
   if(!scene)return;
   const i=scenes.indexOf(scene);
   if(i<0)return;
   e.preventDefault();
   const y=root.getBoundingClientRect().top+scrollY+
       (root.offsetHeight-innerHeight)*(i+.05)/scenes.length;
   window.scrollTo({top:y,behavior:'smooth'});
 });
 update();
})();
// /** Scrolls the document to the requested pinned website section.
// Updates the page based on scrolling. set of instructions: scrollToPinnedChapter.
// Scrolls to the chosen chapter of the story.
function scrollToPinnedChapter(i){
 const root=document.getElementById('pinned-story');
 if(!root)return;
 const y=root.getBoundingClientRect().top+window.scrollY+
  Math.max(0,root.offsetHeight-window.innerHeight)*(i+.05)/document.querySelectorAll("#pinned-story .pinned-chapter").length;
 window.scrollTo({top:y,behavior:'smooth'});
}
// /* Evidence-board string movement effect, driven by scroll within the investigation website section.
// All four clippings remain clickable at any scroll position. */
(function(){
 const chapter=document.getElementById('reputation-investigation');
 const track=document.querySelector('.crime-scroll-track');
 const board=document.getElementById('crime-board');
 if(!chapter||!track||!board)return;
 const paths=[...board.querySelectorAll('.crime-string')];
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let raf=0;
 // Refreshes the related page content or state. set of instructions: update.
 function update(){
   raf=0;
   const trackTop=track.offsetTop;
   const travel=Math.max(1,track.offsetHeight-board.offsetHeight);
   const p=Math.max(0,Math.min(1,(chapter.scrollTop-trackTop)/travel));
   paths.forEach((path,i)=>{
     const start=i*.19;
     const t=reduceMotion?1:Math.max(0,Math.min(1,(p-start)/.24));
     path.style.opacity=String(0.7 + 0.3*t);
   });
 }
 function request(){if(!raf)raf=requestAnimationFrame(update)}
 chapter.addEventListener('scroll',request,{passive:true});
 window.addEventListener('resize',request);
 board.querySelectorAll('[data-rep-file]').forEach(button=>{
   button.addEventListener('click',()=>{
     const key=button.dataset.repFile;
     paths.forEach(path=>path.classList.toggle('is-selected',path.dataset.string===key));
   });
 });
 document.querySelector('.crime-close')?.addEventListener('click',()=>{
   const evidence=document.getElementById('rep-evidence');
   if(evidence)evidence.hidden=true;
   chapter.scrollTo({top:track.offsetTop,behavior:'smooth'});
 });
 board.querySelectorAll('[data-rep-file]').forEach(button=>button.addEventListener('click',()=>{
   const evidence=document.getElementById('rep-evidence');
   if(evidence)evidence.hidden=false;
 }));
 update();
})();
// /* The compact store card expands only if the visitor asks for full inventory. */
const storeDetailsToggle = document.getElementById("toggle-store-details");
if (storeDetailsToggle) storeDetailsToggle.addEventListener("click", () => {
  const extra = document.getElementById("store-extra");
  extra.hidden = !extra.hidden;
  storeDetailsToggle.setAttribute("aria-expanded", String(!extra.hidden));
  storeDetailsToggle.textContent = extra.hidden ? "View full store inventory ↓" : "Hide full store inventory ↑";
});


// Move the Spotify popup by dragging its title bar. The close button and
// embedded Spotify controls remain independently clickable.
(function enableDraggableSpotifyPlayer() {
  const player = document.getElementById("album-music");
  const header = player && player.querySelector(".music-header");
  if (!player || !header) return;

  let drag = null;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  function keepInView() {
    if (player.hidden || !player.classList.contains("is-draggable")) return;
    const rect = player.getBoundingClientRect();
    player.style.left = clamp(rect.left, 0, Math.max(0, innerWidth - rect.width)) + "px";
    player.style.top = clamp(rect.top, 0, Math.max(0, innerHeight - rect.height)) + "px";
  }
  header.addEventListener("pointerdown", event => {
    if (event.button !== 0 || event.target.closest("button, a, input")) return;
    const rect = player.getBoundingClientRect();
    drag = { id: event.pointerId, dx: event.clientX - rect.left, dy: event.clientY - rect.top };
    player.classList.add("is-draggable");
    player.style.left = rect.left + "px";
    player.style.top = rect.top + "px";
    header.classList.add("is-dragging");
    header.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  header.addEventListener("pointermove", event => {
    if (!drag || event.pointerId !== drag.id) return;
    const width = player.getBoundingClientRect().width;
    const height = player.getBoundingClientRect().height;
    player.style.left = clamp(event.clientX - drag.dx, 0, Math.max(0, innerWidth - width)) + "px";
    player.style.top = clamp(event.clientY - drag.dy, 0, Math.max(0, innerHeight - height)) + "px";
  });
  function endDrag(event) {
    if (!drag || event.pointerId !== drag.id) return;
    drag = null;
    header.classList.remove("is-dragging");
    if (header.hasPointerCapture(event.pointerId)) header.releasePointerCapture(event.pointerId);
  }
  header.addEventListener("pointerup", endDrag);
  header.addEventListener("pointercancel", endDrag);
  window.addEventListener("resize", keepInView);
})();




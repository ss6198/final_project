




"use strict";
const money = value =>
  "$" + Number(value).toFixed(2);
function element(tag, className = "", text = "") {
  const node = document.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}
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
function getStoreIndex(name) {
  const key = normalize(name);

  return Object.prototype.hasOwnProperty.call(
    storeAliases,
    key
  )
    ? storeAliases[key]
    : -1;
}

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

function displayAlbumName(name) {
  return name === "TTPD" ? "The Tortured Poets Department" :
    name === "Life of a Showgirl" ? "The Life of a Show girl" : name;
}

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
function normalizeAlbum(name) {
  const key = normalize(name);

  return albumAliases[key] ||
    String(name ?? "").trim();
}
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
function parsePrice(value) {
  const cleaned = String(value ?? "")
    .replace(/[$,]/g, "")
    .trim();

  if (!cleaned) {
    return NaN;
  }

  return Number(cleaned);
}
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
  if (document.getElementById("stat-stores")) document.getElementById("stat-stores").textContent = stores.length;
  if (document.getElementById("stat-found")) document.getElementById("stat-found").textContent = storesWithVinyl;
  if (document.getElementById("stat-copies")) document.getElementById("stat-copies").textContent = totalCopies;
  if (document.getElementById("stat-reputation")) document.getElementById("stat-reputation").textContent = reputationCopies;
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
let vinylFocusedStore = "all";

function vinylArc(cx, cy, radius, start, end) {
  const point = angle => [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  const a = point(start), b = point(end);
  return `M ${a[0]} ${a[1]} A ${radius} ${radius} 0 ${end-start > Math.PI ? 1 : 0} 1 ${b[0]} ${b[1]}`;
}
function showVinylDetails(title, storeIndex = null) {
  const album = albumData.get(title);
  if (!album) return;
  const panel = document.getElementById("vinyl-details");
  if (!panel) return; 
  panel.replaceChildren();
  panel.append(element("p", "eyebrow", "Album investigation"), element("h4", "", title));
  panel.append(element("p", "", `${album.copies} recorded copies across ${album.storeIndices.size} of ${stores.length} stores.`));
  const actions = element("div", "vinyl-detail-actions");
  const listen = element("button", "", "Open Spotify player");
  listen.type = "button";
  listen.addEventListener("click", () => playAlbumMusic(title));
  const mapButton = element("button", "secondary", "Choose a store");
  mapButton.type = "button";
  mapButton.addEventListener("click", () => {
    document.getElementById("store-picker")?.focus();
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

const vinylAlbumColors = {
  "Taylor Swift (Debut)": "#34F3FF",
  "Fearless": "#f6ed95",
  "Fearless (TV)": "#F6BE80",
  "Speak Now": "#B982F5",
  "Speak Now (TV)": "#E278CE",
  "Red": "#FF5963",
  "Red (TV)": "#FF825C",
  "1989": "#9DCCFF",
  "1989 (TV)": "#62B5FF",
  "Reputation": "#D1D5E3",
  "Lover": "#fdc0cc",
  "Folklore": "#E5E6EC",
  "Evermore": "#EFA66B",
  "Midnights": "#8AAFFF",
  "TTPD": "#EAD8C3",
  "Life of a Showgirl": "#68F5BE",
};

function updateVinylPricePanel(albumTitle, storeIndex) {
  const pricePicker = document.getElementById("album-select");
  if (albumTitle && pricePicker && pricePicker.value !== albumTitle &&
      [...pricePicker.options].some(option => option.value === albumTitle)) {
    pricePicker.value = albumTitle;
    renderPriceExplorer();
  }

  const title = document.getElementById("vinyl-price-title");
  const storeText = document.getElementById("vinyl-price-store");
  const values = document.getElementById("vinyl-price-values");
  if (!title || !storeText || !values) return;
  values.replaceChildren();
  if (!albumTitle || storeIndex === null || storeIndex === undefined || !stores[storeIndex]) {
    title.textContent = albumTitle ? displayAlbumName(albumTitle) : "Select an album";
    storeText.textContent = albumTitle ? "Showing prices across all stores. Click a store slice for its specific prices." : "Choose an album to compare prices.";
    return;
  }
  const album = albumData.get(albumTitle);
  const store = stores[storeIndex];
  const listings = album?.listings.filter(row => row.storeIndex === storeIndex) || [];
  const copies = listings.reduce((sum, row) => sum + (row.quantity || 0), 0);
  title.textContent = displayAlbumName(albumTitle);
  storeText.textContent = `${store.name} · ${copies} ${copies === 1 ? "copy" : "copies"} recorded`;
  const addRow = (label, value) => {
    const row = document.createElement("div"); row.className = "vinyl-price-row";
    const name = document.createElement("span"); name.textContent = label;
    const amount = document.createElement("strong"); amount.textContent = value;
    row.append(name, amount); values.append(row);
  };
  const retail = retailReferences.get(albumTitle)?.price;
  addRow("Original retail", Number.isFinite(retail) ? money(retail) : "Not recorded");
  const prices = [...new Set(listings.map(row => row.price).filter(Number.isFinite))].sort((a,b) => a-b);
  if (prices.length) prices.forEach((price,i) => addRow(prices.length === 1 ? "Store price" : `Store price ${i+1}`, money(price)));
  else addRow("Store price", "Not recorded");
}

function renderWall() {
  const container = document.getElementById("album-chart");
  const albums = [...albumData.values()].reverse();
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.classList.add("vinyl-rotating-disc");
  const center = 650, outer = 530, spacing = 26; // Separate price waves and sparse stock ticks, with room between albums.
  svg.setAttribute("viewBox", "0 0 1300 1300");
  svg.setAttribute("role", "group");
  svg.setAttribute("aria-label", "Colored album sound-wave grooves divided into thirteen store slices, with price markers only for recorded CSV values");
  const svgItem = (tag, attrs, parent = svg) => {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    parent.append(node);
    return node;
  };
  const allSpreads = albums.flatMap(album => {
    const retail = retailReferences.get(album.title)?.price;
    if (!Number.isFinite(retail)) return [];
    return album.listings.map(row => Math.abs(row.price - retail));
  });
  const maxSpread = Math.max(1, ...allSpreads);
  const maxCopies = Math.max(1, ...albums.flatMap(album => album.listings.map(row => row.quantity || 0)));
  const storeCount = stores.length; // Thirteen equal slices.
  const storeAngle = 2 * Math.PI / storeCount;
  const polar = (radius, angle) => ({
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle)
  });

  svgItem("circle", {cx:center,cy:center,r:outer+22,fill:"#08090d",
    "fill-opacity":.94,stroke:"#5d5d64","stroke-width":1.2,
    "pointer-events":"none"});

  stores.forEach((store, i) => {
    const start = -Math.PI / 2 + i * storeAngle;
    const end = start + storeAngle;
    const a = polar(61, start), b = polar(outer + 19, start);
    const c = polar(outer + 19, end), d = polar(61, end);
    const isSelected = selectedStoreIndex === i;
    svgItem("path", {
      d:`M ${a.x} ${a.y} L ${b.x} ${b.y} A ${outer+19} ${outer+19} 0 0 1 ${c.x} ${c.y} L ${d.x} ${d.y} A 61 61 0 0 0 ${a.x} ${a.y} Z`,
      fill: isSelected ? "#ffe5a0" : "#f5f0e9",
      "fill-opacity": isSelected ? .095 : (i % 2 === 0 ? .035 : .008),
      "pointer-events":"none"
    });
    const from = polar(61, start);
    const to = polar(outer + 19, start);
    const divider = svgItem("line", {x1:from.x,y1:from.y,x2:to.x,y2:to.y,
      stroke: isSelected ? "#ffe5a0" : "#d7d4dc",
      "stroke-width":isSelected ? 2.2 : 1.4,
      "stroke-opacity":isSelected ? .88 : .53,
      "pointer-events":"none"});
    svgItem("title",{},divider).textContent = `Store ${i+1}: ${store.name}`;
  });

  const chooseVinylStore = index => {
    const album = selectedAlbum || albums[0]?.title;
    if (!album) return;
    if (selectedAlbum !== album) selectAlbum(album);
    vinylFocusedStore = String(index);
    showStore(index);
    updateVinylPricePanel(album, index);
    renderWall();
  };

  const labelsGroup = svgItem("g", {"class":"vinyl-store-labels"});
  const flipLabels = new Set([
    "A-1 Record Shop", "Limited to One Records", "Academy Records & CDs",
    "Barnes & Noble — Union Square", "Barnes & Noble — Fifth Avenue",
    "Urban Outfitters — Fifth Avenue", "Rough Trade Below"
  ]);
  stores.forEach((store, i) => {
    const middle = -Math.PI / 2 + (i + .5) * storeAngle;
    const halfArc = storeAngle * .46;
    const radius = outer + 43;
    const bottom = (Math.sin(middle) > 0) !== flipLabels.has(store.name);
    const firstAngle = bottom ? middle + halfArc : middle - halfArc;
    const lastAngle = bottom ? middle - halfArc : middle + halfArc;
    const first = polar(radius, firstAngle);
    const last = polar(radius, lastAngle);
    const arcId = `vinyl-store-label-arc-${i}`;
    svgItem("path", {id:arcId,
      d:`M ${first.x} ${first.y} A ${radius} ${radius} 0 0 ${bottom ? 0 : 1} ${last.x} ${last.y}`,
      fill:"none",stroke:"none"}, labelsGroup);
    const label = svgItem("text", {
      fill: selectedStoreIndex === i ? "#ffe5a0" : "#f7f3ef",
      "font-size":12,"font-weight":650,
      "letter-spacing":"0.15", "text-anchor":"middle",
      "paint-order":"stroke",stroke:"#08090d","stroke-width":3,
      "stroke-linejoin":"round", "pointer-events":"visiblePainted",
      role:"button",tabindex:0,"aria-label":`Select ${store.name}`,
      "aria-pressed":selectedStoreIndex === i ? "true" : "false",
      "class":"vinyl-store-name"
    },labelsGroup);
    const textOnArc = svgItem("textPath", {href:`#${arcId}`, "startOffset":"50%"},label);
    textOnArc.textContent = store.name;
    label.addEventListener("click", event => { event.stopPropagation(); chooseVinylStore(i); });
    label.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); chooseVinylStore(i);
      }
    });
  });

  stores.forEach((store, index) => {
    const start = -Math.PI / 2 + index * storeAngle;
    const end = start + storeAngle;
    const a = polar(64, start), b = polar(outer + 18, start);
    const c = polar(outer + 18, end), d = polar(64, end);
    const wedge = svgItem("path", {d:`M ${a.x} ${a.y} L ${b.x} ${b.y} A ${outer+18} ${outer+18} 0 0 1 ${c.x} ${c.y} L ${d.x} ${d.y} A 64 64 0 0 0 ${a.x} ${a.y} Z`,
      fill:"transparent",role:"button",tabindex:0,"aria-label":`Select ${store.name}`});
    const chooseStore = () => chooseVinylStore(index);
    wedge.addEventListener("click",chooseStore);
    wedge.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();chooseStore();}});
  });

  albums.forEach((album, albumIndex) => {
    const radius = outer - albumIndex * spacing;
    const color = vinylAlbumColors[album.title] || "#aaa";
    const retail = retailReferences.get(album.title)?.price;
    const hasRetail = Number.isFinite(retail) && retail > 0;
    const albumInFocus = !selectedAlbum || selectedAlbum === album.title;
    const albumPeakDifference = hasRetail
      ? Math.max(0, ...album.listings.filter(row => Number.isFinite(row.price)).map(row => Math.abs(row.price - retail)))
      : 0;
    const albumAmplitude = 1.2 + 8.5 * Math.sqrt(albumPeakDifference / maxSpread);
    stores.forEach((store, storeIndex) => {
      const listings = album.listings.filter(row => row.storeIndex === storeIndex);
      const copies = listings.reduce((sum, row) => sum + (row.quantity || 0), 0);
      const hasStock = copies > 0;
      const prices = listings.map(row => row.price).filter(Number.isFinite);
      const values = hasRetail ? [retail, ...prices] : prices;
      const low = values.length ? Math.min(...values) : null;
      const high = values.length ? Math.max(...values) : null;
      const storeSpread = hasRetail && prices.length
        ? Math.max(...prices.map(p => Math.abs(p - retail))) : 0;
      const hasPriceComparison = hasStock && hasRetail && prices.length > 0;
      const amplitude = hasPriceComparison
        ? 1.2 + 8.5 * Math.sqrt(storeSpread / maxSpread)
        : albumAmplitude;
      const inFocus = vinylFocusedStore === "all" || Number(vinylFocusedStore) === storeIndex;
      const opacity = 1; // Keep every album vivid, even when another store or album is selected.
      const startAngle = -Math.PI / 2 + storeIndex * storeAngle;
      const samples = 96;
      const pointedSine = t => {
        const sine = Math.sin(2 * Math.PI * t);
        return Math.sign(sine) * Math.pow(Math.abs(sine), 6);
      };
      const waveRadius = t => radius - amplitude * pointedSine(t);
      const commands = [];
      for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const pos = polar(waveRadius(t), startAngle + storeAngle * t);
        commands.push(`${i ? "L" : "M"}${pos.x.toFixed(2)} ${pos.y.toFixed(2)}`);
      }
      const wave = svgItem("path", {d: commands.join(" "), fill: "none", stroke: color,
        "stroke-width": 3.5, "stroke-opacity": 1,
        "stroke-dasharray": hasPriceComparison ? "none" : "4 6",
        "stroke-linecap": "round", "stroke-linejoin": "round",
        style: "filter: drop-shadow(0 0 3px " + color + ");", "pointer-events": "none"});
      svgItem("title", {}, wave).textContent = `${album.title} at ${store.name}: ${hasPriceComparison ? "observed price comparison" : "no comparable store price"}`;

      if (hasStock) {
        const visibleTicks = Math.min(copies, 8);
        for (let tickIndex = 0; tickIndex < visibleTicks; tickIndex++) {
          const t = .22 + .56 * (tickIndex + .5) / visibleTicks;
          const angle = startAngle + storeAngle * t;
          const inner = polar(radius - 19, angle);
          const outerTick = polar(radius - 12, angle);
          const tick = svgItem("line", {
            x1: inner.x, y1: inner.y, x2: outerTick.x, y2: outerTick.y,
            stroke: color, "stroke-width": 2.8, "stroke-linecap": "square",
            "stroke-opacity": 1, "pointer-events": "none"
          });
          svgItem("title", {}, tick).textContent =
            `${album.title} • ${store.name}: ${copies} copies in stock`;
        }
      }

      const hit = svgItem("path", {d:vinylArc(center,center,radius,startAngle,startAngle+storeAngle),
        fill:"none",stroke:"transparent","stroke-width":19,role:"button",tabindex:0,
        "aria-label":`${album.title}, ${store.name}: ${hasStock ? `${copies} copies` : "not found"}`});
      svgItem("title",{},hit).textContent = `${album.title} • ${store.name} • ${hasStock ? `${copies} copies` : "No copies recorded"}${hasRetail ? ` • retail ${money(retail)}` : ""}`;
      const choose = () => {selectAlbum(album.title);vinylFocusedStore=String(storeIndex);renderWall();showVinylDetails(album.title,storeIndex);showStore(storeIndex);updateVinylPricePanel(album.title,storeIndex);};
      hit.addEventListener("click",choose);
      hit.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();choose();}});
      if (hasPriceComparison) {
        const observedPrices = [...new Set(prices)].sort((a, b) => a - b);
        const markers = [
          {label: "Original retail price (CSV)", price: retail, isRetail: true},
          ...observedPrices.map(price => ({
            label: "Observed store price (CSV)", price, isRetail: false
          }))
        ];
        markers.forEach((mark, i) => {
          const t = .14 + .72 * (i + .5) / markers.length;
          const angle = startAngle + storeAngle * t;
          const pos = polar(waveRadius(t), angle);
          const dot = svgItem("circle", {
            cx: pos.x, cy: pos.y, r: mark.isRetail ? 4.8 : 4.3,
            fill: mark.isRetail ? "#fff" : color,
            stroke: "#09090d", "stroke-width": 1.1,
            "fill-opacity": Math.max(.85, opacity), role: "img", tabindex: 0,
            "aria-label": `${album.title}, ${store.name}, ${mark.label}: ${money(mark.price)}`
          });
          svgItem("title", {}, dot).textContent = `${album.title} • ${store.name}\n${mark.label}: ${money(mark.price)}\n${copies} copies recorded`;
          dot.addEventListener("click", choose);
        });
      }
    });
  });
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
  recordCircle(130, "#101011", "#38383a", 2);
  [125, 120, 115].forEach((radius, index) => {
    const groove = recordCircle(radius, "none", index === 1 ? "#5b5b5b" : "#343434", 1.2);
    groove.setAttribute("opacity", index === 1 ? ".65" : ".5");
  });
  recordCircle(105, "#e8dfcd", "#8d8170", 2);
  recordCircle(96, "none", "#b2a695", 1.2);
  recordCircle(76, "none", "#b2a695", 1);
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
  centerText("33⅓ RPM", center - 56, "15", "bold", "#54473d", "1.2");
  centerText("TAYLOR SWIFT", center - 25, "18", "bold", "#24201e", ".8");
  centerText("VINYL ARCHIVE", center + 49, "15", "bold", "#54473d", "1");
  centerText("NYC · 13 STORES", center + 66, "12", "normal", "#54473d", ".5");
  recordCircle(10, "#171717", "#847969", 2);
  recordCircle(2.5, "#080808");
  svg.append(labelsGroup);
  const rotatingDisc = container.querySelector("svg.vinyl-rotating-disc");
  if (rotatingDisc) {
    rotatingDisc.replaceChildren(...Array.from(svg.childNodes));
    rotatingDisc.setAttribute("viewBox", svg.getAttribute("viewBox"));
    rotatingDisc.setAttribute("aria-label", svg.getAttribute("aria-label"));
  } else {
    container.append(svg);
  }

}
function populateAlbumSelect() {
  const select = document.getElementById("album-select");
  select.replaceChildren();
  priceAlbums.forEach(album => {
    const option = document.createElement("option");
    option.value = album.title;
    option.textContent = displayAlbumName(album.title);
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
    button.addEventListener("click", () => {clearAlbumFilter();openStoreDetails(listing.storeIndex);});
    container.appendChild(button);
  });
}

document.getElementById("album-select").addEventListener("change", () => {
  const title = document.getElementById("album-select").value;
  if (title) {
    selectAlbum(title);
    vinylFocusedStore = "all";
    renderWall();
    renderPriceExplorer();
    updateVinylPricePanel(title, null);
  }
});
function updateStoreStatus() {
  const status = document.getElementById("status");
  if (!status) return;
  if (!selectedAlbum) {
    status.textContent = "Select a store or click a vinyl segment to view its inventory.";
    return;
  }
  const album = albumData.get(selectedAlbum);
  status.textContent = `${displayAlbumName(selectedAlbum)}: found at ${album?.storeIndices.size ?? 0} of ${stores.length} stores.`;
}

function selectAlbum(title) {
  selectedAlbum = title;
  const albumPicker = document.getElementById("album-select");
  if (albumPicker && [...albumPicker.options].some(option => option.value === title)) albumPicker.value = title;
  playAlbumMusic(title);
  selectedStoreIndex = null;

  closePanelOnly();
  updateStoreStatus();
  renderWall();

  document.getElementById("chart-feedback").textContent = "";

  document.getElementById("clear-filter").hidden = false;
}
function clearAlbumFilter() {
  selectedAlbum = null;
  vinylFocusedStore = "all";

  document.getElementById("chart-feedback").textContent = "";

  document.getElementById("clear-filter").hidden = true;

  renderWall();
}

document.getElementById("clear-filter").addEventListener(
  "click",
  clearAlbumFilter
);

const panel = document.getElementById("panel");
function showStore(index) {
  if (index < 0 || index >= stores.length) {
    return;
  }

  selectedStoreIndex = index;
  document.getElementById("store-picker").value = String(index);
  vinylFocusedStore = String(index);
  document.querySelectorAll(".vinyl-store-name").forEach((label, i) => {
    label.setAttribute("fill", i === index ? "#ffe5a0" : "#f7f3ef");
    label.setAttribute("aria-pressed", i === index ? "true" : "false");
  });

  const store = stores[index];
  updateVinylPricePanel(selectedAlbum || null, index);

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

  const extra = document.getElementById("store-extra");
  const toggle = document.getElementById("toggle-store-details");
  if (extra && toggle) {
    extra.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "View full store inventory ↓";
  }
}
function closePanelOnly() {
  panel.classList.remove("open");

  panel.setAttribute(
    "aria-hidden",
    "true"
  );
}
function closeStore() {
  selectedStoreIndex = null;
  document.getElementById("store-picker").value = "";

  closePanelOnly();
}

const storePicker = document.getElementById("store-picker");
stores.forEach((store, index) => {
  const option = document.createElement("option");
  option.value = String(index);
  option.textContent = store.name;
  storePicker.append(option);
});
storePicker.addEventListener("change", () => {
  if (storePicker.value === "") closeStore();
  else showStore(Number(storePicker.value));
});

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
function openStoreDetails(index) {
  scrollToPinnedChapter(1);
  showStore(index);
}

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
function playAlbumMusic(title) {
  const player = document.getElementById("album-music");
  const iframe = document.getElementById("album-spotify");

  const id = extractSpotifyAlbumId(
    spotifyAlbumIds[title]
  );

  document.getElementById("music-album-name").textContent = displayAlbumName(title);

  player.hidden = false;
  player.classList.remove("is-minimized");
  const minimizeButton = document.getElementById("minimize-music");
  minimizeButton.textContent = "−";
  minimizeButton.setAttribute("aria-expanded", "true");
  minimizeButton.setAttribute("aria-label", "Minimize Spotify player");

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
function closeMusicPlayer() {
  document.getElementById("album-music").hidden = true;

  document.getElementById("album-spotify").src = "about:blank";
  document.getElementById("album-spotify").hidden = true;
}

const spotifyWindow = document.getElementById("album-music");
const spotifyHeader = spotifyWindow.querySelector(".music-header");
const spotifyMinimize = document.getElementById("minimize-music");
spotifyMinimize.addEventListener("click", () => {
  const minimized = spotifyWindow.classList.toggle("is-minimized");
  spotifyMinimize.textContent = minimized ? "+" : "−";
  spotifyMinimize.setAttribute("aria-expanded", String(!minimized));
  spotifyMinimize.setAttribute("aria-label", minimized ? "Expand Spotify player" : "Minimize Spotify player");
});

let spotifyDrag = null;
spotifyHeader.addEventListener("pointerdown", event => {
  if (event.button !== 0 || event.target.closest("button")) return;
  const rect = spotifyWindow.getBoundingClientRect();
  spotifyDrag = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  spotifyHeader.setPointerCapture(event.pointerId);
});
spotifyHeader.addEventListener("pointermove", event => {
  if (!spotifyDrag) return;
  const rect = spotifyWindow.getBoundingClientRect();
  const x = Math.max(0, Math.min(innerWidth - rect.width, event.clientX - spotifyDrag.x));
  const y = Math.max(0, Math.min(innerHeight - rect.height, event.clientY - spotifyDrag.y));
  spotifyWindow.style.left = `${x}px`;
  spotifyWindow.style.top = `${y}px`;
});
function endSpotifyDrag() { spotifyDrag = null; }
spotifyHeader.addEventListener("pointerup", endSpotifyDrag);
spotifyHeader.addEventListener("pointercancel", endSpotifyDrag);

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

const scrolly = document.querySelector(
  ".scrolly"
);

const steps = [
  ...document.querySelectorAll(
    ".scrolly .step"
  )
];
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

function updateScrollSections() {
  updateOpeningScroll();
}
window.addEventListener("scroll", updateScrollSections, {passive: true});
window.addEventListener("resize", updateScrollSections);
updateScrollSections();

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
async function initializeWebsite() {
  updateStoreStatus();

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
    document.getElementById("album-select").value = [...document.getElementById("album-select").options].some(o=>o.value==="Reputation") ? "Reputation" : document.getElementById("album-select").value;
    renderPriceExplorer();
    updateStoreStatus();

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

    document.getElementById("status").textContent = "Could not load CSV files. Check filenames and use Live Server.";

    document.getElementById("chart-feedback").textContent =
      "Data failed to load. " +
      (error && error.message ? error.message : "Check the browser console.");
  }
}

initializeWebsite();
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
 }
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
function scrollToPinnedChapter(i){
 const root=document.getElementById('pinned-story');
 if(!root)return;
 const y=root.getBoundingClientRect().top+window.scrollY+
  Math.max(0,root.offsetHeight-window.innerHeight)*(i+.05)/document.querySelectorAll("#pinned-story .pinned-chapter").length;
 window.scrollTo({top:y,behavior:'smooth'});
}
const storeDetailsToggle = document.getElementById("toggle-store-details");
if (storeDetailsToggle) storeDetailsToggle.addEventListener("click", () => {
  const extra = document.getElementById("store-extra");
  extra.hidden = !extra.hidden;
  storeDetailsToggle.setAttribute("aria-expanded", String(!extra.hidden));
  storeDetailsToggle.textContent = extra.hidden ? "View full store inventory ↓" : "Hide full store inventory ↑";
});


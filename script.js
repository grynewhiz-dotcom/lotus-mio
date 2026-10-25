/* ===== PENGATURAN: edit bagian ini saja ===== */
const CONFIG = {
  gofoodUrl: "https://gofood.co.id/yogyakarta/restaurant/lotus-mio-bangunjiwo-b3495827-48d4-436d-807c-d5c6ddaa2fcf",           // ganti dengan link GoFood Lotus Mio
  instagramUrl: "https://www.instagram.com/lotusmio?psln=aWs3anJ0ZGlkeTBz",  // ganti dengan IG resto
  mapsUrl: "https://maps.app.goo.gl/cEBxqRVGwmJpixZn9",
  email: "lotusmio10@gmail.com",             // email contoh
  waNumber: "087726604177",                                // kosongkan dulu. Isi format 62812xxxx kalau mau aktif
  // Jam buka (WIB), format "JJ:MM". Edit di sini saja, semua teks jam buka ikut berubah.
  jam: {
    hariKerja: ["10:00", "22:00"],   // Senin - Jumat
    akhirPekan: ["07:30", "23:00"]   // Sabtu - Minggu
  },
  destination: "Lotus Mio Bangunjiwo Restaurant, Bantul, Yogyakarta"
};

// Foto area: taruh di images/ dengan nama awalan + nomor, contoh indoor1.jpg ... indoor6.jpg
const AREAS = [
  { id: "indoor", name: "Indoor", title: "Indoor yang Sejuk", pre: "indoor", n: 6,
    text: "Cari tempat nyaman buat makan dan ngobrol lebih lama? Area indoor ber-AC cocok untuk kumpul keluarga, quality time bareng bestie, sampai meeting santai tanpa khawatir cuaca.",
    points: ["Ber-AC dan Tenang", "Nongki Bareng Teman", "Study Space"] },
  { id: "outdoor", name: "Semi Outdoor", title: "Semi Outdoor yang Menyatu dengan Alam", pre: "outdoor", n: 6,
    text: "Nikmati suasana hijau dengan udara yang lebih terbuka. Pas banget buat santai sore, ngobrol ngalor-ngidul bareng teman, atau sekadar menikmati waktu tanpa terburu-buru.",
    points: ["Udara Segar", "Pemandangan Hijau", "Spot Foto Favorit"] },
  { id: "toko", name: "Toko & Playground", title: "Galeri Sukalupa dan Permainan", pre: "toko", n: 5,
    text: "Mau cari pernak-pernik lucu atau butuh alasan buat memperpanjang waktu nongkrong? Jelajahi toko souvenir, lalu seru-seruan biar si kecil ikut happy!",
    points: ["Pernak-pernik dan Souvenir", "Mini Playground", "Trampolin"] }
];

// Ulasan
const REVIEWS = [
  { name: "Tasnim A Fauzia", stars: 5, text: "Tempatnya bagus dan estetik banget. Syahdu ala-ala alam tapi mewah gitu. Menunya banyak dan variatif dari nusantara sampao western. Harga lumayan pricey, rasa cukup enak. Cuma ada menu beer and wine, jadi untuk yang muslim harus tanya dulu menu biar dapet menu yg aman. Fasilitas juga lengkap, ada wifi, parkiran luas, toilet, mushola, bahkan ada playground untuk anak-anak." },
  { name: "Erwansyah Bela", stars: 5, text: "Lokasi bagus, tenang suasana dan viewe hijau. Makanan dan minuman western enak semua. Harga make sense. Cocok utk bersantai. Disediakan board game gratis, yg bisa bikin suasana cair dan gembira. Recomended utk acara bersama keluarga atau teman." },
  { name: "Banyubiru Putra", stars: 4, text: "Tempat 9/10 bener-bener bagus banget, selain itu mereka juga menyediakan mushola dan playground secara serius. Pelayanan 7.9/10 sebenrnya tidak ada yang salah dengan pelyanan, hanya kurang komunikatif saja jadi terkesan cuek dan seadanya. Rasa 7.5/10 mungkin perlu ada improvement, dan rekan2 saya pun berpendapat sama. Harga 8/10 menurut saya harga sesuai dengan tempat sebagus ini" }
];
// Menu favorit: tulis nama persis seperti di menu-data.js (3 atau lebih)
const FAVORIT = ["Nasi Campur Ala Mio", "Claypot Ayam Woku", "Chocolate Cheese Pie"];
/* Menu ada di file menu-data.js */
/* ===== akhir pengaturan ===== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const rupiah = n => "Rp " + n.toLocaleString("id-ID");
const home = document.body.dataset.page === "home", P = home ? "" : "index.html";
const NAV = [["beranda", "Beranda"], ["tentang", "Tentang"], ["area", "Area"], ["menu", "Menu"], ["ulasan", "Ulasan"], ["kontak", "Kontak"]];
const navLinks = NAV.map(([id, t]) => `<a href="${P}#${id}">${t}</a>`).join("");
const fmt = t => t.replace(":", ".");
const hrs = `Senin - Jumat: ${CONFIG.jam.hariKerja.map(fmt).join(" - ")} WIB<br>Sabtu - Minggu: ${CONFIG.jam.akhirPekan.map(fmt).join(" - ")} WIB`;
const WA = CONFIG.waNumber ? `href="https://wa.me/${CONFIG.waNumber}" target="_blank" rel="noopener"` : `href="#" title="Isi waNumber di script.js"`;
const brand = `<a href="${P}#beranda" class="logo"><span class="logo-mark"></span><span class="logo-text">Lotus Mio Bangunjiwo</span></a>`;
const ic = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICON = {
  mail: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  ig: ic('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>'),
  wa: ic('<path d="M20.5 3.5A11 11 0 0 0 3.2 17.3L2 22l4.8-1.2A11 11 0 1 0 20.5 3.5z"/><path d="M8.5 8c.5 3 3 5.5 6.5 6.5l1.5-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z"/>')
};

// Header & footer (dipakai di semua halaman)
$("#siteHeader").outerHTML = `<header class="nav${home ? "" : " solid"}" id="nav">${brand}<nav id="menuNav">${navLinks}</nav>
<div class="nav-right"><a class="btn btn-sm btn-res" href="${P}#reservasi">Reservasi<i>→</i></a>
<button class="burger" id="burger" aria-label="Buka menu" aria-expanded="false"><span></span><span></span></button></div></header>`;
$("#siteFooter").innerHTML = `<div class="foot-grid">
<div>${brand}<p class="foot-about">Resto santai di Bangunjiwo, Yogyakarta, dengan area indoor dan semi outdoor, playground, trampoline, dan board game untuk keluarga dan teman.</p>
<div class="socials"><a href="mailto:${CONFIG.email}" aria-label="Email">${ICON.mail}</a><a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a><a ${WA} aria-label="WhatsApp">${ICON.wa}</a></div></div>
<div><h4>Jelajahi</h4><ul>${NAV.map(([id, t]) => `<li><a href="${P}#${id}">${t}</a></li>`).join("")}<li><a href="about.html">Kenalan lebih dekat</a></li></ul></div>
<div><h4>Hubungi kami</h4><ul><li>Bangunjiwo, Kasihan, Bantul, DI Yogyakarta</li><li>${hrs}</li><li>${CONFIG.email}</li></ul></div>
<div><h4>Pesan sekarang</h4><p>Reservasi meja atau pesan antar lewat GoFood.</p><div class="actions"><a class="btn btn-sm" href="${P}#reservasi">Reservasi</a><a class="btn btn-sm btn-ghost" href="${CONFIG.gofoodUrl}" target="_blank" rel="noopener">GoFood</a></div></div></div>
<div class="foot-bottom">&copy; ${new Date().getFullYear()} Lotus Mio Bangunjiwo. Created as a web design project, not an official website.</div>`;

// Navbar
const nav = $("#nav"), burger = $("#burger"), menuNav = $("#menuNav"), toTop = $("#toTop");
addEventListener("scroll", () => { home && nav.classList.toggle("solid", scrollY > 60); toTop.hidden = scrollY < 600; }, { passive: true });
burger.addEventListener("click", () => { const o = menuNav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; });
menuNav.addEventListener("click", e => { if (e.target.tagName === "A") { menuNav.classList.remove("open"); burger.setAttribute("aria-expanded", false); document.body.style.overflow = ""; } });
toTop.addEventListener("click", () => scrollTo({ top: 0 }));

// Efek gambar "timbul" saat di-scroll
const popObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); popObs.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
const pop = els => els.forEach((el, i) => { el.classList.add("pop"); el.style.transitionDelay = (i % 4) * 90 + "ms"; popObs.observe(el); });
pop($$(".arch:not(.hero-img), .tile, .value, .shot"));

// Lengkung hero halaman Kenalan ikut gerak mouse
const phero = $(".page-hero");
if (phero && !matchMedia("(prefers-reduced-motion: reduce)").matches) phero.addEventListener("mousemove", e => {
  const r = phero.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
  $$(".arches i", phero).forEach((el, i) => el.style.transform = `translate(calc(-50% + ${dx * (i + 1) * 26}px), ${dy * (i + 1) * 14}px)`);
});

if (home) {
  $$(".js-gofood").forEach(a => a.href = CONFIG.gofoodUrl);
  $$(".js-maps").forEach(a => a.href = CONFIG.mapsUrl);
  $$(".js-ig").forEach(a => a.href = CONFIG.instagramUrl);
  $$(".js-mail").forEach(a => { a.href = "mailto:" + CONFIG.email; a.textContent = CONFIG.email; });

  // Menu aktif saat scroll
  const links = $$("#menuNav a");
  const spy = new IntersectionObserver(es => es.forEach(e => e.isIntersecting &&
    links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id))), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));

  // Hitung angka
  const counter = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count; let n = 0;
    const t = setInterval(() => { el.textContent = ++n; if (n >= end) clearInterval(t); }, 90);
    counter.unobserve(el);
  }));
  $$("[data-count]").forEach(el => counter.observe(el));

  // Area: tab + slider foto + lightbox
  const tabs = $("#areaTabs"), panel = $("#areaPanel");
  let slideTimer;
  function showArea(id) {
    const a = AREAS.find(x => x.id === id);
    $$(".tab", tabs).forEach(t => t.setAttribute("aria-selected", t.dataset.id === id));
    const imgs = Array.from({ length: a.n }, (_, i) => `${a.pre}${i + 1}.jpg`);
    panel.innerHTML = `<div class="area-info"><div><h3>${a.title}</h3><p>${a.text}</p></div><ul class="pts">${a.points.map(p => `<li>${p}</li>`).join("")}</ul></div>
      <div class="slider-wrap"><button class="arrow prev" aria-label="Foto sebelumnya">&#8249;</button>
      <div class="slider">${imgs.map(f => `<div class="ph slide" role="button" tabindex="0" aria-label="Perbesar foto" style="--img:url('images/${f}')"></div>`).join("")}</div>
      <button class="arrow next" aria-label="Foto berikutnya">&#8250;</button></div>`;
    pop([$(".slider-wrap", panel)]);
    panel.classList.toggle("few", a.n <= 3);
    const sl = $(".slider", panel);
    const step = dir => {
      const w = sl.firstElementChild.offsetWidth + 16, end = sl.scrollLeft + sl.clientWidth >= sl.scrollWidth - 4;
      sl.scrollTo({ left: dir > 0 && end ? 0 : sl.scrollLeft + dir * w });
    };
    const auto = () => { clearInterval(slideTimer); slideTimer = setInterval(() => step(1), 4500); };
    $(".prev", panel).onclick = () => step(-1);
    $(".next", panel).onclick = () => step(1);
    panel.onmouseenter = () => clearInterval(slideTimer);
    panel.onmouseleave = auto;
    auto();
  }
  tabs.innerHTML = AREAS.map(a => `<button class="tab" role="tab" data-id="${a.id}">${a.name}</button>`).join("");
  tabs.addEventListener("click", e => e.target.dataset.id && showArea(e.target.dataset.id));
  function openBox(ph) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `<div class="ph" style="--img:${ph.style.getPropertyValue("--img")}"></div>`;
    const close = () => { box.remove(); removeEventListener("keydown", esc); };
    const esc = e => e.key === "Escape" && close();
    box.addEventListener("click", close); addEventListener("keydown", esc);
    document.body.appendChild(box);
  }
  panel.addEventListener("click", e => e.target.classList.contains("slide") && openBox(e.target));
  panel.addEventListener("keydown", e => e.key === "Enter" && e.target.classList.contains("slide") && openBox(e.target));
  showArea(AREAS[0].id);

  // Menu: kategori + pencarian, tiap menu punya foto (images/menu/nama-menu.jpg)
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  // Harga: "20" = satu harga, "20/25" = panas/dingin, pakai "-" kalau salah satunya tidak ada ("20/-" atau "-/25")
  const parsePrice = v => String(v).includes("/") ? String(v).split("/").map(x => +x ? +x * 1000 : null) : [(+v) * 1000];
  const priceHTML = p => p.length === 1 ? `<b class="price">${rupiah(p[0])}</b>`
    : `<div class="price-hc">${[["Panas", p[0], "hot"], ["Dingin", p[1], "cold"]].filter(([, v]) => v).map(([l, v, k]) => `<span class="${k}"><small>${l}</small><b>${rupiah(v)}</b></span>`).join("")}</div>`;
  const CATS = Object.keys(MENU);
  const ALL = CATS.flatMap(c => { const [base, ...items] = MENU[c];
    return items.map(s => { const x = s.split("|"), p = x.slice(2).find(v => v.trim() !== ""); return { n: x[0], d: x[1] || "", c, p: parsePrice(p || base) }; }); });
  let cat = CATS[0];
  const grid = $("#menuGrid"), search = $("#menuSearch"), filters = $("#menuFilters");
  filters.innerHTML = ["Semua", ...CATS].map(c => `<button class="filter" aria-pressed="${c === cat}">${c}</button>`).join("");
  function renderMenu() {
    const q = search.value.trim().toLowerCase();
    const list = ALL.filter(m => q ? (m.n + m.d).toLowerCase().includes(q) : cat === "Semua" || m.c === cat);
    grid.innerHTML = list.map(m => `<article class="mcard"><div class="mph"><span>${m.n[0]}</span><img loading="lazy" src="images/menu/${slug(m.n)}.jpg" alt="${m.n}" onerror="this.remove()"></div>
      <div class="mbody"><h4>${m.n}</h4>${m.d ? `<p>${m.d}</p>` : ""}${priceHTML(m.p)}</div></article>`).join("");
    pop($$(".mcard", grid));
    $("#menuEmpty").hidden = list.length > 0;
  }
  filters.addEventListener("click", e => {
    if (!e.target.classList.contains("filter")) return;
    cat = e.target.textContent; search.value = "";
    $$(".filter").forEach(b => b.setAttribute("aria-pressed", b === e.target));
    renderMenu();
  });
  search.addEventListener("input", renderMenu);
  renderMenu();

  // Menu favorit (ambil data dari daftar menu)
  $("#favGrid").innerHTML = FAVORIT.map(n => ALL.find(m => m.n === n)).filter(Boolean).map(m => `<article class="fav">
    <div class="arch fav-img"><span class="fav-tag">Favorit</span><em>${m.n[0]}</em><img loading="lazy" src="images/menu/${slug(m.n)}.jpg" alt="${m.n}" onerror="this.remove()"></div>
    <h3>${m.n}</h3>${priceHTML(m.p)}</article>`).join("");
  pop($$(".fav"));

  // Ulasan (otomatis + tombol < >)
  const revBox = $("#reviews"), dots = $("#reviewDots");
  let ri = 0, timer;
  dots.innerHTML = REVIEWS.map((_, i) => `<button aria-label="Ulasan ${i + 1}" data-i="${i}"></button>`).join("");
  function showReview(i) {
    ri = (i + REVIEWS.length) % REVIEWS.length; const r = REVIEWS[ri];
    revBox.innerHTML = `<div class="review"><div class="stars" aria-label="${r.stars} bintang">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div><p>"${r.text}"</p><small>${r.name}, via Google Maps</small></div>`;
    $$("button", dots).forEach((b, j) => b.setAttribute("aria-current", j === ri));
  }
  const play = () => { clearInterval(timer); timer = setInterval(() => showReview(ri + 1), 6000); };
  $("#revPrev").onclick = () => { showReview(ri - 1); play(); };
  $("#revNext").onclick = () => { showReview(ri + 1); play(); };
  dots.addEventListener("click", e => { if (e.target.dataset.i) { showReview(+e.target.dataset.i); play(); } });
  revBox.addEventListener("mouseenter", () => clearInterval(timer));
  revBox.addEventListener("mouseleave", play);
  showReview(0); play();

  // Reservasi (simulasi, data tidak dikirim ke mana pun)
  const form = $("#resForm"), formHTML = form.innerHTML;
  const today = new Date().toISOString().split("T")[0];
  form.tgl.min = today;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const err = $("#resError"), f = Object.fromEntries(new FormData(form));
    $$("input", form).forEach(i => i.classList.remove("bad"));
    const bad = $$("[required]", form).filter(i => !i.value.trim());
    if (bad.length) { bad.forEach(i => i.classList.add("bad")); err.textContent = "Lengkapi kolom yang bertanda merah."; bad[0].focus(); return; }
    if (!/^(\+?62|0)8\d{7,12}$/.test(f.hp.replace(/[\s-]/g, ""))) { form.hp.classList.add("bad"); err.textContent = "Nomor WhatsApp belum benar. Contoh: 081234567890."; form.hp.focus(); return; }
    const esc = s => s.replace(/[<>&"]/g, c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
    form.innerHTML = `<div class="done"><h3>Reservasi tercatat</h3><p>Terima kasih, ${esc(f.nama)}! Ini ringkasan rencana kunjunganmu:</p>
      <dl><dt>Tanggal</dt><dd>${f.tgl}</dd><dt>Jam</dt><dd>${f.jam}</dd><dt>Jumlah</dt><dd>${f.org} orang</dd><dt>Area</dt><dd>${f.area}</dd><dt>Catatan</dt><dd>${esc(f.cat) || "-"}</dd></dl>
      <p class="demo">Ini simulasi untuk proyek kuliah. Data tidak dikirim ke mana pun.</p>
      <button class="btn btn-light" type="button" id="again">Buat reservasi lagi</button></div>`;
    $("#again").onclick = () => { form.innerHTML = formHTML; form.tgl.min = today; };
  });

  // Arahkan dari lokasi pengguna
  $("#dirBtn").addEventListener("click", () => {
    const st = $("#dirStatus"), dest = encodeURIComponent(CONFIG.destination);
    const go = o => window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}${o ? "&origin=" + o : ""}`, "_blank");
    if (!navigator.geolocation) return go();
    st.textContent = "Mencari lokasimu...";
    navigator.geolocation.getCurrentPosition(
      p => { st.textContent = ""; go(`${p.coords.latitude},${p.coords.longitude}`); },
      () => { st.textContent = "Lokasi tidak diizinkan, kami buka Google Maps biasa."; go(); },
      { timeout: 8000 });
  });

  // Mampir: status buka, kata berganti, pita berjalan, parallax lengkung
  $$(".js-hours").forEach(el => el.innerHTML = hrs);
  const now = new Date(), tz = { timeZone: "Asia/Jakarta" };
  const day = new Intl.DateTimeFormat("en-US", { weekday: "short", ...tz }).format(now);
  const [hh, mm] = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", ...tz }).format(now).split(":").map(Number);
  const toMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const sched = d => CONFIG.jam[d === "Sat" || d === "Sun" ? "akhirPekan" : "hariKerja"];
  const [bk, tp] = sched(day), nowMin = hh * 60 + mm;
  const isOpen = nowMin >= toMin(bk) && nowMin < toMin(tp);
  $("#openText").textContent = isOpen ? `Buka sekarang, tutup pukul ${fmt(tp)} WIB`
    : nowMin < toMin(bk) ? `Sedang tutup, buka hari ini pukul ${fmt(bk)} WIB`
    : `Sedang tutup, buka lagi besok pukul ${fmt(sched(DAYS[(DAYS.indexOf(day) + 1) % 7])[0])} WIB`;
  $("#openPill").classList.toggle("closed", !isOpen);
  const words = ["keluarga", "bestie", "si kecil", "pacar", "just friend", "hts-an", "mantan", "crush", "rekan kerja", "diri sendiri"], swap = $("#swap");
  let wi = 0;
  setInterval(() => { swap.style.opacity = 0; setTimeout(() => { swap.textContent = words[++wi % words.length]; swap.style.opacity = 1; }, 300); }, 2400);
  const ribbon = ["Delicious Bites", "Board game", "Trampoline", "Playground", "Gelato", "Coffee", "Indoor & Semi Outdoor", "Family Time", "Me Time", "Fine Dining"].map(t => t + " &nbsp;✦&nbsp; ").join("");
  $("#track").innerHTML = ribbon + ribbon;
  const mp = $("#mampir");
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) mp.addEventListener("mousemove", e => {
    const r = mp.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
    $$(".arches i", mp).forEach((el, i) => el.style.transform = `translate(calc(-50% + ${dx * (i + 1) * 22}px), ${dy * (i + 1) * 12}px)`);
  });
}
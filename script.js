/* Shopee Supermarket — Vanilla JS (ES6+, no libraries, no build step) */
(function () {
  'use strict';

  /* ===== Countdown flash sale (zona WIB, UTC+7) — BOLEH DIUBAH =====
     null = otomatis hitung mundur ke tengah malam WIB ini.
     Atau isi tanggal dan jam WIB spesifik, misal: '2026-12-12T00:00:00'
     (ditulis tanpa offset = dianggap waktu WIB). */
  var FLASH_END = null;
  var WIB_SHIFT = 7 * 60; /* menit: UTC+7 */

  var OFF = 'https://images.openfoodfacts.org/images/products/';
  var OFB = 'https://images.openbeautyfacts.org/images/products/';

  var PRODUCTS = [
    { id: 0, name: 'Bimoli Minyak Goreng Special Pouch 2 Liter', image: OFF + '899/262/802/0152/front_id.8.400.jpg', fb: 'assets/products/product-0.jpg', price: 36900, old: 45000, sold: '10RB+', category: 'Sembako' },
    { id: 1, name: 'Indomie Mi Instan Goreng Original 85g Isi 5', image: 'assets/products/product-1.jpg', fb: 'assets/products/product-1.jpg', price: 14900, old: 17500, sold: '10RB+', category: 'Makanan' },
    { id: 2, name: 'Ultra Milk Susu UHT Full Cream 1 Liter', image: OFF + '899/800/901/0613/front_en.61.400.jpg', fb: 'assets/products/product-2.jpg', price: 18900, old: 24000, sold: '5RB+', category: 'Minuman' },
    { id: 3, name: 'Sania Beras Premium Pilihan 5 Kg', image: 'assets/products/product-3.jpg', fb: 'assets/products/product-3.jpg', price: 72900, old: 85000, sold: '8RB+', category: 'Sembako' },
    { id: 4, name: 'Khong Guan Biskuit Kaleng Merah 650g', image: 'assets/products/product-4.jpg', fb: 'assets/products/product-4.jpg', price: 42900, old: 55000, sold: '3RB+', category: 'Makanan' },
    { id: 5, name: 'Rinso Anti Noda + Molto Deterjen 750ml', image: 'assets/products/product-5.jpg', fb: 'assets/products/product-5.jpg', price: 21900, old: 29000, sold: '10RB+', category: 'Perawatan Rumah' },
    { id: 6, name: 'MamyPoko Pants Extra Absorb M 44', image: OFB + '890/362/200/2792/front_en.3.400.jpg', fb: 'assets/products/product-3.jpg', price: 52400, old: 61500, sold: '7RB+', category: 'Ibu & Bayi' },
    { id: 7, name: 'MamyPoko Wipes Anti Bacteria', image: OFB + '885/111/142/9035/front_en.8.400.jpg', fb: 'assets/products/product-3.jpg', price: 28800, old: 40000, sold: '9RB+', category: 'Ibu & Bayi' },
    { id: 8, name: 'Cussons Baby Soap Fresh & Nourish 60g', image: OFB + '899/810/301/2650/front_id.3.400.jpg', fb: 'assets/products/product-4.jpg', price: 9700, old: 26300, sold: '10RB+', category: 'Ibu & Bayi' },
    { id: 9, name: 'Hada Labo Tokyo Sun Lotion SPF50 200ml', image: OFB + '590/052/506/2789/front_tr.3.400.jpg', fb: 'assets/categories/category-face-care.jpg', price: 48898, old: 60368, sold: '4RB+', category: 'Perawatan Diri' },
    { id: 10, name: 'Himalaya Apricot Face Wash 100ml', image: OFB + '890/113/871/1900/front_fr.12.400.jpg', fb: 'assets/categories/category-face-care.jpg', price: 19600, old: 42609, sold: '6RB+', category: 'Perawatan Diri' },
    { id: 11, name: 'Skin Aqua UV Mild Milk 40g', image: OFB + '893/500/610/2538/front_xx.6.400.jpg', fb: 'assets/categories/category-body-lotion.jpg', price: 49120, old: 59900, sold: '3RB+', category: 'Perawatan Diri' },
    { id: 12, name: 'Filma Minyak Goreng Pouch 2L Isi 6 Pcs', image: 'assets/products/product-0.jpg', fb: 'assets/products/product-0.jpg', price: 286856, old: 311800, sold: '2RB+', category: 'Sembako' },
    { id: 13, name: 'Kobe BonCabe Level 50 Max End', image: OFF + '899/589/921/5159/front_id.11.400.jpg', fb: 'assets/products/product-1.jpg', price: 11360, old: 14564, sold: '10RB+', category: 'Makanan' },
    { id: 14, name: 'Biore Guard Antibacterial Body Foam', image: OFB + '899/272/700/3858/front_en.3.400.jpg', fb: 'assets/categories/category-body-lotion.jpg', price: 109200, old: 128500, sold: '5RB+', category: 'Perawatan Diri' },
    { id: 15, name: 'Listerine Cool Mint 250ml', image: OFB + '600/113/500/9436/front_en.3.400.jpg', fb: 'assets/categories/category-mouthwash.jpg', price: 27000, old: 30700, sold: '10RB+', category: 'Perawatan Diri' },
    { id: 16, name: 'Nutella Hazelnut Spread 200g', image: OFF + '301/762/042/2003/front_en.879.400.jpg', fb: 'assets/products/product-4.jpg', price: 36500, old: 45000, sold: '8RB+', category: 'Makanan' },
    { id: 17, name: 'Mie Sedaap Cup Soto 81g', image: OFF + '899/886/620/0837/front_fr.4.400.jpg', fb: 'assets/products/product-1.jpg', price: 10900, old: 15800, sold: '10RB+', category: 'Makanan', vip: true },
    { id: 18, name: 'Nivea Soft Moisturizing Cream 200ml', image: OFB + '400/580/889/0590/front_en.18.400.jpg', fb: 'assets/categories/category-body-lotion.jpg', price: 41760, old: 80308, sold: '5RB+', category: 'Perawatan Diri' },
    { id: 19, name: 'Nivea Soft Sensation Fraiche 75ml', image: OFB + '400/580/889/0576/front_en.26.400.jpg', fb: 'assets/categories/category-body-lotion.jpg', price: 20960, old: 30824, sold: '8RB+', category: 'Perawatan Diri' },
    { id: 20, name: 'Nivea Soft Moisturizing Cream 75ml', image: OFB + '400/590/000/8985/front_fr.22.400.jpg', fb: 'assets/categories/category-body-lotion.jpg', price: 36800, old: 54118, sold: '3RB+', category: 'Perawatan Diri' },
    { id: 21, name: 'Lifree Anti Bocor Pants L8', image: OFB + '899/318/932/2495/front_id.3.400.jpg', fb: 'assets/products/product-3.jpg', price: 103120, old: 135684, sold: '6RB+', category: 'Ibu & Bayi' }
  ];

  var FLASH_IDS = [15, 8, 16];

  var PROMOS = [
    { id: 'promo-kulit', line1: 'KULIT SEHAT', line2: 'HARGA BERSAHABAT', browse: 'Perawatan Diri', ids: [9, 10, 11] },
    { id: 'promo-tua', line1: 'PROMO TANGGAL TUA', line2: 'DISKON S.D. 50%', browse: 'Semua Produk', ids: [12, 13, 14] },
    { id: 'promo-kecil', line1: 'KEBUTUHAN SI KECIL', line2: 'DISKON S.D. 20%', browse: 'Ibu & Bayi', ids: [7, 6, 8] }
  ];

  var PROMO_PAGE_SECTIONS = [
    { strip: 'strip-pp-nivea', browse: 'Perawatan Diri', ids: [18, 19, 20] },
    { strip: 'strip-pp-unic', browse: 'Ibu & Bayi', ids: [6, 21, 7] },
    { strip: 'strip-pp-murah', browse: 'Semua Produk', ids: [17, 1, 8] }
  ];

  var CATTREE = [
    { name: 'Perawatan Diri & Kecantikan', icon: 'assets/categories/category-face-care.jpg', subs: [
      { name: 'Perawatan Wajah', img: OFB + '890/113/871/1900/front_fr.12.400.jpg', target: 'Perawatan Diri' },
      { name: 'Perawatan Tubuh', img: OFB + '899/272/700/3858/front_en.3.400.jpg', target: 'Perawatan Diri' },
      { name: 'Perawatan Tangan', img: OFB + '590/052/506/2789/front_tr.3.400.jpg', target: 'Perawatan Diri' },
      { name: 'Perawatan Kaki', img: OFB + '893/500/610/2538/front_xx.6.400.jpg', target: 'Perawatan Diri' },
      { name: 'Perawatan Pria', img: OFB + '600/113/500/9436/front_en.3.400.jpg', target: 'Perawatan Diri' },
      { name: 'Perawatan Bibir', img: OFB + '400/580/889/0576/front_en.26.400.jpg', target: 'Perawatan Diri' },
      { name: 'Kosmetik Mata', img: OFB + '400/590/000/8985/front_fr.22.400.jpg', target: 'Perawatan Diri' },
      { name: 'Kosmetik Wajah', img: OFB + '590/052/506/2789/front_tr.3.400.jpg', target: 'Perawatan Diri' },
      { name: 'Kosmetik Bibir', img: OFB + '400/580/889/0590/front_en.18.400.jpg', target: 'Perawatan Diri' },
      { name: 'Pembersih Make Up', img: OFB + '893/500/610/2538/front_xx.6.400.jpg', target: 'Perawatan Diri' },
      { name: 'Aksesoris Make Up', img: OFB + '899/272/700/3858/front_en.3.400.jpg', target: 'Perawatan Diri' },
      { name: 'Alat Pencukur Rambut', img: OFB + '600/113/500/9436/front_en.3.400.jpg', target: 'Perawatan Diri' },
      { name: 'Parfum', img: OFB + '400/580/889/0590/front_en.18.400.jpg', target: 'Perawatan Diri' }
    ] },
    { name: 'Ibu & Bayi', icon: OFB + '890/362/200/2792/front_en.3.400.jpg', subs: [
      { name: 'Popok Bayi', img: OFB + '890/362/200/2792/front_en.3.400.jpg', target: 'Ibu & Bayi' },
      { name: 'Tisu Basah Bayi', img: OFB + '885/111/142/9035/front_en.8.400.jpg', target: 'Ibu & Bayi' },
      { name: 'Sabun & Sampo Bayi', img: OFB + '899/810/301/2650/front_id.3.400.jpg', target: 'Ibu & Bayi' },
      { name: 'Susu Bayi', img: 'assets/products/product-2.jpg', target: 'Ibu & Bayi' }
    ] },
    { name: 'Makanan & Minuman', icon: 'assets/products/product-4.jpg', subs: [
      { name: 'Makanan Ringan', img: OFF + '301/762/042/2003/front_en.879.400.jpg', target: 'Makanan' },
      { name: 'Mie Instan', img: OFF + '899/886/620/0837/front_fr.4.400.jpg', target: 'Makanan' },
      { name: 'Biskuit & Wafer', img: 'assets/products/product-4.jpg', target: 'Makanan' },
      { name: 'Susu & Olahan Susu', img: OFF + '899/800/901/0613/front_en.61.400.jpg', target: 'Minuman' },
      { name: 'Minuman Segar', img: 'assets/products/product-2.jpg', target: 'Minuman' },
      { name: 'Cokelat & Selai', img: OFF + '301/762/042/2003/front_en.879.400.jpg', target: 'Makanan' }
    ] },
    { name: 'Sembako', icon: 'assets/products/product-3.jpg', subs: [
      { name: 'Beras', img: 'assets/products/product-3.jpg', target: 'Sembako' },
      { name: 'Minyak Goreng', img: 'assets/products/product-0.jpg', target: 'Sembako' },
      { name: 'Gula & Bumbu Dapur', img: OFF + '899/262/802/0152/front_id.8.400.jpg', target: 'Sembako' },
      { name: 'Tepung & Kue', img: OFF + '899/589/921/5159/front_id.11.400.jpg', target: 'Sembako' }
    ] },
    { name: 'Perawatan Rumah', icon: 'assets/categories/category-dish-soap.jpg', subs: [
      { name: 'Deterjen Pakaian', img: 'assets/products/product-5.jpg', target: 'Perawatan Rumah' },
      { name: 'Pembersih Lantai', img: 'assets/categories/category-dish-soap.jpg', target: 'Perawatan Rumah' },
      { name: 'Sabun Cuci Piring', img: 'assets/categories/category-dish-soap.jpg', target: 'Perawatan Rumah' },
      { name: 'Pewangi Ruangan', img: 'assets/categories/category-dish-soap.jpg', target: 'Perawatan Rumah' }
    ] }
  ];

  var VOUCHERS = [
    { title: 'Diskon Rp5RB', sub: 'Min. Blj Rp75RB', used: 'Terpakai 27% • s.d. 31 Des', id: 'diskon5' },
    { title: 'Diskon 4% s.d. Rp6RB', sub: 'Min. Blj Rp150RB', used: 'Terpakai 30% • s.d. 31 Des', id: 'diskon4' },
    { title: 'Gratis Ongkir', sub: 'Min. Blj Rp0', used: 'Terpakai 45% • s.d. 31 Des', id: 'ongkir' }
  ];

  var SLIDES = [
    { src: 'assets/banners/blue-supermarket-banner.jpg', alt: 'Shopee Supermarket — Gratis Ongkir Xtra, Diskon s.d. 40%' },
    { src: 'assets/banners/olay-offer.jpg', alt: 'Olay — Diskon s.d. 50%' },
    { src: 'assets/banners/downy-offer.jpg', alt: 'Downy — Diskon s.d. 50%' }
  ];

  /* ===== Infinite scroll: jumlah produk per sekali muat (boleh diubah).
     Makin kecil makin ringan, tapi makin sering loading. ===== */
  var PAGE_SIZE = 6;
  /* ===== Jeda loading antar muatan, milidetik (boleh diubah) ===== */
  var LOAD_DELAY = 700;
  /* ===== Banner promo ganti otomatis tiap X milidetik (boleh diubah).
     5000 = 5 detik. Timer diulang tiap pengguna pindah slide manual,
     dan dijeda saat kursor di atas banner (desktop). ===== */
  var BANNER_INTERVAL = 5000;

  var TABS = [
    { name: 'Rekomendasi', icon: 'i-thumb', target: 'top' },
    { name: 'Promo', icon: 'i-tag', target: 'flash' },
    { name: 'Kategori', icon: 'i-grid', target: 'promo-kulit' },
    { name: 'Semua Produk', icon: 'i-box', target: 'products' }
  ];

  var state = {
    slide: 0,
    following: false,
    activeTab: 'Rekomendasi',
    category: 'Semua Produk',
    search: '',
    query: '',
    sort: 'popular',
    cart: {},
    cartOpen: false,
    selectedId: null,
    saved: [],
    reminded: [],
    inReko: false,
    promoPage: false,
    view: 'home',
    catGroup: 0,
    page: 0,
    loading: false,
    loadToken: 0,
    sortMode: 'rel',
    priceDir: null,
    apage: 0,
    aloading: false,
    aloadToken: 0
  };

  function $(id) {
    var el = document.getElementById(id);
    if (!el) {
      /* Elemen tidak ada (mis. cache lama): pakai penampung tersembunyi
         agar satu komponen hilang tidak mematikan seluruh halaman. */
      if (window.console && console.warn) console.warn('Shopee: #' + id + ' tidak ditemukan, dilewati.');
      el = document.createElement('div');
      el.style.display = 'none';
      document.body.appendChild(el);
    }
    return el;
  }

  function money(n) { return 'Rp' + n.toLocaleString('id-ID'); }

  function discount(p) { return Math.round((1 - p.price / p.old) * 100); }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function icon(id, w, h) {
    var size = w || 24;
    var height = h || size;
    return '<svg width="' + size + '" height="' + height + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#' + id + '"/></svg>';
  }

  function imgTag(p, w, h) {
    return '<img src="' + p.image + '" data-fb="' + p.fb + '" width="' + w + '" height="' + h + '" loading="lazy" alt="' + escapeHtml(p.name) + '" onerror="this.onerror=null;this.src=this.getAttribute(\'data-fb\')">';
  }

  function cartCount() {
    var total = 0;
    for (var k in state.cart) { if (Object.prototype.hasOwnProperty.call(state.cart, k)) total += state.cart[k]; }
    return total;
  }

  function filteredProducts() {
    var q = state.query.toLowerCase();
    var list = PRODUCTS.filter(function (p) {
      var byCat = state.category === 'Semua Produk' || p.category === state.category;
      return byCat && p.name.toLowerCase().indexOf(q) !== -1;
    });
    list.sort(function (a, b) {
      if (state.sort === 'low') return a.price - b.price;
      if (state.sort === 'high') return b.price - a.price;
      if (state.sort === 'sold') return soldNum(b.sold) - soldNum(a.sold);
      if (state.sort === 'new') return b.id - a.id;
      return a.id - b.id;
    });
    return list;
  }

  function productById(id) {
    for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].id === id) return PRODUCTS[i]; }
    return null;
  }

  /* ---------- renders ---------- */

  function renderBanner() {
    var img = $('bannerImg');
    img.src = SLIDES[state.slide].src;
    img.alt = SLIDES[state.slide].alt;
    var dots = $('bannerDots');
    var html = '';
    for (var i = 0; i < 7; i++) {
      html += '<button type="button" class="btn btn-shop-ghost' + (i === state.slide ? ' dot selected' : ' dot') + '" aria-label="Promo ' + (i + 1) + '" data-dot="' + i + '"></button>';
    }
    dots.innerHTML = html;
  }

  var bannerTimer = null;
  function stopBannerAuto() {
    if (bannerTimer) { window.clearInterval(bannerTimer); bannerTimer = null; }
  }
  function startBannerAuto() {
    stopBannerAuto();
    bannerTimer = window.setInterval(function () {
      state.slide = (state.slide + 1) % SLIDES.length;
      renderBanner();
    }, BANNER_INTERVAL);
  }

  function renderFollow() {
    $('followBtn').textContent = state.following ? 'Diikuti' : 'Ikuti';
  }

  var SHEET_CATS = ['Semua Produk', 'Sembako', 'Makanan', 'Minuman', 'Perawatan Rumah', 'Perawatan Diri', 'Ibu & Bayi'];
  var SHEET_SORTS = ['popular', 'new', 'sold', 'low', 'high'];
  var sheetSel = { sort: 'popular', cat: 'Semua Produk' };

  function renderVouchers() {
    $('voucherGrid').innerHTML = VOUCHERS.map(function (v) {
      var claimed = state.saved.indexOf(v.id) !== -1;
      var btn = claimed
        ? '<button type="button" class="btn btn-shop btn-sm" disabled>' + icon('i-check', 14, 14) + '</button>'
        : '<button type="button" class="btn btn-shop btn-sm" data-claim="' + v.id + '">Klaim</button>';
      return '<div class="voucher"><div class="voucher-stamp">' + icon('i-trolley') + '<span class="stamp-name">Shopee Supermarket</span></div>' +
        '<div class="voucher-info"><strong>' + escapeHtml(v.title) + '</strong><small>' + escapeHtml(v.sub) + '</small>' +
        '<span class="voucher-tag">Produk Tertentu</span><div class="voucher-used"><span>' + escapeHtml(v.used) + '</span><span class="voucher-sk">S&amp;K</span></div></div>' + btn + '</div>';
    }).join('');
  }

  function renderFlash() {
    $('flashStrip').innerHTML = FLASH_IDS.map(function (id) {
      var p = productById(id);
      var reminded = state.reminded.indexOf(id) !== -1;
      return '<div class="flash-card" data-product="' + p.id + '">' +
        '<span class="flash-ribbon">Supermarket</span>' +
        '<div class="fstage">' + imgTag(p, 300, 300) + '</div>' +
        '<del>' + money(p.old) + '</del>' +
        '<strong>' + money(p.price) + '</strong>' +
        '<button type="button" class="remind-btn' + (reminded ? ' reminded' : '') + '" data-remind="' + p.id + '">' + (reminded ? '✓ Diingatkan' : 'Ingatkan Saya') + '</button></div>';
    }).join('');
  }

  function promoCard(p, xtra) {
    var badge = p.old > p.price ? '<span class="discount-badge">-' + discount(p) + '%</span>' : '';
    var xtraTag = xtra ? '<span class="xtra-badge">PROMO<br>XTRA</span>' : '';
    return '<div class="promo-card" data-product="' + p.id + '">' + badge +
      '<div class="pstage">' + imgTag(p, 300, 300) + xtraTag + '</div>' +
      '<div class="promo-name"><span class="mini-tag">Supermarket</span><span class="promo-title">' + escapeHtml(p.name) + '</span></div>' +
      '<div class="promo-foot"><strong>' + money(p.price) + '</strong>' +
      '<span class="mini-cart" role="button" tabindex="0" aria-label="Tambah ' + escapeHtml(p.name) + ' ke keranjang" data-addcard="' + p.id + '">' + icon('i-cart', 16, 16) + '</span></div></div>';
  }

  function renderPromos() {
    PROMOS.forEach(function (s) {
      var strip = $('strip-' + s.id);
      if (!strip || !strip.isConnected) return;
      strip.innerHTML = s.ids.map(function (id) { return promoCard(productById(id), false); }).join('');
    });
  }

  function renderPromoPage() {
    PROMO_PAGE_SECTIONS.forEach(function (s) {
      var strip = $(s.strip);
      if (!strip || !strip.isConnected) return;
      strip.innerHTML = s.ids.map(function (id) { return promoCard(productById(id), true); }).join('');
    });
  }

  function renderCatTree() {
    var rail = $('catRail');
    if (rail && rail.isConnected) {
      rail.innerHTML = CATTREE.map(function (g, i) {
        return '<button type="button" class="kat-tab' + (i === state.catGroup ? ' active' : '') + '" data-cg="' + i + '">' +
          '<img src="' + g.icon + '" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'assets/categories/category-products.jpg\'">' +
          '<span>' + escapeHtml(g.name) + '</span></button>';
      }).join('');
    }
    var panel = $('catPanel');
    if (panel && panel.isConnected) {
      panel.innerHTML = CATTREE[state.catGroup].subs.map(function (s) {
        return '<button type="button" class="kat-row" data-catgo="' + escapeHtml(s.target) + '">' +
          '<img src="' + s.img + '" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'assets/categories/category-products.jpg\'">' +
          '<span>' + escapeHtml(s.name) + '</span>' + icon('i-chev-right', 16, 16) + '</button>';
      }).join('');
    }
  }

  function rekoCard(p) {
    var badge = p.old > p.price ? '<span class="discount-badge">-' + discount(p) + '%</span>' : '';
    var vip = p.vip ? '<span class="vip-badge">VIP</span>' : '';
    return '<button type="button" class="btn btn-shop-ghost product-card" data-product="' + p.id + '">' +
      '<div class="product-image">' + badge + imgTag(p, 512, 512) + '</div>' +
      '<div class="product-content"><h3><span class="mini-tag">Supermarket</span> ' + escapeHtml(p.name) + '</h3>' +
      '<div class="price-line"><strong>' + money(p.price) + '</strong>' + vip +
      '<span class="mini-cart" role="button" tabindex="0" aria-label="Tambah ' + escapeHtml(p.name) + ' ke keranjang" data-addcard="' + p.id + '">' + icon('i-cart', 16, 16) + '</span></div></div></button>';
  }

  function chunkHtml(list, page, unique) {
    var html = '';
    var n = unique ? Math.min(PAGE_SIZE, list.length) : PAGE_SIZE;
    for (var i = 0; i < n; i++) {
      html += rekoCard(list[(page * PAGE_SIZE + i) % list.length]);
    }
    return html;
  }

  function renderProducts() {
    var list = filteredProducts();
    var title = state.query
      ? 'HASIL PENCARIAN: ' + state.query
      : (state.category === 'Semua Produk' ? 'Rekomendasi' : state.category.toUpperCase());
    $('productTitle').textContent = title;
    $('productCount').textContent = list.length + ' produk';
    var sortBtn = $('sortPopular');
    sortBtn.className = 'btn ' + (state.sort === 'popular' ? 'btn-shop' : 'btn-secondary');
    $('sortSelect').value = state.sort;
    state.page = 0;
    state.loading = false;
    state.loadToken++;
    var loadEl = $('loading');
    if (loadEl) loadEl.hidden = true;
    var grid = $('productGrid');
    var empty = $('emptyState');
    if (!list.length) {
      grid.innerHTML = '';
      grid.hidden = true;
      empty.hidden = false;
      return;
    }
    grid.hidden = false;
    empty.hidden = true;
    grid.innerHTML = chunkHtml(list, 0, true);
  }

  function appendMore() {
    var list = filteredProducts();
    if (!list.length || state.loading) return;
    state.loading = true;
    var token = state.loadToken;
    var loadEl = $('loading');
    if (loadEl) loadEl.hidden = false;
    window.setTimeout(function () {
      if (token !== state.loadToken) { state.loading = false; return; }
      state.page++;
      $('productGrid').insertAdjacentHTML('beforeend', chunkHtml(list, state.page));
      state.loading = false;
      if (loadEl) loadEl.hidden = true;
    }, LOAD_DELAY);
  }

  function soldNum(s) {
    var m = /(\d+)\s*RB/i.exec(s || '');
    return m ? parseInt(m[1], 10) * 1000 : 0;
  }

  function sortedAll() {
    var list = PRODUCTS.slice();
    if (state.sortMode === 'disc') list.sort(function (a, b) { return discount(b) - discount(a); });
    else if (state.sortMode === 'sold') list.sort(function (a, b) { return soldNum(b.sold) - soldNum(a.sold); });
    else if (state.sortMode === 'price') {
      list.sort(function (a, b) { return state.priceDir === 'asc' ? a.price - b.price : b.price - a.price; });
    }
    return list;
  }

  function renderSortTabs() {
    var tabs = $('sortTabs');
    if (!tabs || !tabs.isConnected) return;
    var btns = tabs.querySelectorAll('[data-sortmode]');
    Array.prototype.forEach.call(btns, function (b) {
      if (b.getAttribute('data-sortmode') === state.sortMode) b.classList.add('active');
      else b.classList.remove('active');
    });
    var arrow = $('priceArrow');
    if (arrow && arrow.isConnected) {
      arrow.textContent = state.sortMode !== 'price' ? '↕' : (state.priceDir === 'asc' ? '↑' : '↓');
    }
  }

  function renderAllPage() {
    var list = sortedAll();
    state.apage = 1;
    state.aloading = false;
    state.aloadToken++;
    var loadEl = $('allLoading');
    if (loadEl) loadEl.hidden = true;
    renderSortTabs();
    var grid = $('allGrid');
    if (!grid || !grid.isConnected) return;
    grid.innerHTML = chunkHtml(list, 0, true) + chunkHtml(list, 1);
  }

  function appendAll() {
    var list = sortedAll();
    if (!list.length || state.aloading) return;
    state.aloading = true;
    var token = state.aloadToken;
    var loadEl = $('allLoading');
    if (loadEl) loadEl.hidden = false;
    window.setTimeout(function () {
      if (token !== state.aloadToken) { state.aloading = false; return; }
      state.apage++;
      var grid = $('allGrid');
      if (grid && grid.isConnected) grid.insertAdjacentHTML('beforeend', chunkHtml(list, state.apage));
      state.aloading = false;
      if (loadEl) loadEl.hidden = true;
    }, LOAD_DELAY);
  }

  function renderBadges() {
    var n = cartCount();
    var d = $('desktopCartCount');
    var m = $('mobileCartCount');
    if (n > 0) { d.hidden = false; d.textContent = n; m.hidden = false; m.textContent = n; }
    else { d.hidden = true; d.textContent = ''; m.hidden = true; m.textContent = ''; }
  }

  function morphTab() {
    var superMode = state.inReko || state.view !== 'home';
    var active = superMode || state.activeTab === 'Rekomendasi';
    return '<button type="button" class="btn btn-shop-ghost bottom-tab morph' + (active ? ' active' : '') + (superMode ? ' morph-b' : '') + '" data-tab="Rekomendasi" data-target="top">' +
      '<span class="tabface face-a">' + icon('i-thumb') + '<span>Rekomendasi</span></span>' +
      '<span class="tabface face-b">' + icon('i-trolley') + '<span>Supermarket</span></span></button>';
  }

  function renderBottomNav() {
    var html = morphTab();
    html += TABS.slice(1).map(function (t) {
      var cls = state.activeTab === t.name ? 'btn btn-shop-ghost bottom-tab active' : 'btn btn-shop-ghost bottom-tab';
      return '<button type="button" class="' + cls + '" data-tab="' + escapeHtml(t.name) + '" data-target="' + t.target + '">' + icon(t.icon) + '<span>' + escapeHtml(t.name) + '</span></button>';
    }).join('');
    $('bottomNav').innerHTML = html;
  }

  function cartTotal() {
    var sum = 0;
    for (var i = 0; i < PRODUCTS.length; i++) {
      var q = state.cart[PRODUCTS[i].id] || 0;
      sum += PRODUCTS[i].price * q;
    }
    return sum;
  }

  function renderModal() {
    var backdrop = $('modalBackdrop');
    var content = $('modalContent');
    var box = $('modalBox');
    var hasSelection = state.selectedId !== null && state.selectedId !== undefined;
    if (!hasSelection && !state.cartOpen) { backdrop.hidden = true; content.innerHTML = ''; return; }
    backdrop.hidden = false;
    if (hasSelection) {
      var p = productById(state.selectedId);
      box.setAttribute('aria-label', 'Detail produk');
      content.innerHTML =
        '<img class="detail-image" src="' + p.image + '" data-fb="' + p.fb + '" alt="' + escapeHtml(p.name) + '" onerror="this.onerror=null;this.src=this.getAttribute(\'data-fb\')">' +
        '<span class="detail-label">Shopee Supermarket</span>' +
        '<h2>' + escapeHtml(p.name) + '</h2>' +
        '<del>' + money(p.old) + '</del>' +
        '<strong class="detail-price">' + money(p.price) + '</strong>' +
        '<button type="button" class="btn btn-shop" data-add="' + p.id + '">' + icon('i-cart') + ' Tambah ke Keranjang</button>';
    } else {
      var n = cartCount();
      box.setAttribute('aria-label', 'Keranjang belanja');
      var html = '<h2>Keranjang Belanja (' + n + ')</h2>';
      if (n === 0) {
        html += '<div class="empty-state">' + icon('i-cart') + '<p>Keranjangmu masih kosong</p></div>';
      } else {
        html += PRODUCTS.filter(function (p) { return (state.cart[p.id] || 0) > 0; }).map(function (p) {
          return '<div class="cart-row"><img src="' + p.image + '" data-fb="' + p.fb + '" alt="' + escapeHtml(p.name) + '" onerror="this.onerror=null;this.src=this.getAttribute(\'data-fb\')">' +
            '<div><h3>' + escapeHtml(p.name) + '</h3><strong>' + money(p.price) + '</strong>' +
            '<div class="quantity"><button type="button" class="btn btn-outline btn-icon" aria-label="Kurangi ' + escapeHtml(p.name) + '" data-dec="' + p.id + '">' + icon('i-minus') + '</button>' +
            '<span>' + (state.cart[p.id] || 0) + '</span>' +
            '<button type="button" class="btn btn-outline btn-icon" aria-label="Tambah ' + escapeHtml(p.name) + '" data-inc="' + p.id + '">' + icon('i-plus') + '</button></div></div></div>';
        }).join('');
        html += '<div class="cart-total">Total <strong>' + money(cartTotal()) + '</strong></div>';
      }
      content.innerHTML = html;
    }
  }

  function flashEndTime() {
    if (FLASH_END) {
      var s = String(FLASH_END);
      if (!/[zZ]|[+-]\d{2}:?\d{2}$/.test(s)) s += '+07:00'; /* tanpa offset = WIB */
      var t = new Date(s);
      if (!isNaN(t.getTime())) return t;
    }
    /* tengah malam WIB: geser jam dinding ke WIB, set 23:59:59, kembalikan */
    var shift = (new Date().getTimezoneOffset() + WIB_SHIFT) * 60000;
    var wib = new Date(Date.now() + shift);
    wib.setHours(23, 59, 59, 999);
    return new Date(wib.getTime() - shift);
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function tickFlash() {
    var el = $('flashTimer');
    if (!el) return;
    var ms = flashEndTime().getTime() - Date.now();
    if (ms < 0) ms = 0;
    var s = Math.floor(ms / 1000);
    el.textContent = pad2(Math.floor(s / 3600)) + ':' + pad2(Math.floor(s / 60) % 60) + ':' + pad2(s % 60);
  }

  function renderAll() {
    renderBanner();
    renderFollow();
    renderVouchers();
    renderFlash();
    renderPromos();
    renderPromoPage();
    renderCatTree();
    renderAllPage();
    renderProducts();
    renderBadges();
    renderBottomNav();
    renderModal();
    tickFlash();
  }

  function showView(name) {
    state.view = name;
    state.promoPage = (name === 'promo');
    $('homeView').hidden = name !== 'home';
    $('promoPage').hidden = name !== 'promo';
    $('kategoriPage').hidden = name !== 'kategori';
    $('semuaPage').hidden = name !== 'semua';
    document.body.classList.toggle('is-kategori', name === 'kategori');
    if (name === 'promo') {
      state.activeTab = 'Promo';
      document.title = 'Promo Supermarket | Shopee Supermarket';
    } else if (name === 'kategori') {
      state.activeTab = 'Kategori';
      document.title = 'Kategori | Shopee Supermarket';
    } else if (name === 'semua') {
      state.activeTab = 'Semua Produk';
      document.title = 'Semua Produk | Shopee Supermarket';
    } else {
      document.title = 'Shopee Supermarket | Belanja Bahan Makanan & Kebutuhan Rumah Tangga';
    }
    if (name !== 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    renderBottomNav();
  }

  /* ---------- actions ---------- */

  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth' });
  }
  function browse(c) {
    showView('home');
    state.category = c;
    state.query = '';
    state.search = '';
    $('mobileSearchInput').value = '';
    $('desktopSearchInput').value = '';
    renderProducts();
    scrollToId('products');
  }

  function quickAdd(id) {
    state.cart[id] = (state.cart[id] || 0) + 1;
    renderBadges();
  }

  /* ---------- events ---------- */

  function bind() {
    $('bannerPrev').addEventListener('click', function () {
      state.slide = (state.slide + 2) % 3;
      renderBanner();
    });
    $('bannerNext').addEventListener('click', function () {
      state.slide = (state.slide + 1) % 3;
      renderBanner();
    });
    $('bannerDots').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-dot]');
      if (!btn) return;
      state.slide = parseInt(btn.getAttribute('data-dot'), 10) % 3;
      renderBanner();
      startBannerAuto();
    });
    $('promoBanner').addEventListener('mouseenter', stopBannerAuto);
    $('promoBanner').addEventListener('mouseleave', startBannerAuto);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopBannerAuto();
      else startBannerAuto();
    });
    startBannerAuto();

    $('mobileBack').addEventListener('click', function () {
      browse('Semua Produk');
      state.activeTab = 'Rekomendasi';
      renderBottomNav();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    $('followBtn').addEventListener('click', function () {
      state.following = !state.following;
      renderFollow();
    });

    $('mobileCartBtn').addEventListener('click', function () {
      state.cartOpen = true;
      renderModal();
    });
    $('desktopCartBtn').addEventListener('click', function () {
      state.cartOpen = true;
      renderModal();
    });

    function onSearchInput(which) {
      return function (e) {
        state.search = e.target.value;
        if (which === 'mobile') $('desktopSearchInput').value = state.search;
        else $('mobileSearchInput').value = state.search;
      };
    }
    $('mobileSearchInput').addEventListener('input', onSearchInput('mobile'));
    $('desktopSearchInput').addEventListener('input', onSearchInput('desktop'));

    function submitSearch(e) {
      e.preventDefault();
      showView('home');
      state.query = state.search;
      state.category = 'Semua Produk';
      renderProducts();
      scrollToId('products');
    }
    $('mobileSearchForm').addEventListener('submit', submitSearch);
    $('desktopSearchForm').addEventListener('submit', submitSearch);

    $('filterToggle').addEventListener('click', function () {
      openSheet();
    });

    document.querySelectorAll('[data-browse]').forEach(function (el) {
      el.addEventListener('click', function () { browse(el.getAttribute('data-browse')); });
    });
    document.querySelectorAll('[data-scroll]').forEach(function (el) {
      el.addEventListener('click', function () { scrollToId(el.getAttribute('data-scroll')); });
    });
    document.querySelectorAll('[data-plink]').forEach(function (el) {
      el.addEventListener('click', function () { browse(el.getAttribute('data-plink')); });
    });

    $('voucherGrid').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-claim]');
      if (!btn) return;
      var id = btn.getAttribute('data-claim');
      if (state.saved.indexOf(id) === -1) state.saved.push(id);
      renderVouchers();
    });

    $('flashStrip').addEventListener('click', function (e) {
      var rem = e.target.closest('[data-remind]');
      if (rem) {
        var rid = parseInt(rem.getAttribute('data-remind'), 10);
        var ix = state.reminded.indexOf(rid);
        if (ix === -1) state.reminded.push(rid);
        else state.reminded.splice(ix, 1);
        renderFlash();
        return;
      }
      var card = e.target.closest('[data-product]');
      if (!card) return;
      state.selectedId = parseInt(card.getAttribute('data-product'), 10);
      renderModal();
    });

    Array.prototype.forEach.call(document.querySelectorAll('.promo-strip'), function (strip) {
      strip.addEventListener('click', function (e) {
        var add = e.target.closest('[data-addcard]');
        if (add) {
          quickAdd(parseInt(add.getAttribute('data-addcard'), 10));
          return;
        }
        var card = e.target.closest('[data-product]');
        if (!card) return;
        state.selectedId = parseInt(card.getAttribute('data-product'), 10);
        renderModal();
      });
    });

    $('productGrid').addEventListener('click', function (e) {
      var add = e.target.closest('[data-addcard]');
      if (add) {
        quickAdd(parseInt(add.getAttribute('data-addcard'), 10));
        return;
      }
      var btn = e.target.closest('[data-product]');
      if (!btn) return;
      state.selectedId = parseInt(btn.getAttribute('data-product'), 10);
      renderModal();
    });
    $('emptyState').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-browse]');
      if (!btn) return;
      browse(btn.getAttribute('data-browse'));
    });

    $('sortPopular').addEventListener('click', function () {
      state.sort = 'popular';
      renderProducts();
    });
    $('sortSelect').addEventListener('change', function (e) {
      state.sort = e.target.value;
      renderProducts();
    });

    $('bottomNav').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-tab]');
      if (!btn) return;
      var name = btn.getAttribute('data-tab');
      var target = btn.getAttribute('data-target');
      if (name === 'Promo') {
        showView('promo');
        return;
      }
      if (name === 'Kategori') {
        showView('kategori');
        return;
      }
      if (name === 'Semua Produk') {
        showView('semua');
        return;
      }
      showView('home');
      state.activeTab = name;
      renderBottomNav();
      if (target === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    });

    var toTop = $('toTop');
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    $('catRail').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cg]');
      if (!b) return;
      state.catGroup = parseInt(b.getAttribute('data-cg'), 10);
      renderCatTree();
    });
    $('catPanel').addEventListener('click', function (e) {
      var b = e.target.closest('[data-catgo]');
      if (!b) return;
      showView('home');
      browse(b.getAttribute('data-catgo'));
    });
    $('catBack').addEventListener('click', function () {
      state.activeTab = 'Rekomendasi';
      showView('home');
    });

    $('modalClose').addEventListener('click', function () {
      state.selectedId = null;
      state.cartOpen = false;
      renderModal();
    });
    $('modalBackdrop').addEventListener('click', function (e) {
      if (e.target === this) {
        state.selectedId = null;
        state.cartOpen = false;
        renderModal();
      }
    });
    $('modalContent').addEventListener('click', function (e) {
      var add = e.target.closest('[data-add]');
      if (add) {
        var p = productById(parseInt(add.getAttribute('data-add'), 10));
        state.cart[p.id] = (state.cart[p.id] || 0) + 1;
        state.selectedId = null;
        renderBadges();
        renderModal();
        return;
      }
      var inc = e.target.closest('[data-inc]');
      if (inc) {
        var id1 = parseInt(inc.getAttribute('data-inc'), 10);
        state.cart[id1] = (state.cart[id1] || 0) + 1;
        renderBadges();
        renderModal();
        return;
      }
      var dec = e.target.closest('[data-dec]');
      if (dec) {
        var id2 = parseInt(dec.getAttribute('data-dec'), 10);
        state.cart[id2] = Math.max(0, (state.cart[id2] || 0) - 1);
        renderBadges();
        renderModal();
      }
    });

    $('allGrid').addEventListener('click', function (e) {
      var add = e.target.closest('[data-addcard]');
      if (add) {
        quickAdd(parseInt(add.getAttribute('data-addcard'), 10));
        return;
      }
      var btn = e.target.closest('[data-product]');
      if (!btn) return;
      state.selectedId = parseInt(btn.getAttribute('data-product'), 10);
      renderModal();
    });

    $('sortTabs').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-sortmode]');
      if (!btn) return;
      var mode = btn.getAttribute('data-sortmode');
      if (mode === 'price') {
        state.priceDir = state.priceDir === 'desc' ? 'asc' : 'desc';
      }
      state.sortMode = mode;
      renderAllPage();
    });

    function sheetOpts() { return Array.prototype.slice.call(document.querySelectorAll('#filterSheet .filter-opt')); }
    function sheetChips() { return Array.prototype.slice.call(document.querySelectorAll('#filterSheet .filter-chip')); }
    function syncSheetUI() {
      sheetOpts().forEach(function (opt, i) {
        if (SHEET_SORTS[i] === sheetSel.sort) opt.classList.add('selected');
        else opt.classList.remove('selected');
      });
      sheetChips().forEach(function (chip) {
        if (chip.textContent.trim() === sheetSel.cat) chip.classList.add('on');
        else chip.classList.remove('on');
      });
    }
    function openSheet() {
      sheetSel.sort = state.sort;
      sheetSel.cat = state.category;
      syncSheetUI();
      $('filterSheet').hidden = false;
    }
    $('filterBtn').addEventListener('click', openSheet);
    $('filterClose').addEventListener('click', function () {
      $('filterSheet').hidden = true;
    });
    $('filterSheet').addEventListener('click', function (e) {
      if (e.target === this) $('filterSheet').hidden = true;
    });
    sheetOpts().forEach(function (opt, i) {
      opt.addEventListener('click', function () {
        sheetSel.sort = SHEET_SORTS[i];
        syncSheetUI();
      });
    });
    sheetChips().forEach(function (chip) {
      chip.addEventListener('click', function () {
        sheetSel.cat = chip.textContent.trim();
        syncSheetUI();
      });
    });
    $('filterReset').addEventListener('click', function () {
      sheetSel.sort = 'popular';
      sheetSel.cat = 'Semua Produk';
      syncSheetUI();
    });
    $('filterApply').addEventListener('click', function () {
      state.sort = sheetSel.sort;
      showView('home');
      state.category = sheetSel.cat;
      state.query = '';
      state.search = '';
      $('mobileSearchInput').value = '';
      $('desktopSearchInput').value = '';
      renderProducts();
      $('filterSheet').hidden = true;
      scrollToId('products');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        state.selectedId = null;
        state.cartOpen = false;
        renderModal();
        $('filterSheet').hidden = true;
      }
    });

    if ('IntersectionObserver' in window) {
      var recoObs = new IntersectionObserver(function (entries) {
        var vis = entries[0].isIntersecting;
        if (vis !== state.inReko) {
          state.inReko = vis;
          renderBottomNav();
        }
      }, { rootMargin: '-35% 0px -50% 0px' });
      var prodSec = $('products');
      if (prodSec) recoObs.observe(prodSec);

      var sentObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) appendMore();
      }, { rootMargin: '600px 0px' });
      var sent = $('sentinel');
      if (sent) sentObs.observe(sent);

      var sentAllObs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) appendAll();
      }, { rootMargin: '600px 0px' });
      var sentAll = $('sentinelAll');
      if (sentAll) sentAllObs.observe(sentAll);
    }

    window.setInterval(tickFlash, 1000);
  }

  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    bind();
    renderAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

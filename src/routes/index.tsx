import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Bell, ShoppingCart, Search, ChevronDown, ChevronLeft, ChevronRight, Truck, ShieldCheck, Ticket, ShoppingBag, X, Plus, Minus, MessageCircle, Facebook, Instagram, Check, MapPin, ArrowLeft, Filter, BadgeCheck, ThumbsUp, Tag, LayoutGrid, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import banner from '@/assets/blue-supermarket-banner.jpg';
import olay from '@/assets/olay-offer.jpg';
import downy from '@/assets/downy-offer.jpg';
import c0 from '@/assets/category-body-lotion.jpg';
import c1 from '@/assets/category-mouthwash.jpg';
import c2 from '@/assets/category-face-care.jpg';
import c3 from '@/assets/category-feminine-care.jpg';
import c4 from '@/assets/category-breakfast.jpg';
import c5 from '@/assets/category-dish-soap.jpg';
import p0 from '@/assets/product-0.jpg';
import p1 from '@/assets/product-1.jpg';
import p2 from '@/assets/product-2.jpg';
import p3 from '@/assets/product-3.jpg';
import p4 from '@/assets/product-4.jpg';
import p5 from '@/assets/product-5.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Shopee Supermarket | Belanja Bahan Makanan & Kebutuhan Rumah Tangga' },
    { name: 'description', content: 'Jelajahi kebutuhan harian, makanan, minuman, dan perlengkapan rumah tangga di pratinjau Shopee Supermarket.' },
    { property: 'og:title', content: 'Shopee Supermarket — Kebutuhan Harian' },
    { property: 'og:description', content: 'Pilihan produk supermarket, promo, dan kebutuhan rumah tangga dalam satu tempat.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Supermarket,
});
const products = [
  { id: 0, name: 'Bimoli Minyak Goreng Special Pouch 2 Liter', image: p0, price: 36900, old: 45000, sold: '10RB+', category: 'Sembako', discount: 18 },
  { id: 1, name: 'Indomie Mi Instan Goreng Original 85g Isi 5', image: p1, price: 14900, old: 17500, sold: '10RB+', category: 'Makanan', discount: 15 },
  { id: 2, name: 'Ultra Milk Susu UHT Full Cream 1 Liter', image: p2, price: 18900, old: 24000, sold: '5RB+', category: 'Minuman', discount: 21 },
  { id: 3, name: 'Sania Beras Premium Pilihan 5 Kg', image: p3, price: 72900, old: 85000, sold: '8RB+', category: 'Sembako', discount: 14 },
  { id: 4, name: 'Khong Guan Biskuit Kaleng Merah 650g', image: p4, price: 42900, old: 55000, sold: '3RB+', category: 'Makanan', discount: 22 },
  { id: 5, name: 'Rinso Anti Noda + Molto Deterjen 750ml', image: p5, price: 21900, old: 29000, sold: '10RB+', category: 'Perawatan Rumah', discount: 24 },
];
const categories = [
 {name:'Bahan Pokok & Bumbu Dapur', filter:'Sembako', image:p0}, {name:'Makanan Ringan',filter:'Makanan',image:p4},
 {name:'Kebersihan Rumah',filter:'Perawatan Rumah',image:c5}, {name:'Perawatan Tubuh',filter:'Perawatan Diri',image:c0},
 {name:'Minuman',filter:'Minuman',image:p2}, {name:'Makanan Instan',filter:'Makanan',image:p1},
 {name:'Perawatan Gigi & Mulut',filter:'Perawatan Diri',image:c1}, {name:'Perawatan Wajah',filter:'Perawatan Diri',image:c2},
 {name:'Produk Kewanitaan',filter:'Perawatan Diri',image:c3}, {name:'Menu Sarapan',filter:'Makanan',image:c4},
 {name:'Ibu & Bayi',filter:'Ibu & Bayi',image:p2}, {name:'Kebutuhan Hewan',filter:'Kebutuhan Hewan',image:p3},
];
const money = (n: number) => `Rp${n.toLocaleString('id-ID')}`;
type Product = typeof products[number];
function Supermarket() {
  const [slide, setSlide] = useState(0);
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('Rekomendasi');
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState('Semua Produk');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('popular');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [notice, setNotice] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const filtered = products.filter(p => (category === 'Semua Produk' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())).sort((a,b) => sort === 'low' ? a.price-b.price : sort === 'high' ? b.price-a.price : a.id-b.id);
  function add(p: Product) { setCart(c => ({ ...c, [p.id]: (c[p.id] || 0) + 1 })); setSelected(null); setNotice(`${p.name} ditambahkan ke keranjang demo.`); }
  function change(id: number, delta: number) { setCart(c => ({...c, [id]: Math.max(0,(c[id] || 0) + delta)})); }
  function browse(c: string) { setCategory(c); setQuery(''); setSearch(''); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }
  return <div className="shop-page">
    <header className="mobile-shop-header"><div className="mobile-title-row"><Button variant="shopGhost" size="icon" aria-label="Kembali ke rekomendasi" onClick={() => {browse('Semua Produk');setActiveTab('Rekomendasi');window.scrollTo({top:0,behavior:'smooth'});}}><ArrowLeft/></Button><div className="mobile-store-name">Shopee Supermarket</div><Button variant="shopGhost" className="follow-button" onClick={() => setFollowing(!following)}>{following ? 'Diikuti' : 'Ikuti'}</Button><Button variant="shopGhost" size="icon" className="mobile-cart" aria-label="Buka keranjang mobile" onClick={() => setCartOpen(true)}><ShoppingCart/>{count>0 && <b>{count}</b>}</Button></div><div className="mobile-search-row"><form onSubmit={e => {e.preventDefault();setQuery(search);setCategory('Semua Produk');document.getElementById('products')?.scrollIntoView({behavior:'smooth'});}}><Button variant="shopGhost" type="submit" size="icon" aria-label="Cari produk mobile"><Search/></Button><input aria-label="Cari di Shopee Supermarket" placeholder="Cari di Shopee Supermarket" value={search} onChange={e => setSearch(e.target.value)}/></form><Button variant="shopGhost" size="icon" aria-label="Filter kategori" onClick={() => setFilterOpen(!filterOpen)}><Filter/></Button></div>{filterOpen && <div className="mobile-category-filter">{['Semua Produk','Sembako','Makanan','Minuman','Perawatan Rumah','Perawatan Diri'].map(c => <Button variant={category===c ? 'shop' : 'secondary'} key={c} onClick={() => {browse(c);setFilterOpen(false);}}>{c}</Button>)}</div>}</header>
    <header className="shop-header">
      <div className="shop-container topbar"><div className="topbar-left"><span>Seller Centre</span><i/><span>Mulai Berjualan</span><i/><span>Download</span><i/><span>Ikuti kami di</span><Facebook size={15}/><Instagram size={16}/></div><div className="topbar-right"><Button variant="shopGhost" onClick={() => setNotice('Belum ada notifikasi dalam pratinjau ini.')}><Bell/>Notifikasi</Button><Button variant="shopGhost" onClick={() => setNotice('Ini adalah pratinjau independen, bukan situs resmi Shopee.')}><ShieldCheck/>Bantuan</Button><span>Bahasa Indonesia <ChevronDown size={12}/></span><Button variant="shopGhost" onClick={() => setNotice('Pendaftaran dan login tidak tersedia dalam pratinjau ini.')}>Daftar</Button><i/><Button variant="shopGhost" onClick={() => setNotice('Login tidak tersedia dalam pratinjau ini.')}>Log In</Button></div></div>
      <div className="shop-container main-header"><a href="/" className="shopee-logo"><ShoppingBag/><span>Shopee</span></a><div className="search-area"><form onSubmit={e => {e.preventDefault();setQuery(search);setCategory('Semua Produk');document.getElementById('products')?.scrollIntoView({behavior:'smooth'});}}><input aria-label="Cari produk" placeholder="Cari di Shopee Supermarket" value={search} onChange={e => setSearch(e.target.value)}/><Button variant="shop" type="submit" aria-label="Cari"><Search/></Button></form><div className="search-suggestions">Minyak Goreng <span>Beras 5kg</span><span>Susu UHT</span><span>Indomie</span><span>Deterjen</span><span>Kebutuhan Harian</span></div></div><Button variant="shopGhost" className="cart-button" aria-label="Buka keranjang" onClick={() => setCartOpen(true)}><ShoppingCart/>{count > 0 && <b>{count}</b>}</Button></div>
    </header>
    <div className="supermarket-nav"><div className="shop-container supermarket-nav-inner"><a href="/" className="supermarket-logo"><ShoppingBag/><div><strong>Shopee</strong><b>SUPERMARKET</b></div></a><nav><Button variant="shopGhost" className={category === 'Semua Produk' ? 'nav-active' : ''} onClick={() => browse('Semua Produk')}>Beranda</Button><Button variant="shopGhost" onClick={() => browse('Semua Produk')}>Semua Produk</Button><Button variant="shopGhost" onClick={() => document.getElementById('vouchers')?.scrollIntoView({behavior:'smooth'})}>Voucher & Promo</Button></nav><span className="official"><ShieldCheck size={18}/> 100% Produk Original</span></div></div>
    <main className="shop-container shop-main">
      <section className="promo-banner" aria-label="Promo supermarket"><h1 className="sr-only">Shopee Supermarket</h1><img src={slide === 0 ? banner : slide === 1 ? olay : downy} width={1536} height={640} alt={slide === 0 ? 'Shopee Supermarket — Gratis Ongkir Xtra, Diskon s.d. 40%' : slide === 1 ? 'Olay — Diskon s.d. 50%' : 'Downy — Diskon s.d. 50%'}/><Button variant="shopGhost" className="banner-arrow prev" aria-label="Promo sebelumnya" onClick={() => setSlide((slide+2)%3)}><ChevronLeft/></Button><Button variant="shopGhost" className="banner-arrow next" aria-label="Promo berikutnya" onClick={() => setSlide((slide+1)%3)}><ChevronRight/></Button><div className="banner-dots">{Array.from({length:7},(_,i) => <Button key={i} variant="shopGhost" className={i === slide ? 'dot selected' : 'dot'} aria-label={`Promo ${i+1}`} onClick={() => setSlide(i%3)}/>)}</div></section>
      <section className="benefits"><div><BadgeCheck/><span>100% Ori</span></div><div><ShieldCheck/><span>Dikelola Shopee</span></div><div><ShoppingBag/><span>700+ Brands</span></div></section>
      <section className="category-section" id="categories"><h2>BELANJA BERDASARKAN KATEGORI</h2><div className="category-grid">{categories.map(c => <Button variant="shopGhost" key={c.name} className={`category-button ${category===c.filter ? 'category-selected' : ''}`} onClick={() => browse(c.filter)}><span className="category-icon"><img src={c.image} width={64} height={64} alt=""/></span><span>{c.name}</span></Button>)}</div></section>
      <section className="brand-offers" id="promos" aria-label="Promo merek"><Button variant="shopGhost" aria-label="Promo Olay" onClick={() => browse('Perawatan Diri')}><img src={olay} width={1072} height={624} alt="Olay Diskon s.d. 50%" loading="lazy"/></Button><Button variant="shopGhost" aria-label="Promo Downy" onClick={() => browse('Perawatan Rumah')}><img src={downy} width={1072} height={624} alt="Downy Diskon s.d. 50%" loading="lazy"/></Button></section>
      <section id="vouchers" className="vouchers"><h2>VOUCHER</h2><div className="voucher-grid">{[{title:'Diskon Rp5RB',sub:'Min. Blj Rp75RB',id:'diskon5'},{title:'Diskon Rp10RB',sub:'Min. Blj Rp100RB',id:'diskon10'},{title:'Gratis Ongkir',sub:'Min. Blj Rp0',id:'ongkir'}].map(v => <div className="voucher" key={v.id}><div className="voucher-stamp"><ShoppingCart/><b>S</b></div><div className="voucher-info"><strong>{v.title}</strong><small>{v.sub}</small><span>Produk Tertentu</span></div><Button variant="shop" size="sm" disabled={saved.includes(v.id)} onClick={() => {setSaved([...saved,v.id]);setNotice('Voucher demo berhasil diklaim.');}}>{saved.includes(v.id) ? <Check/> : 'Klaim'}</Button></div>)}</div></section>
      <section className="flash-section"><div className="section-heading"><div><h2 className="flash-title">FLASH <span>ϟ</span> SALE</h2><span className="flash-note">Pilihan harga hemat</span></div><Button variant="shopGhost" onClick={() => browse('Semua Produk')}>Lihat Semua <ChevronRight/></Button></div><div className="flash-grid">{products.map(p => <Button variant="shopGhost" className="flash-product" key={p.id} onClick={() => setSelected(p)}><span className="discount-badge">-{p.discount}%</span><img src={p.image} width={512} height={512} loading="lazy" alt={p.name}/><strong>{money(p.price)}</strong><div className="sale-progress">TERJUAL {p.sold}</div></Button>)}</div></section>
      <section className="product-section" id="products"><div className="section-heading"><h2>{query ? `HASIL PENCARIAN: ${query}` : category === 'Semua Produk' ? 'REKOMENDASI UNTUKMU' : category.toUpperCase()}</h2><span>Produk pilihan Shopee Supermarket</span></div><div className="product-filters"><span>Urutkan</span><Button variant={sort==='popular' ? 'shop' : 'secondary'} onClick={() => setSort('popular')}>Populer</Button><select aria-label="Urutkan harga" value={sort} onChange={e => setSort(e.target.value)}><option value="popular">Harga</option><option value="low">Harga: Rendah ke Tinggi</option><option value="high">Harga: Tinggi ke Rendah</option></select><span className="product-count">{filtered.length} produk</span></div>{filtered.length ? <div className="product-grid">{filtered.map(p => <Button variant="shopGhost" className="product-card" key={p.id} onClick={() => setSelected(p)}><div className="product-image"><span className="mall-badge">Mall</span><span className="discount-badge">-{p.discount}%</span><img src={p.image} width={512} height={512} loading="lazy" alt={p.name}/></div><div className="product-content"><h3>{p.name}</h3><span className="product-tag">Harga Terbaik</span><del>{money(p.old)}</del><div className="price-line"><strong>{money(p.price)}</strong><small>Terjual {p.sold}</small></div><span className="location"><MapPin size={11}/> Jakarta</span></div></Button>)}</div> : <div className="empty-state"><Search/><h3>Tidak ada produk yang ditemukan</h3><Button variant="shop" onClick={() => browse('Semua Produk')}>Lihat semua produk</Button></div>}</section>
      <div className="more-row"><Button variant="outline" onClick={() => {browse('Semua Produk');setNotice('Semua produk contoh sudah ditampilkan.');}}>Lihat Semua Produk <ChevronRight/></Button></div>
    </main>
    <footer className="shop-footer"><div className="shop-container"><h2>Shopee Supermarket — Belanja Kebutuhan Sehari-hari</h2><p>Temukan pilihan bahan makanan, minuman, dan kebutuhan rumah tangga dalam satu tempat.</p><div className="footer-columns"><div><h3>LAYANAN PELANGGAN</h3><span>Pusat Bantuan</span><span>Metode Pembayaran</span><span>Pengiriman</span></div><div><h3>JELAJAHI SHOPEE</h3><span>Tentang Kami</span><span>Shopee Supermarket</span><span>Kebijakan Privasi</span></div><div><h3>KATEGORI PILIHAN</h3><span>Makanan & Minuman</span><span>Kebutuhan Rumah Tangga</span><span>Perawatan Diri</span></div><div><h3>IKUTI KAMI</h3><span><Facebook size={14}/> Facebook</span><span><Instagram size={14}/> Instagram</span></div></div><div className="footer-bottom"><span>Pratinjau independen · Tidak berafiliasi dengan Shopee</span><span>Indonesia</span></div></div></footer>
    <nav className="mobile-bottom-nav" aria-label="Navigasi supermarket">{[{name:'Rekomendasi',icon:ThumbsUp,target:'top'},{name:'Promo',icon:Tag,target:'promos'},{name:'Kategori',icon:LayoutGrid,target:'categories'},{name:'Semua Produk',icon:Box,target:'products'}].map(t => <Button variant="shopGhost" key={t.name} className={activeTab===t.name ? 'bottom-tab active' : 'bottom-tab'} onClick={() => {setActiveTab(t.name);if(t.target==='top') window.scrollTo({top:0,behavior:'smooth'});else {if(t.target==='products'){setCategory('Semua Produk');setQuery('');setSearch('');}document.getElementById(t.target)?.scrollIntoView({behavior:'smooth'});}}}><t.icon/><span>{t.name}</span></Button>)}</nav>
    <Button variant="shop" className="chat-button" onClick={() => setNotice('Chat layanan pelanggan tidak tersedia dalam pratinjau ini.')}><MessageCircle/> Chat</Button>
    {notice && <div className="shop-notice" role="status"><Check size={18}/><span>{notice}</span><Button variant="shopGhost" size="icon" aria-label="Tutup pemberitahuan" onClick={() => setNotice('')}><X/></Button></div>}
    {(selected || cartOpen) && <div className="modal-backdrop" onClick={() => {setSelected(null);setCartOpen(false);}}><section className="shop-modal" role="dialog" aria-modal="true" aria-label={selected ? 'Detail produk' : 'Keranjang demo'} onClick={e => e.stopPropagation()}><Button variant="shopGhost" className="modal-close" size="icon" aria-label="Tutup" onClick={() => {setSelected(null);setCartOpen(false);}}><X/></Button>{selected ? <><img className="detail-image" src={selected.image} alt={selected.name}/><span className="detail-label">Shopee Supermarket · Produk contoh</span><h2>{selected.name}</h2><del>{money(selected.old)}</del><strong className="detail-price">{money(selected.price)}</strong><p>Gambar dan harga merupakan contoh untuk pratinjau. Tidak tersedia pembelian nyata.</p><Button variant="shop" onClick={() => add(selected)}><ShoppingCart/> Tambah ke Keranjang Demo</Button></> : <><h2>Keranjang Demo ({count})</h2>{count===0 ? <div className="empty-state"><ShoppingCart/><p>Keranjangmu masih kosong</p></div> : <>{products.filter(p => (cart[p.id] || 0)>0).map(p => <div className="cart-row" key={p.id}><img src={p.image} alt={p.name}/><div><h3>{p.name}</h3><strong>{money(p.price)}</strong><div className="quantity"><Button variant="outline" size="icon" aria-label={`Kurangi ${p.name}`} onClick={() => change(p.id,-1)}><Minus/></Button><span>{cart[p.id]}</span><Button variant="outline" size="icon" aria-label={`Tambah ${p.name}`} onClick={() => change(p.id,1)}><Plus/></Button></div></div></div>)}<div className="cart-total">Total <strong>{money(products.reduce((sum,p) => sum+p.price*(cart[p.id]||0),0))}</strong></div><p>Keranjang ini hanya untuk pratinjau. Pembayaran tidak tersedia.</p></>}</>}</section></div>}
  </div>;
}

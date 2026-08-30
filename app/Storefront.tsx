"use client";

/* eslint-disable @next/next/no-img-element -- Product imagery is intentionally preserved from the existing Shopify CDN. */

import { useMemo, useState } from "react";

type Product = {
  id: string;
  vendor: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  group: "Pool equipment" | "Legacy clearance";
  badge?: string;
  available: boolean;
  stock?: number;
  description?: string;
  features?: string[];
};

const products: Product[] = [
  {
    id: "523735-ec",
    vendor: "Pentair",
    title: "Pentair 523735-EC IntelliChlor Plus40 IC40+ Replacement Salt Cell – 40,000 Gallons",
    price: 1289,
    image: "https://www.nov8tech.com/cdn/shop/files/1_a30ab795-be69-429b-a53f-5713a9eadc8d.jpg?v=1756550532&width=900",
    group: "Pool equipment",
    badge: "Featured",
    available: true,
    stock: 12,
    description:
      "The Pentair IntelliChlor Plus40 IC40+ Salt Cell delivers reliable, crystal-clear water for pools up to 40,000 gallons by converting ordinary table salt into chlorine. Designed as a direct replacement cell, it provides powerful sanitization with simple installation, giving you consistent water clarity and comfort while reducing the need for traditional chlorine handling.",
    features: [
      "Suitable for pools up to 40,000 gallons",
      "Produces chlorine from common salt",
      "Direct replacement for IntelliChlor IC40+ salt cells",
      "Built-in status indicators display cell life, chlorine output and salt levels",
      "Self-cleaning design",
    ],
  },
  {
    id: "348190",
    vendor: "Pentair",
    title: "Pentair SuperFlo 348190 High Performance Pump – 1 HP EC",
    price: 699,
    image: "https://www.nov8tech.com/cdn/shop/files/1_b543125a-08d9-403e-a8f2-51373021626f.jpg?v=1756550428&width=900",
    group: "Pool equipment",
    badge: "Popular",
    available: true,
  },
  {
    id: "ec-160340",
    vendor: "Pentair",
    title: "Pentair EC-160340 Clean & Clear Plus 320 sq. ft. Cartridge Pool Filter - Limited Warranty",
    price: 1349,
    image: "https://www.nov8tech.com/cdn/shop/files/5_e0aee9cc-5837-44aa-b88e-3a267c68857c.jpg?v=1747428109&width=900",
    group: "Pool equipment",
    available: true,
  },
  {
    id: "ec-011057",
    vendor: "Pentair",
    title: "Pentair EC-011057 - IntelliFlo VS+SVRS Variable Speed Pool Pump 3HP",
    price: 2519,
    image: "https://www.nov8tech.com/cdn/shop/files/1_d9705c65-dee8-4bc0-867e-5bc282acf507.jpg?v=1747347257&width=900",
    group: "Pool equipment",
    badge: "Sold out",
    available: false,
  },
  {
    id: "7in2-space-gray",
    vendor: "NOV8TECH",
    title: "7in2 Space Gray New USB C Hub | 7 Device Ports Adapter MacBook Air & MacBook Pro",
    price: 17.99,
    compareAt: 34.99,
    image: "https://www.nov8tech.com/cdn/shop/products/15-New7in2-ProductImage-SpaceGray.jpg?v=1668130959&width=900",
    group: "Legacy clearance",
    badge: "Sale",
    available: true,
  },
  {
    id: "kn95-multicolor",
    vendor: "NOV8TECH",
    title: "Dolce Calma KN95 Face Mask | 60 Pack Individually Wrapped | Multicolor",
    price: 29.49,
    image: "https://www.nov8tech.com/cdn/shop/products/71m8j7d7V2L.jpg?v=1642679825&width=900",
    group: "Legacy clearance",
    available: true,
  },
  {
    id: "7in2-silver",
    vendor: "NOV8TECH",
    title: "7in2 Silver New USB C Hub | 7 Devices Ports Adapter MacBook Air & MacBook Pro",
    price: 17.99,
    compareAt: 34.99,
    image: "https://www.nov8tech.com/cdn/shop/products/15-New7in2-ProductImage-Silver.jpg?v=1693547701&width=900",
    group: "Legacy clearance",
    badge: "Sale",
    available: true,
  },
  {
    id: "7in2-gold",
    vendor: "NOV8TECH",
    title: "7in2 Gold USB C Hub | 7 devices Ports adapter for MacBook Air & MacBook Pro",
    price: 37.99,
    compareAt: 49.99,
    image: "https://www.nov8tech.com/cdn/shop/products/7in2Old-LifeStyle03-Small-Gold.jpg?v=1663653102&width=900",
    group: "Legacy clearance",
    badge: "Sold out",
    available: false,
  },
];

const categoryCards = [
  { title: "Pool pumps", detail: "Variable-speed and single-speed pumps", filter: "Pool equipment", number: "01" },
  { title: "Filters", detail: "Cartridge filters and replacement systems", filter: "Pool equipment", number: "02" },
  { title: "Salt systems", detail: "Cells and water treatment", filter: "Pool equipment", number: "03" },
  { title: "Legacy clearance", detail: "Hubs and masks kept separate from the pool catalog", filter: "Legacy clearance", number: "04" },
];

const coreProducts = products.filter((product) => product.group === "Pool equipment");
const legacyProducts = products.filter((product) => product.group === "Legacy clearance");

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

function BasketIcon() {
  return (
    <svg className="basketIcon" data-icon="basket" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 9.5h15l-1.3 9H5.8l-1.3-9Z" />
      <path d="M8 9.5c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      <path d="M8.5 13v2.2M12 13v2.2M15.5 13v2.2" />
    </svg>
  );
}

export default function Storefront() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = coreProducts.filter((product) => {
      const matchesQuery = !normalized || `${product.vendor} ${product.title} ${product.id}`.toLowerCase().includes(normalized);
      return matchesQuery;
    });
    return [...result].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });
  }, [query, sort]);

  const visibleLegacyProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return legacyProducts.filter((product) =>
      !normalized || `${product.vendor} ${product.title} ${product.id}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  const jumpToCatalog = (destination = "Pool equipment") => {
    const sectionId = destination === "Legacy clearance" ? "legacy-clearance" : "catalog";
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const jumpToSearchResults = () => {
    const legacyOnlyMatch = query.trim() && visibleProducts.length === 0 && visibleLegacyProducts.length > 0;
    jumpToCatalog(legacyOnlyMatch ? "Legacy clearance" : "Pool equipment");
  };

  const addToCart = (amount = 1) => {
    setCartCount((count) => count + amount);
    setSelected(null);
    setQuantity(1);
    setCartOpen(true);
  };

  return (
    <main className="storefront">
      <div className="announcement">
        <span>Free shipping on orders over $40</span>
        <span className="announcementDetail">Support available 24/7</span>
      </div>

      <header className="siteHeader">
        <button className="iconButton mobileOnly" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <span className="menuGlyph" />
        </button>
        <button className="brand brandButton" aria-label="NOV8TECH home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="https://www.nov8tech.com/cdn/shop/files/Logo_250x@2x.png?v=1747169481" alt="NOV8TECH" />
        </button>
        <nav className="desktopNav" aria-label="Main navigation">
          <button onClick={() => jumpToCatalog()}>Shop</button>
          <button onClick={() => jumpToCatalog("Pool equipment")}>Pool equipment</button>
          <button onClick={() => jumpToCatalog("Legacy clearance")}>Legacy clearance</button>
          <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>About</button>
        </nav>
        <div className="headerActions">
          <button className="iconButton" aria-label="Focus search" onClick={() => document.getElementById("store-search")?.focus()}>⌕</button>
          <button className="cartButton" aria-label={`Cart with ${cartCount} items`} onClick={() => setCartOpen(true)}><BasketIcon /><b>{cartCount}</b></button>
        </div>
        <label className="searchBar">
          <span>Search</span>
          <input id="store-search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") jumpToSearchResults(); }} placeholder="Search products, brands or part numbers" />
          <button type="button" aria-label="Submit search" onClick={jumpToSearchResults}>⌕</button>
        </label>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">NOV8TECH / POOL EQUIPMENT</span>
          <h1>Find the right equipment. Get back to the water.</h1>
          <p>Pool pumps, filters, salt systems and replacement equipment—organized for quick, confident shopping.</p>
          <div className="heroActions">
            <button className="primaryButton" onClick={() => jumpToCatalog("Pool equipment")}>Shop pool equipment</button>
            <button className="secondaryButton" onClick={() => jumpToCatalog("Legacy clearance")}>Browse legacy clearance</button>
          </div>
          <div className="heroMeta">
            <span><b>12</b> in stock</span>
            <span>Featured: Pentair Plus40</span>
          </div>
        </div>
        <button className="heroVisual" onClick={() => setSelected(products[0])} aria-label="View Pentair IntelliChlor Plus40 product details">
          <span className="visualHalo" />
          <span className="visualLabel">FEATURED / 523735-EC</span>
          <img src={products[0].image} alt="Pentair IntelliChlor Plus40 salt cell" />
          <span className="priceTag"><span>From</span><b>$1,289</b></span>
        </button>
      </section>

      <section className="trustStrip" aria-label="Store benefits">
        <span>Free shipping over $40</span>
        <span>Free returns within 30 days</span>
        <span>Flexible payment options</span>
      </section>

      <section className="sectionShell" id="categories">
        <div className="sectionHeading">
          <div><span className="eyebrow">SHOP BY CATEGORY</span><h2>Start with what you need</h2></div>
          <button className="textLink" onClick={() => jumpToCatalog()}>View pool equipment →</button>
        </div>
        <div className="categoryGrid">
          {categoryCards.map((category) => (
            <button className="categoryCard" onClick={() => jumpToCatalog(category.filter)} key={category.title}>
              <span className="categoryNumber">{category.number}</span>
              <span><strong>{category.title}</strong><small>{category.detail}</small></span>
              <span className="roundArrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="productSection" id="catalog">
        <div className="sectionShell productSectionInner">
          <div className="sectionHeading productHeading">
            <div><span className="eyebrow">CORE STOREFRONT</span><h2>Pool equipment</h2><p>The primary catalog now stays focused on pumps, filters and pool systems.</p></div>
            <span className="resultCount">{visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}</span>
          </div>
          <div className="catalogToolbar catalogToolbarFocused">
            <span className="catalogFocusNote">Pool equipment only</span>
            <label className="sortControl">Sort
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>
          </div>
          {visibleProducts.length ? (
            <div className="productGrid">
              {visibleProducts.map((product) => (
                <article className="productCard" key={product.id}>
                  <button className="productImage" onClick={() => { setSelected(product); setQuantity(1); }} aria-label={`View ${product.title}`}>
                    {product.badge && <span className={`badge ${product.available ? "" : "sold"}`}>{product.badge}</span>}
                    <img src={product.image} alt={product.title} loading="lazy" />
                    <span className="quickView">Quick view</span>
                  </button>
                  <div className="productInfo">
                    <span className="vendor">{product.vendor} / {product.id}</span>
                    <button className="productTitle" onClick={() => { setSelected(product); setQuantity(1); }}>{product.title}</button>
                    <div className="priceRow"><b>{money(product.price)}</b>{product.compareAt && <del>{money(product.compareAt)}</del>}</div>
                    <button className="addButton" disabled={!product.available} onClick={() => addToCart()}>{product.available ? "Add to cart" : "Sold out"}</button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="emptyState"><h3>No matching pool products</h3><p>Try another product name, brand or part number.</p><button onClick={() => setQuery("")}>Clear search</button></div>
          )}
        </div>
      </section>

      <section className="openBoxSection legacySection" id="legacy-clearance">
        <div className="openBoxCopy">
          <span className="eyebrow lightEyebrow">SEPARATE FROM THE MAIN CATALOG</span>
          <h2>Legacy clearance.</h2>
          <p>USB-C hubs and masks remain available for now, but no longer compete with pool equipment in the primary shopping journey.</p>
          <span className="legacyPolicy">Limited legacy inventory / while supplies last</span>
        </div>
        <div className="legacyGrid" aria-label="Legacy clearance products">
          {visibleLegacyProducts.length ? visibleLegacyProducts.map((product) => (
            <article className="legacyCard" key={product.id}>
              <button className="legacyImage" onClick={() => { setSelected(product); setQuantity(1); }} aria-label={`View ${product.title}`}>
                {product.badge && <span className={`badge ${product.available ? "" : "sold"}`}>{product.badge}</span>}
                <img src={product.image} alt={product.title} loading="lazy" />
              </button>
              <div className="legacyInfo">
                <span className="vendor">{product.vendor} / {product.id}</span>
                <button onClick={() => { setSelected(product); setQuantity(1); }}>{product.title}</button>
                <div className="legacyPrice"><b>{money(product.price)}</b>{product.compareAt && <del>{money(product.compareAt)}</del>}</div>
              </div>
            </article>
          )) : <div className="legacyEmpty">No legacy items match this search.</div>}
        </div>
      </section>

      <section className="aboutSection" id="about">
        <div className="aboutKicker"><span>ABOUT NOV8TECH</span><b>Scottsdale, Arizona</b></div>
        <div className="aboutCopy">
          <h2>Where innovation meets everyday life.</h2>
          <p>Nov8Tech is headquartered in Scottsdale, Arizona. The company has been selling tech products since 2015.</p>
          <p>We offer pool equipment alongside a separate legacy selection of electronic products, backed by customer service via phone, email and online chat.</p>
          <a href="mailto:info@nov8tech.com">info@nov8tech.com →</a>
        </div>
        <div className="serviceStack" id="support">
          <div><span>01</span><strong>Quick service</strong><p>Immediate assistance and exceptional service for any problem.</p></div>
          <div><span>02</span><strong>Professional</strong><p>Professional support and expert advice.</p></div>
          <div><span>03</span><strong>Satisfaction</strong><p>Customer satisfaction is guaranteed.</p></div>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="footerBrand">
          <img src="https://www.nov8tech.com/cdn/shop/files/Logo_250x@2x.png?v=1747169481" alt="NOV8TECH" />
          <p>Pool equipment first, with legacy inventory kept separate and easy to find.</p>
        </div>
        <div><h3>Shop</h3><button onClick={() => jumpToCatalog("Pool equipment")}>Pool pumps & filters</button><button onClick={() => jumpToCatalog("Legacy clearance")}>Legacy clearance</button></div>
        <div><h3>Help</h3><span>Search</span><span>Cart</span><span>Account</span><a href="mailto:info@nov8tech.com">Contact</a></div>
        <div><h3>Store benefits</h3><span>Free shipping over $40</span><span>30-day returns</span><span>Online support</span><span>Flexible payments</span></div>
        <div className="footerBottom"><span>© 2026 Nov8Tech.com. All rights reserved.</span><span>Independent redesign preview — production unchanged.</span></div>
      </footer>

      <nav className="bottomNav" aria-label="Mobile navigation">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><b>⌂</b><span>Home</span></button>
        <button onClick={() => document.getElementById("store-search")?.focus()}><b>⌕</b><span>Search</span></button>
        <button onClick={() => jumpToCatalog()}><b>▦</b><span>Shop</span></button>
        <button onClick={() => setCartOpen(true)}><b className="bottomNavIcon"><BasketIcon /></b><span>Cart ({cartCount})</span></button>
      </nav>

      {menuOpen && <button className="drawerBackdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
      <aside className={`sideDrawer menuDrawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawerHeader"><img src="https://www.nov8tech.com/cdn/shop/files/Logo_250x@2x.png?v=1747169481" alt="NOV8TECH" /><button aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button></div>
        {["Pool equipment", "Legacy clearance"].map((item) => <button key={item} onClick={() => { setMenuOpen(false); jumpToCatalog(item); }}>{item}<span>→</span></button>)}
        <button onClick={() => { setMenuOpen(false); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>About NOV8TECH<span>→</span></button>
        <div className="drawerNote"><b>Free shipping</b><span>Orders over $40</span></div>
      </aside>

      {cartOpen && <button className="drawerBackdrop" aria-label="Close cart" onClick={() => setCartOpen(false)} />}
      <aside className={`sideDrawer cartDrawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="drawerHeader"><strong>Your cart</strong><button aria-label="Close cart" onClick={() => setCartOpen(false)}>×</button></div>
        <div className="cartContent">
          <span className="cartCountBig">{cartCount}</span>
          <h2>{cartCount ? "Items added to your preview cart" : "Your cart is empty"}</h2>
          <p>This redesign preview demonstrates the shopping flow without connecting to the production checkout.</p>
          <button className="primaryButton" onClick={() => { setCartOpen(false); jumpToCatalog(); }}>Continue shopping</button>
        </div>
      </aside>

      {selected && (
        <div className="modalBackdrop">
          <button className="modalDismiss" aria-label="Close product details" onClick={() => setSelected(null)} />
          <section className="productModal" role="dialog" aria-modal="true" aria-label={selected.title}>
            <button className="modalClose" aria-label="Close product details" onClick={() => setSelected(null)}>×</button>
            <div className="modalImage"><img src={selected.image} alt={selected.title} /></div>
            <div className="modalInfo">
              <span className="vendor">{selected.vendor} / SKU {selected.id}</span>
              <h2>{selected.title}</h2>
              <div className="modalPrice"><b>{money(selected.price)}</b>{selected.compareAt && <del>{money(selected.compareAt)}</del>}</div>
              <p className={`stockLine ${selected.available ? "" : "out"}`}>{selected.stock ? `${selected.stock} in stock` : selected.available ? "In stock" : "Sold out"}</p>
              {selected.description && <p className="modalDescription">{selected.description}</p>}
              {selected.features && <ul>{selected.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}
              <div className="purchaseRow">
                <div className="quantity"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}>+</button></div>
                <button className="addButton" disabled={!selected.available} onClick={() => addToCart(quantity)}>{selected.available ? "Add to cart" : "Sold out"}</button>
              </div>
              <div className="pdpTrust"><span>Free shipping over $40</span><span>Returns within 30 days</span><span>Flexible payment</span></div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

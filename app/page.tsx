"use client";
import Image from "next/image";
import Link from "next/link";
import InstallButton from "./install-button";
import { useCart } from "./cart-context";

const products = [
  { id: 1, name: "Frozen Paratha", desc: "30 pieces • Ready to cook", price: 650, tag: "BESTSELLER", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600" },
  { id: 2, name: "Shami Kabab", desc: "24 pieces • Beef • Frozen", price: 700, tag: "HOMEMADE", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600" },
  { id: 3, name: "Anda Shami Burger", desc: "1 burger • Midnight 9PM-1AM", price: 250, tag: "MIDNIGHT", img: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?q=80&w=600" },
  { id: 4, name: "Chicken Paratha Roll", desc: "1 roll • Midnight 9PM-1AM", price: 300, tag: "MIDNIGHT", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600" },
];

function ProductCard({p}:any){
  const {cart, addToCart, decQty} = useCart();
  const inCart = cart.find((c:any)=>c.id===p.id);
  return (
    <div className="product-card product-card--featured">
      <div className="product-card__image-wrap">
        <span className="product-card__tag">{p.tag}</span>
        <img src={p.img} className="product-card__image product-card__image--featured" alt={p.name} />
      </div>
      <div className="product-card__body product-card__body--featured">
        <h3 className="product-card__name product-card__name--featured">{p.name}</h3>
        <p className="product-card__description product-card__description--featured">{p.desc}</p>
        <div className="product-card__footer">
          <span className="product-card__price">Rs {p.price}</span>
          {!inCart ? (
            <button onClick={()=>addToCart(p)} className="product-add-button product-add-button--featured">
              + Add
            </button>
          ) : (
            <div className="quantity-control">
              <button onClick={()=>decQty(p.id)} className="quantity-button">-</button>
              <span className="quantity-count">{inCart.qty}</span>
              <button onClick={()=>addToCart(p)} className="quantity-button quantity-button--add">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {count} = useCart();
  return (
    <main className="app-page">
      {/* NAVBAR - Pehla wala */}
      <nav className="site-nav">
        <div className="site-nav__inner site-nav__inner--wide site-nav__inner--home">
          <div className="brand-link">
            <Image
              src="/icon-192.png"
              alt="Ghar Ka Zaiqa logo"
              width={40}
              height={40}
              className="brand-logo"
            />
            <div>
              <h1 className="brand-title brand-title--home">Ghar Ka Zaiqa</h1>
              <p className="brand-subtitle brand-subtitle--desktop">Home Kitchen | Karachi</p>
              <p className="brand-subtitle brand-subtitle--mobile">Home Kitchen | Karachi</p>
            </div>
          </div>
          <Link href="/cart" className="cart-link">
            🛒 Cart ({count})
          </Link>
        </div>
      </nav>

      <div className="site-container site-container--wide site-container--home">
        {/* HERO - Pehla wala wapas */}
        <div className="hero-card">
          <div className="hero__image-wrap">
            <img src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000" className="hero__image" alt="Hero Paratha" />
          </div>
          <div className="hero__content">
            <div className="hero__copy">
              <h2 className="hero__title">
                Homemade,<br/>Frozen &<br/>Ready to Cook
              </h2>
              <p className="hero__description">
                Freshly prepared paratha & shami kabab, frozen to lock freshness and taste. Karachi me ghar baithe order karein.
              </p>
              <div className="hero__actions">
                <Link href="/products" className="primary-link">
                  View All Products
                </Link>
                <InstallButton />
              </div>
              <div className="hero__features">
                <div><p className="hero__feature-title">100% Homemade</p><p className="hero__feature-description">No preservatives</p></div>
                <div><p className="hero__feature-title">Frozen Fresh</p><p className="hero__feature-description">Lock in flavor</p></div>
                <div><p className="hero__feature-title">Delivery in Khi</p><p className="hero__feature-description">COD Available</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS - View All wala */}
        <div className="home-products">
          <div className="section-heading">
            <h2 className="section-heading__title">Our Frozen Products</h2>
            <Link href="/products" className="section-heading__link">View All →</Link>
          </div>
          <div className="product-grid">
            {products.map(p=> <ProductCard key={p.id} p={p} />)}
          </div>
        </div>

        {/* Features Mobile */}
        <div className="mobile-features">
          <div className="mobile-feature"><p className="mobile-feature__icon">🌿</p><p className="mobile-feature__label">100% Homemade</p></div>
          <div className="mobile-feature"><p className="mobile-feature__icon">❄️</p><p className="mobile-feature__label">Frozen Fresh</p></div>
          <div className="mobile-feature"><p className="mobile-feature__icon">🚚</p><p className="mobile-feature__label">Delivery in Khi</p></div>
        </div>

        {/* WhatsApp Banner - Pehla wala */}
        <div className="whatsapp-banner">
          <p className="whatsapp-banner__text">Need help? Order directly on WhatsApp</p>
          <Link href="/cart" className="whatsapp-banner__link">
            Go to Cart ({count})
          </Link>
        </div>

        <p className="site-footer">Built with Next.js • Ghar Ka Zaiqa © 2024</p>
      </div>

      {/* Mobile Fixed Cart */}
      <div className="mobile-cart-bar">
        <Link href="/cart" className="mobile-cart-bar__link">
          View Cart - {count} Items
        </Link>
      </div>
    </main>
  );
}
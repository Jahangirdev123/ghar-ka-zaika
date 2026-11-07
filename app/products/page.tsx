"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart-context";

const allProducts = [
  { id: 1, name: "Frozen Paratha", desc: "30 pcs", price: 650, tag: "BESTSELLER", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600" },
  { id: 2, name: "Shami Kabab", desc: "24 pcs", price: 700, tag: "HOMEMADE", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600" },
  { id: 3, name: "Aloo Paratha", desc: "12 pcs", price: 600, tag: "NEW", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600" },
  { id: 4, name: "Chicken Kabab", desc: "12 pcs", price: 800, tag: "HOT", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600" },
  { id: 5, name: "Anda Burger", desc: "Midnight", price: 250, tag: "MIDNIGHT", img: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?q=80&w=600" },
  { id: 6, name: "Paratha Roll", desc: "Midnight", price: 300, tag: "MIDNIGHT", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600" },
  { id: 7, name: "Frozen Samosa", desc: "24 pcs", price: 500, tag: "BESTSELLER", img: "https://images.unsplash.com/photo-1607453998774-d5339d928d24?q=80&w=600" },
  { id: 8, name: "Chicken Nuggets", desc: "20 pcs", price: 750, tag: "KIDS", img: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600" },
];

export default function ProductsPage(){
  const {cart, addToCart, decQty, count} = useCart();
  return (
    <main className="app-page">
      <nav className="site-nav">
        <div className="site-nav__inner site-nav__inner--wide site-nav__inner--compact">
          <Link href="/" className="brand-link">
            <Image
              src="/icon-192.png"
              alt="Ghar Ka Zaiqa logo"
              width={40}
              height={40}
              className="brand-logo"
            />
            <span className="brand-title">Ghar Ka Zaiqa</span>
          </Link>
          <Link href="/cart" className="cart-link cart-link--compact">🛒 Cart ({count})</Link>
        </div>
      </nav>
      <div className="site-container site-container--wide site-container--products">
        <h1 className="page-title">All Products ({allProducts.length})</h1>
        <div className="products-grid">
          {allProducts.map(p=>{
            const inCart = cart.find((c:any)=>c.id===p.id);
            return (
              <div key={p.id} className="product-card">
                <img src={p.img} className="product-card__image" alt={p.name} />
                <div className="product-card__body">
                  <h3 className="product-card__name">{p.name}</h3>
                  <p className="product-card__description">{p.desc} - Rs {p.price}</p>
                  <div className="product-card__actions">
                  {!inCart ? (
                    <button onClick={()=>addToCart(p)} className="product-add-button product-add-button--full">+ Add</button>
                  ) : (
                    <div className="quantity-control quantity-control--spaced">
                      <button onClick={()=>decQty(p.id)} className="quantity-button quantity-button--small">-</button>
                      <span className="quantity-count">{inCart.qty}</span>
                      <button onClick={()=>addToCart(p)} className="quantity-button quantity-button--small quantity-button--add">+</button>
                    </div>
                  )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}
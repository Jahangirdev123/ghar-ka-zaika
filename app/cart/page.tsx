"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart-context";

export default function CartPage(){
  const {cart, decQty, addToCart, remove, total, clear} = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const orderWhatsApp = () => {
    if(!name || !address) return alert("Naam aur Address likho!");
    if(cart.length===0) return alert("Cart khali hai!");
    let msg = `*GHAR KA ZAIQA - NEW ORDER*%0A%0A`;
    cart.forEach((c:any,i:any)=> msg+=`${i+1}. ${c.name} x${c.qty} = Rs ${c.price*c.qty}%0A`);
    msg+=`%0A*Total: Rs ${total}*%0A%0A*Customer:*%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}`;
    const num = "923237035144"; // Replace with your WhatsApp number
    window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
    clear();
  };

  if(cart.length===0){
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
          </div>
        </nav>
        <div className="empty-cart">
          <p className="empty-cart__icon">🛒</p><p className="empty-cart__title">Cart Khali Hai</p>
          <Link href="/products" className="empty-cart-link">Products Dekho</Link>
        </div>
      </main>
    )
  }

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
          <Link href="/products" className="text-link">Continue Shopping</Link>
        </div>
      </nav>
      <div className="site-container site-container--cart cart-layout">
        <div>
          <h2 className="cart-section-title">Cart Items ({cart.length})</h2>
          {cart.map((c:any)=>(
            <div key={c.id} className="cart-item">
              <img src={c.img} className="cart-item__image" alt={c.name} />
              <div className="cart-item__details">
                <h3 className="cart-item__name">{c.name}</h3>
                <p className="cart-item__price">Rs {c.price} each</p>
                <div className="cart-item__controls">
                  <button onClick={()=>decQty(c.id)} className="quantity-button quantity-button--small">-</button>
                  <span className="quantity-count">{c.qty}</span>
                  <button onClick={()=>addToCart(c)} className="quantity-button quantity-button--small quantity-button--add">+</button>
                  <button onClick={()=>remove(c.id)} className="cart-item__remove">Remove</button>
                </div>
              </div>
              <span className="cart-item__subtotal">Rs {c.price*c.qty}</span>
            </div>
          ))}
        </div>
        <div className="delivery-card">
          <h2 className="delivery-card__title">Delivery Details</h2>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Apna Naam" className="delivery-input" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone Number" className="delivery-input" />
          <textarea value={address} onChange={e=>setAddress(e.target.value)} placeholder="Pura Address - Gali, Area" className="delivery-input delivery-input--address"></textarea>
          <div className="delivery-total"><span>Total:</span><span>Rs {total}</span></div>
          <button onClick={orderWhatsApp} className="order-button">WhatsApp pe Order Place Karo</button>
          <p className="delivery-note">Order WhatsApp pe jayega, wahan confirm hoga</p>
        </div>
      </div>
    </main>
  );
}
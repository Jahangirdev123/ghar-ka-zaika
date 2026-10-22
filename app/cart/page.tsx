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
    const num = "923001234567";
    window.open(`https://wa.me/${num}?text=${msg}`, "_blank");
    clear();
  };

  if(cart.length===0){
    return (
      <main className="min-h-screen bg-[#fafafa]">
        <nav className="bg-white border-b sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <Image
                src="/icon-192.png"
                alt="Ghar Ka Zaiqa logo"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="font-bold text-green-900">Ghar Ka Zaiqa</span>
            </Link>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-65px)]">
          <p className="text-4xl">🛒</p><p className="font-bold mt-2">Cart Khali Hai</p>
          <Link href="/products" className="mt-4 bg-green-700 text-white px-6 py-2 rounded-full">Products Dekho</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <nav className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/icon-192.png"
              alt="Ghar Ka Zaiqa logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="font-bold text-green-900">Ghar Ka Zaiqa</span>
          </Link>
          <Link href="/products" className="font-bold">Continue Shopping</Link>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto p-4 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-bold text-lg mb-3">Cart Items ({cart.length})</h2>
          {cart.map((c:any)=>(
            <div key={c.id} className="bg-white rounded-xl p-3 flex gap-3 mb-3 border">
              <img src={c.img} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-sm">{c.name}</h3>
                <p className="text-xs text-gray-500">Rs {c.price} each</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={()=>decQty(c.id)} className="w-6 h-6 border rounded-full">-</button>
                  <span className="text-sm font-bold">{c.qty}</span>
                  <button onClick={()=>addToCart(c)} className="w-6 h-6 bg-green-700 text-white rounded-full">+</button>
                  <button onClick={()=>remove(c.id)} className="ml-auto text-xs text-red-500">Remove</button>
                </div>
              </div>
              <span className="font-bold text-sm">Rs {c.price*c.qty}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-5 border h-fit">
          <h2 className="font-bold mb-4">Delivery Details</h2>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Apna Naam" className="w-full border p-3 rounded-xl mb-3 text-sm" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone Number" className="w-full border p-3 rounded-xl mb-3 text-sm" />
          <textarea value={address} onChange={e=>setAddress(e.target.value)} placeholder="Pura Address - Gali, Area" className="w-full border p-3 rounded-xl mb-4 text-sm h-20"></textarea>
          <div className="flex justify-between font-bold mb-4"><span>Total:</span><span>Rs {total}</span></div>
          <button onClick={orderWhatsApp} className="w-full bg-green-600 text-white py-4 rounded-full font-bold">WhatsApp pe Order Place Karo</button>
          <p className="text-[11px] text-gray-400 text-center mt-2">Order WhatsApp pe jayega, wahan confirm hoga</p>
        </div>
      </div>
    </main>
  );
}
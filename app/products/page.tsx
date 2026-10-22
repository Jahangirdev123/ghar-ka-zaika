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
          <Link href="/cart" className="bg-green-700 text-white px-4 py-2 rounded-full text-sm">🛒 Cart ({count})</Link>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Products ({allProducts.length})</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {allProducts.map(p=>{
            const inCart = cart.find((c:any)=>c.id===p.id);
            return (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden border">
                <img src={p.img} className="w-full h-[130px] object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-sm">{p.name}</h3>
                  <p className="text-xs text-gray-500">{p.desc} - Rs {p.price}</p>
                  <div className="mt-2">
                  {!inCart ? (
                    <button onClick={()=>addToCart(p)} className="w-full bg-green-700 text-white py-1.5 rounded-full text-xs">+ Add</button>
                  ) : (
                    <div className="flex justify-between items-center bg-green-50 rounded-full border px-2 py-1">
                      <button onClick={()=>decQty(p.id)} className="w-6 h-6 bg-white rounded-full border">-</button>
                      <span className="text-sm font-bold">{inCart.qty}</span>
                      <button onClick={()=>addToCart(p)} className="w-6 h-6 bg-green-700 text-white rounded-full">+</button>
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
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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition">
      <div className="relative">
        <span className="absolute top-3 left-3 text-[10px] bg-green-50 text-green-800 border px-2 py-1 rounded-full font-bold z-10">{p.tag}</span>
        <img src={p.img} className="w-full h-[140px] md:h-[200px] object-cover" alt={p.name} />
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-bold text-sm md:text-base text-green-900">{p.name}</h3>
        <p className="text-[11px] md:text-xs text-gray-500">{p.desc}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-green-800">Rs {p.price}</span>
          {!inCart ? (
            <button onClick={()=>addToCart(p)} className="bg-green-700 text-white px-4 py-1.5 rounded-full text-xs font-bold">+ Add</button>
          ) : (
            <div className="flex items-center gap-2 bg-green-50 rounded-full border px-1 py-1">
              <button onClick={()=>decQty(p.id)} className="w-7 h-7 bg-white rounded-full border font-bold shadow-sm">-</button>
              <span className="text-sm font-bold w-5 text-center">{inCart.qty}</span>
              <button onClick={()=>addToCart(p)} className="w-7 h-7 bg-green-700 text-white rounded-full font-bold">+</button>
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
    <main className="min-h-screen bg-[#fafafa]">
      {/* NAVBAR - Pehla wala */}
      <nav className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/icon-192.png"
              alt="Ghar Ka Zaiqa logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="font-bold text-xl text-green-900 leading-none">Ghar Ka Zaiqa</h1>
              <p className="text-xs text-gray-500 hidden md:block">Home Kitchen | Karachi</p>
              <p className="text-xs text-gray-500 md:hidden">Home Kitchen | Karachi</p>
            </div>
          </div>
          <Link href="/cart" className="bg-green-700 text-white px-5 py-2 rounded-full text-sm font-bold">
            🛒 Cart ({count})
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* HERO - Pehla wala wapas */}
        <div className="mt-4 md:mt-8 bg-white rounded-[24px] overflow-hidden shadow-sm grid md:grid-cols-2">
          <div className="h-[340px] md:h-[480px]">
            <img src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000" className="w-full h-full object-cover" alt="Hero Paratha" />
          </div>
          <div className="p-6 md:p-12 flex flex-col justify-center relative">
            <div className="bg-white md:bg-transparent shadow-xl md:shadow-none border-l-4 md:border-l-0 border-green-600 p-6 rounded-2xl md:rounded-none md:p-0 -mt-20 md:mt-0 relative z-10">
              <h2 className="text-2xl md:text-5xl font-bold text-green-900 leading-tight">
                Homemade,<br/>Frozen &<br/>Ready to Cook
              </h2>
              <p className="text-sm md:text-base text-gray-600 mt-4">
                Freshly prepared paratha & shami kabab, frozen to lock freshness and taste. Karachi me ghar baithe order karein.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/products" className="bg-green-700 text-white px-8 py-3 rounded-full font-bold text-sm md:text-base">
                  View All Products
                </Link>
                <InstallButton />
              </div>
              <div className="hidden md:grid grid-cols-3 gap-4 mt-10 pt-6 border-t">
                <div><p className="font-bold text-sm">100% Homemade</p><p className="text-xs text-gray-500">No preservatives</p></div>
                <div><p className="font-bold text-sm">Frozen Fresh</p><p className="text-xs text-gray-500">Lock in flavor</p></div>
                <div><p className="font-bold text-sm">Delivery in Khi</p><p className="text-xs text-gray-500">COD Available</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS - View All wala */}
        <div className="mt-8 md:mt-12">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl md:text-3xl font-bold text-green-900">Our Frozen Products</h2>
            <Link href="/products" className="text-green-700 text-sm font-bold">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {products.map(p=> <ProductCard key={p.id} p={p} />)}
          </div>
        </div>

        {/* Features Mobile */}
        <div className="md:hidden mt-6 bg-[#eef6ee] rounded-2xl p-4 grid grid-cols-3 divide-x text-center">
          <div><p>🌿</p><p className="font-bold text-[11px]">100% Homemade</p></div>
          <div><p>❄️</p><p className="font-bold text-[11px]">Frozen Fresh</p></div>
          <div><p>🚚</p><p className="font-bold text-[11px]">Delivery in Khi</p></div>
        </div>

        {/* WhatsApp Banner - Pehla wala */}
        <div className="mt-8 bg-white border-2 border-green-200 rounded-2xl p-4 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-medium md:text-lg">Need help? Order directly on WhatsApp</p>
          <Link href="/cart" className="w-full md:w-auto text-center bg-green-700 text-white px-8 py-3 rounded-full font-bold">
            Go to Cart ({count})
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 py-8">Built with Next.js • Ghar Ka Zaiqa © 2024</p>
      </div>

      {/* Mobile Fixed Cart */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 z-30">
        <Link href="/cart" className="block w-full text-center bg-green-600 text-white py-3.5 rounded-full font-bold text-sm">
          View Cart - {count} Items
        </Link>
      </div>
    </main>
  );
}
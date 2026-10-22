"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext<any>(null);

export function CartProvider({children}: {children:any}) {
  const [cart, setCart] = useState<any[]>([]);
  
  useEffect(()=>{
    const saved = localStorage.getItem("zaiqa-cart");
    if(saved) setCart(JSON.parse(saved));
  },[]);
  
  useEffect(()=>{
    localStorage.setItem("zaiqa-cart", JSON.stringify(cart));
  },[cart]);

  const addToCart = (p:any) => {
    const exist = cart.find((c:any)=>c.id===p.id);
    if(exist){
      setCart(cart.map((c:any)=> c.id===p.id ? {...c, qty: c.qty+1} : c));
    } else {
      setCart([...cart, {...p, qty: 1}]);
    }
  };
  const decQty = (id:any) => {
    const exist = cart.find((c:any)=>c.id===id);
    if(exist.qty===1){
      setCart(cart.filter((c:any)=>c.id!==id));
    } else {
      setCart(cart.map((c:any)=> c.id===id ? {...c, qty: c.qty-1} : c));
    }
  };
  const remove = (id:any) => setCart(cart.filter((c:any)=>c.id!==id));
  const clear = () => setCart([]);
  const total = cart.reduce((a:any,b:any)=> a + (b.price*b.qty), 0);
  const count = cart.reduce((a:any,b:any)=> a + b.qty, 0);

  return <CartContext.Provider value={{cart, addToCart, decQty, remove, clear, total, count}}>{children}</CartContext.Provider>
}
export const useCart = () => useContext(CartContext);
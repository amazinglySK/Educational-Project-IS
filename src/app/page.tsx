"use client";
import { useState } from "react";

export default function Home() {

  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount(c => c+1);
  }
  
  return (
    <div className= "flex h-screen">
      <div className="max-w-3xl mx-auto flex flex-col gap-4 justify-center items-center">
        <h1 className = "text-3xl font-bold mb-5">Count incrementer</h1>
        <span className = "text-3xl font-extrabold">{count}</span>
        <button className="btn btn-lg" onClick={incrementCount}>Click me</button>
      </div>
    </div>
   
  );
}

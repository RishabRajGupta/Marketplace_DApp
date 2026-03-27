import { useEffect,useState } from "react";
import { ethers } from "ethers";
import { MARKETPLACE_ADDRESS, marketplaceABI, TOKEN_ADDRESS, tokenABI } from "../config/contracts";
import Rating from "./Rating";

export default function ProductList() {

  const [products,setProducts] = useState([]);

  async function loadProducts(){

    const provider = new ethers.BrowserProvider(window.ethereum);

    const contract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      marketplaceABI,
      provider
    );

    const count = await contract.productCount();

    let items = [];

    for(let i=1;i<=count;i++){

      const p = await contract.products(i);

      items.push({
        id:p[0],
        name:p[1],
        price:p[2],
        image:p[3],
        seller:p[4],
        sold:p[5]
      });

    }

    setProducts(items);

  }

  async function buyProduct(product){

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const token = new ethers.Contract(
      TOKEN_ADDRESS,
      tokenABI,
      signer
    );

    const marketplace = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      marketplaceABI,
      signer
    );

    const amount = ethers.parseUnits(product.price.toString(),18);

    await token.approve(MARKETPLACE_ADDRESS,amount);

    const tx = await marketplace.buyProduct(product.id);

    await tx.wait();

    alert("Product Bought");

    loadProducts();   // 🔥 refresh products

  }

  useEffect(()=>{
    loadProducts();
  },[]);

  return (
  <div>

    <h2>Marketplace</h2>

    <div className="grid">

      {products.map(p => (

        <div key={p.id} className="card">

          <img src={p.image} className="image" alt="" />

          <h3>{p.name}</h3>

          <p>
            {p.seller.slice(0,6)}...{p.seller.slice(-4)}
          </p>

          <p><b>{p.price} MKT</b></p>

          <p className={p.sold ? "sold" : "available"}>
            {p.sold ? "Sold" : "Available"}
          </p>

          {!p.sold && (
            <button className="button" onClick={()=>buyProduct(p)}>
              Buy Now
            </button>
          )}

          <Rating seller={p.seller} />

        </div>

      ))}

    </div>

  </div>
);
}
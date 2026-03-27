import { useState } from "react";
import { ethers } from "ethers";
import { uploadToIPFS } from "../ipfs/upload";
import { MARKETPLACE_ADDRESS, marketplaceABI } from "../config/contracts";

export default function ListProduct() {

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [image,setImage] = useState(null);

  async function listProduct() {

    if(!image) {
      alert("Upload image first");
      return;
    }

    const imageURL = await uploadToIPFS(image);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      marketplaceABI,
      signer
    );

    const tx = await contract.listProduct(
      name,
      price,
      imageURL
    );

    await tx.wait();

    alert("Product Listed Successfully");

    window.location.reload();

  }

  return (
  <div>

    <h2>List Product</h2>

    <input
      className="input"
      placeholder="Product Name"
      onChange={(e)=>setName(e.target.value)}
    />

    <input
      className="input"
      placeholder="Price"
      onChange={(e)=>setPrice(e.target.value)}
    />

    <input
      type="file"
      onChange={(e)=>setImage(e.target.files[0])}
    />

    <button className="button" onClick={listProduct}>
      Upload & List
    </button>

  </div>
);
}
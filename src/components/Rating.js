import { useState } from "react";
import { ethers } from "ethers";
import { MARKETPLACE_ADDRESS, marketplaceABI } from "../config/contracts";

export default function Rating({ seller }) {

  const [loading, setLoading] = useState(false);

  async function rate(rating) {

    try {

      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      // Prevent rating yourself
      if (userAddress.toLowerCase() === seller.toLowerCase()) {
        alert("You cannot rate your own product.");
        setLoading(false);
        return;
      }

      const contract = new ethers.Contract(
        MARKETPLACE_ADDRESS,
        marketplaceABI,
        signer
      );

      const tx = await contract.rateSeller(seller, rating);

      await tx.wait();

      alert("Seller rated successfully ⭐");

    } catch (error) {

      console.error("Rating error:", error);

      if (error.reason) {
        alert(error.reason);
      } else if (error.message) {
        alert(error.message);
      } else {
        alert("Rating failed.");
      }

    }

    setLoading(false);
  }

  return (
    <div>

      <p>Rate Seller</p>

      <button disabled={loading} onClick={() => rate(5)}>⭐5</button>
      <button disabled={loading} onClick={() => rate(4)}>⭐4</button>
      <button disabled={loading} onClick={() => rate(3)}>⭐3</button>
      <button disabled={loading} onClick={() => rate(2)}>⭐2</button>
      <button disabled={loading} onClick={() => rate(1)}>⭐1</button>

      {loading && <p>Submitting rating...</p>}

    </div>
  );
}
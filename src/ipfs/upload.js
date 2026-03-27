import axios from "axios";

export async function uploadToIPFS(file) {
  try {

    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    let formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY,
      },
    });

    const cid = res.data.IpfsHash;

    return `https://gateway.pinata.cloud/ipfs/${cid}`;

  } catch (error) {
    console.error("Pinata upload error:", error);
    alert("Image upload failed. Check console.");
  }
}
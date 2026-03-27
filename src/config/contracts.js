export const MARKETPLACE_ADDRESS = "0xF7506e85E3deA72266Db58cD794dCe3d5ea0BC53";
export const TOKEN_ADDRESS = "0x2B6A634A0E0d7Fa5370B9bBc5AB42c6c1D94AA5D";

export const marketplaceABI = [
  "function listProduct(string name,uint price,string image)",
  "function buyProduct(uint productId)",
  "function productCount() view returns(uint)",
  "function products(uint) view returns(uint,string,uint,string,address,bool)",
  "function rateSeller(address seller,uint rating)"
];

export const tokenABI = [
  "function approve(address spender,uint amount)"
];
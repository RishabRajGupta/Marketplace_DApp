import { useState, useEffect } from "react";

export default function ConnectWallet() {

  const [account, setAccount] = useState(null);

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  }

  useEffect(() => {
    async function check() {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) setAccount(accounts[0]);
    }
    check();
  }, []);

  return (
    <>
      {!account ? (
        <button className="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-connected">
          🟢 {account}
          <p>Wallet Connected</p>
        </div>
      )}
    </>
  );
}
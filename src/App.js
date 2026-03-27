import "./App.css";
import ConnectWallet from "./components/ConnectWallet";
import ListProduct from "./components/ListProduct";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="container">

      <h1 className="title">Web3 Marketplace</h1>

      <div className="wallet">
        <ConnectWallet />
      </div>

      <div className="card">
        <ListProduct />
      </div>

      <br />

      <ProductList />

    </div>
  );
}

export default App;
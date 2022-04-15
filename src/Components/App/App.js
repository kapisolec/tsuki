import { WalletDispatcher } from "../../Scripts/WalletDispatcher";
import "./App.scss";
import { ReactComponent as Wallet } from "../../svgs/wallet.svg";
import { ReactComponent as UniswapLogo } from "../../svgs/Uniswap_Logo.svg";
import { ReactComponent as Dextools } from "../../svgs/dextools.svg";
import { useEffect, useState } from "react";
import Tasks from "../Tasks/Tasks";

const walletDispatcher = new WalletDispatcher();

function App() {
  const [wallet, setwallet] = useState(null);
  const [connected, setConnected] = useState(false);

  const checkIfConnected = async () => {
    if (connected) return;
    try {
      const wallet = await walletDispatcher.initialize();
      if (wallet) {
        setwallet(wallet);
        setConnected(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkIfConnected();
  }, []);

  const renderTasks = () => {
    if (connected) return <Tasks wallet={wallet} />;
  };

  return (
    <div className="app">
      {/* <img className="app-cherry left top" src={cherryBranch} alt="" />
      <img className="app-cherry right top" src={cherryBranch} alt="" /> */}
      <header className="app-header">
        <Dextools className="app-dextools" />
        <UniswapLogo className="app-uniswap" />
        <Wallet
          className="app-wallet"
          onClick={() => setwallet(checkIfConnected())}
        />
      </header>
      <section className="app-content">
        <div className="app-content-main_container">
          <div className="content-header">Tasks for today</div>
          <div className="content-tasks">{renderTasks()}</div>
        </div>
      </section>
    </div>
  );
}

export default App;

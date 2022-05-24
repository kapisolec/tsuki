import { WalletDispatcher } from "../../Scripts/WalletDispatcher";
import { FaInfo } from "react-icons/fa";
import { AiOutlineDrag } from "react-icons/ai";
import { MdLeaderboard } from "react-icons/md";
import Draggable from "react-draggable";
import { ReactComponent as Wallet } from "../../svgs/wallet.svg";
import { ReactComponent as UniswapLogo } from "../../svgs/Uniswap_Logo.svg";
import { ReactComponent as DextoolsIcon } from "../../svgs/dextools.svg";
import { ReactComponent as DexscreenerIcon } from "../../svgs/dexscreener.svg";
import { useEffect, useState, useRef } from "react";
import Tasks from "../Tasks/Tasks";
import "./App.scss";
import HtmlFrame from "../HtmlFrame/HtmlFrame";
import Dexscreener from "../HtmlFrame/Dexscreener";
import Uniswap from "../HtmlFrame/Uniswap";
import Leaderboard from "../HtmlFrame/Leaderboard";

const walletDispatcher = new WalletDispatcher();

function App() {
  const [wallet, setwallet] = useState(null);
  const [connected, setConnected] = useState(false);
  const [showFrame, setShowFrame] = useState(false);
  const [showUniswap, setShowUniswap] = useState(false);
  const [showDex, setShowDex] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const nodeRef = useRef(null);

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

  const renderHtmlFrame = () => {
    if (showFrame) {
      return (
        <HtmlFrame
          setshowFrame={setShowFrame}
          wallet={wallet}
          showFrame={showFrame}
        />
      );
    }
    return null;
  };

  const renderUniswap = () => {
    if (showUniswap) {
      return <Uniswap setshowFrame={setShowUniswap} showFrame={showUniswap} />;
    }
    return null;
  };

  const renderDextools = () => {
    if (showDex) {
      return <Dexscreener setshowFrame={setShowDex} showFrame={showDex} />;
    }
    return null;
  };

  const renderLeaderboard = () => {
    if (showLeaderboard) {
      return (
        <Leaderboard
          setshowFrame={setShowLeaderboard}
          showFrame={showLeaderboard}
        />
      );
    }
    return null;
  };

  const renderTasks = () => {
    if (connected) return <Tasks wallet={wallet} />;
    return (
      <h2 style={{ width: "95%", textAlign: "center", color: "#fff" }}>
        You need to be connected to see your tasks <br /> Click wallet icon in
        the upper right corner
      </h2>
    );
  };

  const claimRewards = () => {
    if (wallet === null)
      return alert("To claim reward you need to be connected!");
    walletDispatcher.claimRewards();
  };

  return (
    <div className="app">
      {/* <img className="app-cherry left top" src={cherryBranch} alt="" />
      <img className="app-cherry right top" src={cherryBranch} alt="" /> */}

      <header className="app-header">
        <MdLeaderboard
          className="app-leaderboard"
          size="40px"
          color="white"
          onClick={() => setShowLeaderboard(true)}
        />
        <FaInfo
          className="app-info"
          size="35px"
          color="white"
          onClick={() => setShowFrame(true)}
        />
        <DextoolsIcon className="app-dextools" />
        <DexscreenerIcon
          className="app-dexscreener"
          onClick={() => setShowDex(true)}
        />
        <UniswapLogo
          className="app-uniswap"
          onClick={() => setShowUniswap(true)}
        />
        <Wallet
          className="app-wallet"
          onClick={() => setwallet(checkIfConnected())}
        />
      </header>
      <Draggable nodeRef={nodeRef} handle=".frame-draggable">
        <section className="app-content">
          <div className="app-content-main_container">
            <header className="app-content-header">
              <div onClick={claimRewards} className="frame-claim_btn">
                Claim rewards
              </div>
              <div className="frame-frameInfo">Tasks</div>
              <AiOutlineDrag className="frame-draggable" size="35px" />
            </header>
            <div className="content-tasks">{renderTasks()}</div>
          </div>
        </section>
      </Draggable>
      {renderHtmlFrame()}
      {renderUniswap()}
      {renderDextools()}
      {renderLeaderboard()}
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable"; // The default
import { Portal } from "react-portal";
import { MdClose } from "react-icons/md";
import { AiOutlineDrag } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import "./HtmlFrame.scss";
import axios from "axios";

function HtmlFrame(props) {
  const { setshowFrame, wallet = "" } = props;
  const [tokenData, setTokenData] = useState({});
  const token = "0x517AB044bda9629E785657DbbCae95C40C8f452C";
  const nativeToken = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

  const nodeRef = useRef(null);
  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    useGrouping: true,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(wallet);
      try {
        const tradingVolume = await axios.post("https://cockper.site/rpc", {
          method: "getTradingVolume",
          params: {
            token: token,
            nativeToken,
          },
        });
        const tokenInfo = await axios.post("https://cockper.site/rpc", {
          method: "getTokenInfo",
          params: {
            token: token,
            wallet: wallet,
            nativeToken,
          },
        });

        setTokenData({ ...tradingVolume.data, ...tokenInfo.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const closeFrame = () => {
    setTimeout(() => {
      setshowFrame(false);
    }, 0);
  };

  const offset = isMobile ? { x: "-50%", y: "-40%" } : { x: "-50%", y: "-50%" };

  return (
    <Portal node={document && document.getElementById("root")}>
      <Draggable
        nodeRef={nodeRef}
        positionOffset={offset}
        handle=".frame-draggable"
      >
        <div ref={nodeRef} className="frame-container tokenInfo">
          <header className="frame-header">
            <div className="frame-frameInfo">Token info</div>
            <AiOutlineDrag className="frame-draggable" size="35px" />
            <MdClose className="frame-exit" size="35px" onClick={closeFrame} />
          </header>
          <div className="frame-content grid">
            <div className="frame-grid">
              <div className="frame-grid-el mcap">
                <span className="title">Market Cap</span>
                <span className="content">
                  {dollarUS.format(tokenData.marketCap || 0)}
                </span>
              </div>
              <div className="frame-grid-el tokenPrice">
                <span className="title">Token Price</span>
                <span className="content">
                  {"$" + Number(tokenData.pricePerToken).toFixed(4) + " USD"}
                </span>
              </div>
              <div className="frame-grid-el volume">
                <p>Volume:</p>
                <div>
                  <span className="title">1H</span>
                  <span className="content">
                    {dollarUS.format(tokenData["1h"]?.volume || 0)}
                  </span>
                </div>
                <div>
                  <span className="title">8H</span>
                  <span className="content">
                    {dollarUS.format(tokenData["8h"]?.volume || 0)}
                  </span>
                </div>
                <div>
                  <span className="title">24H</span>
                  <span className="content">
                    {dollarUS.format(tokenData["24h"]?.volume || 0)}
                  </span>
                </div>
                <div>
                  <span className="title">7D</span>
                  <span className="content">
                    {dollarUS.format(tokenData["168h"]?.volume || 0)}
                  </span>
                </div>
              </div>
              <div className="frame-grid-el liquidity">
                <span className="title">Liquidity</span>
                <span className="content">
                  {dollarUS.format(tokenData.liquidity || 0)}
                </span>
              </div>
              <div className="frame-grid-el contract">
                <span className="title">Contract</span>
                <span className="content">
                  0x517AB044bda9629E785657DbbCae95C40C8f452C
                </span>
              </div>
              <div className="frame-grid-el pair">
                <span className="title">Pair</span>
                <span className="content">
                  0x1F4e90E91e4C8b6915464EbA84F662d80c0805c9
                </span>
              </div>
              <div className="frame-grid-el portfolio">
                <span className="title">Value of your tokens:</span>
                <span className="content">
                  {dollarUS.format(tokenData.marketCap || 0)}
                </span>
              </div>
              <div className="frame-grid-el holdings">
                <span className="title">You have:</span>
                <span className="content">$300 TSUKI</span>
              </div>
              <div className="frame-grid-el tasks">
                <span className="title">Done tasks:</span>
                <span className="content">4/4</span>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </Portal>
  );
}

export default HtmlFrame;

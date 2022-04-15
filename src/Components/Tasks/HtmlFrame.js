import { useRef } from "react";
import Draggable from "react-draggable"; // The default
import { MdClose } from "react-icons/md";
import "./Task.scss";

function HtmlFrame(props) {
  const { website, setshowFrame, showFrame } = props;
  const nodeRef = useRef(null);

  const closeFrame = () => {
    setTimeout(() => {
      setshowFrame(false);
    }, 0);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      positionOffset={{ x: "-50%", y: "-50%" }}
      handle=".frame-header"
    >
      <div ref={nodeRef} className="frame-container">
        <header className="frame-header">
          <MdClose className="frame-exit" size="35px" onClick={closeFrame} />
        </header>
        <div className="frame-content">Content of the frame with html</div>
      </div>
    </Draggable>
  );
}

export default HtmlFrame;

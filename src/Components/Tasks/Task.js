import { FaShareSquare } from "react-icons/fa";
import axios from "axios";
import "./Task.scss";
import { Portal } from "react-portal";
import { useRef, useState } from "react";
import HtmlFrame from "./HtmlFrame";

const tilt = (el) => {
  function handleMove(e) {
    /* Store the x position */
    const xVal = e.layerX;
    /* Store the y position */
    const yVal = e.layerY;
    const yRotation = 10 * ((xVal - width / 2) / width);
    /* Calculate the rotation along the X-axis */
    const xRotation = -10 * ((yVal - height / 2) / height);

    /* Generate string for CSS transform property */
    const string =
      "perspective(500px) scale(1.1) rotateX(" +
      xRotation +
      "deg) rotateY(" +
      yRotation +
      "deg)";

    /* Apply the calculated transformation */
    el.style.transform = string;
  }

  const height = el.clientHeight;
  const width = el.clientWidth;

  /*
   * Add a listener for mousemove event
   * Which will trigger function 'handleMove'
   * On mousemove
   */
  el.addEventListener("mousemove", handleMove);

  /* Define function a */

  /* Add listener for mouseout event, remove the rotation */
  el.addEventListener("mouseout", function () {
    el.style.transform = "perspective(500px) scale(1) rotateX(0) rotateY(0)";
  });

  /* Add listener for mousedown event, to simulate click */
  el.addEventListener("mousedown", function () {
    el.style.transform = "perspective(500px) scale(0.9) rotateX(0) rotateY(0)";
  });

  /* Add listener for mouseup, simulate release of mouse click */
  el.addEventListener("mouseup", function () {
    el.style.transform = "perspective(500px) scale(1.1) rotateX(0) rotateY(0)";
  });
};

function Task(props) {
  const [showFrame, setshowFrame] = useState(false);
  const { name, description, website, action } = props;
  const taskContainer = useRef(null);
  console.log(showFrame);

  const renderHtmlFrame = () => {
    if (showFrame) {
      return (
        <Portal node={document && document.getElementById("root")}>
          <HtmlFrame
            website={website}
            setshowFrame={setshowFrame}
            showFrame={showFrame}
          />
        </Portal>
      );
    }
    return null;
  };

  // useEffect(() => tilt(taskContainer.current), []);
  // // tilt(taskContainer.current);
  return (
    <div
      ref={taskContainer}
      className="task-container"
      onMouseEnter={() => tilt(taskContainer.current)}
      onClick={() => setshowFrame(true)}
    >
      <div className="task-description">{description}</div>
      <div>
        <FaShareSquare
          className="task-icon"
          size="25px"
          color="#000"
          opacity={1}
          stroke="#000"
        />
      </div>
      {renderHtmlFrame()}
    </div>
  );
}

export default Task;

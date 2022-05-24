import { FaShareSquare } from "react-icons/fa";
import { MdOutlineClose, MdCheck } from "react-icons/md";
import axios from "axios";
import "./Task.scss";
import { useRef } from "react";

function Task(props) {
  const { name, description, website, action, done, wallet, getDoneTasks } =
    props;
  const taskContainer = useRef(null);

  const taskDone = async () => {
    if (done) {
      console.log("task already done");
    } else {
      console.log("should be done");
      const response = await axios.post("https://cockper.site/registerTask", {
        wallet: wallet,
        task: name,
      });
      console.log(response);
      if (response.data === true) {
        getDoneTasks();
      }
    }
  };

  const renderTask = () => {
    if (action === "tweet") {
      return (
        <a
          ref={taskContainer}
          className="task-container"
          href="https://twitter.com/intent/tweet?text=This%20is%20some%20%23crypto%20on%20%40tsukidao"
          target="_blank"
          rel="noreferrer"
          onClick={() => setTimeout(() => taskDone(), 3000)}
        >
          <div className="task-description">{description}</div>
          <div className="task-icons">
            {checkIfTaskDone()}
            <FaShareSquare
              className="task-icon"
              size="25px"
              color="white"
              stroke="#000"
            />
          </div>
        </a>
      );
    } else {
      return (
        <a
          ref={taskContainer}
          className="task-container"
          href={website}
          target="_blank"
          rel="noreferrer"
          onClick={taskDone}
        >
          <div className="task-description">{description}</div>
          <div className="task-icons">
            {checkIfTaskDone()}
            <FaShareSquare
              className="task-icon"
              size="25px"
              color="white"
              stroke="#000"
            />
          </div>
        </a>
      );
    }
  };

  const checkIfTaskDone = () => {
    if (done === true) {
      return (
        <MdCheck
          className="task-icon"
          size="25px"
          color="green"
          stroke="#000"
        />
      );
    } else {
      return (
        <MdOutlineClose
          className="task-icon"
          size="25px"
          color="red"
          stroke="#000"
        />
      );
    }
  };

  // useEffect(() => tilt(taskContainer.current), []);
  // // tilt(taskContainer.current);
  return renderTask();
}

export default Task;

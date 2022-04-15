import { WalletDispatcher } from "../../Scripts/WalletDispatcher";
import { useEffect, useState } from "react";
import tasks from "./tasks.json";
import Task from "./Task";
import "./Tasks.scss";

function Tasks(props) {
  const { wallet } = props;
  return (
    <div className="app-tasks">
      <Task {...tasks[0]} />
      <Task {...tasks[1]} />
      <Task {...tasks[2]} />
      <Task {...tasks[3]} />
    </div>
  );
}

export default Tasks;

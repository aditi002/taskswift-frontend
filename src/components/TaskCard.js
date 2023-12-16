import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { Popconfirm } from "antd";
import { useState } from "react";
import {
    FaCircleCheck,
    FaPenToSquare,
    FaRegCircleCheck,
    FaRegStar,
    FaRegTrashCan,
} from "react-icons/fa6";
import UpdateTask from "./UpdateTask";

const TaskCard = ({ task }) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(task);

  const showModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const completeHandler = async () => {
    const updatedTask = {
      status: "Complete",
    };
    await axios
      .put(`http://localhost:3000/tasks/update/${task.id}`, updatedTask)
      .then((res) => {
        toast.success(`Task Marked Complete!`);
        window.location.reload();
      })
      .catch((e) => {
        toast.error("Task Update Failed!");
      });
  };
  const incompleteHandler = async () => {
    const updatedTask = {
      status: "Incomplete",
    };
    await axios
      .put(`http://localhost:3000/tasks/update/${task.id}`, updatedTask)
      .then((res) => {
        toast.success(`Task Marked Incomplete!`);
        window.location.reload();
      })
      .catch((e) => {
        toast.error("Task Update Failed!");
      });
  };

  const importantHandler = async () => {
    const updatedTask = {
      status: "Imporatant",
    };
    await axios
      .put(`http://localhost:3000/tasks/update/${task.id}`, updatedTask)
      .then((res) => {
        toast.success(`Task Marked Important!`);
        window.location.reload();
      })
      .catch((e) => {
        toast.error("Task Update Failed!");
      });
  };

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:3000/tasks/delete/${task.id}`)
      .then((res) => {
        toast.success("Task Deleted!");
        window.location.reload();
      })
      .catch((e) => {
        toast.error("Task Deletion Failed!");
      });
  };
  return (
    <>
      <div className="task-card">
        <div className="task-details">
          <div className="task-title">{task.title}</div>
          <div className="task-desc">{task.desc}</div>
          <br></br>
          <div className="task-due">
            Due: {dayjs(task.dueDate).format("DD/MM/YYYY")}
          </div>
          <div className="task-rem">
            Reminder: {dayjs(task.reminderDate).format("DD/MM/YYYY")}
          </div>
        </div>
        <div className="task-options">
          <div className="task-option">
            {task.status === "Complete" ? (
              <FaCircleCheck
                onClick={incompleteHandler}
                style={{ color: "#6495ED" }}
              />
            ) : (
              <FaRegCircleCheck
                onClick={completeHandler}
                style={{ color: "#6495ED" }}
              />
            )}
          </div>

          <div className="task-option">
            {task.status === "Complete" ? null : (
              <FaRegStar
                onClick={importantHandler}
                style={{ color: "yellow" }}
              />
            )}
          </div>
          <div className="task-option">
            {task.status === "Complete" ? null : (
              <FaPenToSquare onClick={showModal} style={{ color: "#097969" }} />
            )}
            <UpdateTask open={modalOpen} close={closeModal} task={task} />
          </div>

          <div className="task-option">
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={deleteHandler}
              okText="Yes"
              cancelText="No"
            >
              <div>
                <FaRegTrashCan style={{ color: "#ff6666" }} />
              </div>
            </Popconfirm>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;

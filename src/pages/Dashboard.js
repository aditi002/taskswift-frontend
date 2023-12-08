import dayjs from "dayjs";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const Dashboard = ({ tasks }) => {

    return (
        <>
            <div className="header">
                <div className="page-title">
                    Today's Tasks
                </div>
            </div>
            <div>
                <div className="task-section">
                    {todayTasks.map((task) => (
                        <div>
                        <TaskCard key={task.id} task={task} />
                        </div>
                    ))}
                
                </div>
            </div>
        </>
    )
}

export default Dashboard
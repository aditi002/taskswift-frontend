import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const Completed = ({ tasks }) => {
    const [completedTasks, setCompletedTasks] = useState([])

    useEffect(() => {
        if (tasks) {
            setCompletedTasks(tasks.filter(task => {
                return task.status === 'Complete';
            }))
        }
    }, [tasks])

    return (
        <>
            <div className="header">
                <div className="page-title">
                    Completed Tasks
                </div>
            </div>
            <div>
                <div className="task-section">
                    {completedTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Completed
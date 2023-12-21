import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const Important = ({ tasks }) => {
    const [importantTasks, setImportantTasks] = useState([]);

    useEffect(() => {
        if (tasks) {
            setImportantTasks(tasks.filter(task => {
                return task.status === 'Incomplete';
            }));
        }
    }, [tasks]);

    return (
        <>
            <div className="header">
                <div className="page-title">
                    Important Tasks
                </div>
            </div>
            <div>
                <div className="task-section">
                    {importantTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Important;

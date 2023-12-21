import dayjs from "dayjs";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const Upcoming = ({ tasks }) => {
    const [upcomingTasks, setUpcomingTasks] = useState([])

    useEffect(() => {
        const today = dayjs()
        if (tasks) {
            setUpcomingTasks(tasks.filter(task => {
                const taskDate = dayjs(task.dueDate);
                return taskDate.isAfter(today, 'day') && task.status === 'Incomplete';
            }))
        }
    }, [tasks])

    return (
        <>
            <div className="header">
                <div className="page-title">
                    Upcoming Tasks
                </div>
            </div>
            <div>
                <div className="task-section">
                    {upcomingTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}

                </div>
            </div>
        </>
    )
}

export default Upcoming
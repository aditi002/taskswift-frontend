import { Progress, Space } from "antd";
import AddTask from "./AddTask";

const Rightbar = ({ token, user, tasks }) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Complete').length;
    const percentageCompleted = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="rightbar">
            <div className="form-space">
                <AddTask token={token} user={user} />
            </div>
            <div className="progress-space">
                <h3>
                    Task Progress
                </h3>
                <Space wrap>
                    <Progress type="circle" percent={percentageCompleted} />
                </Space>
                {completedTasks} out of {totalTasks} completed
            </div>
        </div>
    );
};

export default Rightbar;

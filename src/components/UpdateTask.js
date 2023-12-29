import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const UpdateTask = ({ open, close, task }) => {
    const { TextArea } = Input
    const [form] = Form.useForm();

    const initialValues = {
        title: task.title,
        desc: task.desc,
        dueDate: dayjs(task.dueDate).format("YYYY-MM-DD"),
        reminderDate: dayjs(task.reminderDate).format("YYYY-MM-DD")
    };

    const onFinish = async (values) => {
        await axios
            .put(`http://localhost:3000/tasks/update/${task.id}`, values)
            .then((res) => {
                toast.success(`Task Added!`);
                window.location.reload()
            })
            .catch((e) => {
                toast.error(`Task Addition Failed!`);
            });
    };

    return (
        <>
            <Modal title="Update Task" footer={null} open={open} onCancel={close}>
                <Form form={form} name='task-update-form' layout='vertical' initialValues={initialValues} onFinish={onFinish}>
                    <Form.Item label="Task Title" name="title">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Task Description" name="desc">
                        <TextArea rows={2} />
                    </Form.Item>
                    <Form.Item label="Due Date" name="dueDate">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Reminder Date" name="reminderDate">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                            Update Task
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateTask
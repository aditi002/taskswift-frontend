import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProfile = ({ open, close, profile }) => {
    const [form] = Form.useForm();

    const initialValues = {
        fullname: profile.fullname,
        username: profile.username,
        email: profile.email,    };

    const onFinish = async (values) => {
        await axios
            .put(`http://localhost:3000/users/profile/${profile.id}`, values)
            .then((res) => {
                toast.success(`Profile Updated!`);
                window.location.reload();
            })
            .catch((e) => {
                toast.error(`Profile Update Failed!`);
            });
    };

    return (
        <>
            <Modal title="Update Profile" footer={null} onCancel={close}>
                <Form form={form} name="profile-update-form" layout="vertical" initialValues={initialValues} onFinish={onFinish}>
                    <Form.Item label="Full Name" name="fullname">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Username" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                            Update Profile
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateProfile;

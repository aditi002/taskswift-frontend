import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import AddTask from "./AddTask";
import axios from "axios";

// Mocking axios post function
jest.mock("axios");
axios.post.mockResolvedValue({});

// Mocking toast functions
jest.mock("react-toastify", () => ({
  __esModule: true,
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe("AddTask", () => {
  test("should render the AddTask component", () => {
    render(<AddTask token="your-token" user="your-user" />);
    expect(screen.getByText("Add a task")).toBeInTheDocument();
  });

  test("should submit the form successfully", async () => {
    render(<AddTask token="your-token" user="your-user" />);
    
    fireEvent.change(screen.getByLabelText("Task Title"), { target: { value: "Test Task" } });
    fireEvent.change(screen.getByLabelText("Task Description"), { target: { value: "Test Description" } });
    fireEvent.change(screen.getByLabelText("Due Date"), { target: { value: "2023-08-15" } });
    fireEvent.change(screen.getByLabelText("Reminder Date"), { target: { value: "2023-08-14" } });
    
    fireEvent.click(screen.getByText("Add Task"));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/tasks/createTask",
        {
          title: "Test Task",
          desc: "Test Description",
          dueDate: "2023-08-15",
          reminderDate: "2023-08-14",
          user: "your-user"
        },
        expect.any(Object)
      );

      expect(toast.success).toHaveBeenCalledWith("Task Added!");
    });
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import UpdateTask from "./UpdateTask";
import axios from "axios";

// Mocking axios put function
jest.mock("axios");
axios.put.mockResolvedValue({});

// Mocking toast functions
jest.mock("react-toastify", () => ({
  __esModule: true,
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

const mockClose = jest.fn();

describe("UpdateTask", () => {
  test("should render the UpdateTask modal", () => {
    render(<UpdateTask open={true} close={mockClose} task={{}} />);
    expect(screen.getByText("Update Task")).toBeInTheDocument();
  });

  test("should submit the form successfully", async () => {
    render(<UpdateTask open={true} close={mockClose} task={{ id: "your-task-id" }} />);
    
    fireEvent.change(screen.getByLabelText("Task Title"), { target: { value: "Updated Task" } });
    fireEvent.change(screen.getByLabelText("Task Description"), { target: { value: "Updated Description" } });
    fireEvent.change(screen.getByLabelText("Due Date"), { target: { value: "2023-08-15" } });
    fireEvent.change(screen.getByLabelText("Reminder Date"), { target: { value: "2023-08-14" } });
    
    fireEvent.click(screen.getByText("Update Task"));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:3000/tasks/update/your-task-id",
        {
          title: "Updated Task",
          desc: "Updated Description",
          dueDate: "2023-08-15",
          reminderDate: "2023-08-14"
        },
        expect.any(Object)
      );

      expect(toast.success).toHaveBeenCalledWith("Task Added!");
    });
  });
});

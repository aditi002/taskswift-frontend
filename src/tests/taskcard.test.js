import { render, screen, fireEvent } from "@testing-library/react";
import { FaRegCircleCheck, FaRegStar, FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Popconfirm } from "antd";
import TaskCard from "../components/TaskCard"

describe("TaskCard", () => {
  const task = {
    id: 1,
    title: "Sample Task",
    desc: "Sample Description",
    dueDate: "2023-08-31",
    reminderDate: "2023-08-30",
    status: "Incomplete"
  };

  test("should display task details and icons", () => {
    render(<TaskCard task={task} />);

    expect(screen.getByText("Sample Task")).toBeInTheDocument();
    expect(screen.getByText("Sample Description")).toBeInTheDocument();
    expect(screen.getByText("Due: 31/08/2023")).toBeInTheDocument();
    expect(screen.getByText("Reminder: 30/08/2023")).toBeInTheDocument();
    expect(screen.getByTestId("complete-icon")).toBeInTheDocument();
    expect(screen.getByTestId("important-icon")).toBeInTheDocument();
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
  });

  test("should call appropriate handlers on icon click", () => {
    const completeHandler = jest.fn();
    const incompleteHandler = jest.fn();
    const importantHandler = jest.fn();
    const deleteHandler = jest.fn();

    render(
      <TaskCard
        task={task}
        onComplete={completeHandler}
        onIncomplete={incompleteHandler}
        onImportant={importantHandler}
        onDelete={deleteHandler}
      />
    );

    fireEvent.click(screen.getByTestId("complete-icon"));
    expect(incompleteHandler).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("important-icon"));
    expect(importantHandler).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("edit-icon"));
    expect(screen.getByTestId("update-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("delete-icon"));
    fireEvent.click(screen.getByText("Yes"));
    expect(deleteHandler).toHaveBeenCalled();
  });
});

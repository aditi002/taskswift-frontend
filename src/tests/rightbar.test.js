import { render, screen } from "@testing-library/react";
import { Progress } from "antd";
import Rightbar from "./Rightbar";

describe("Rightbar", () => {
  const tasks = [
    { id: 1, title: "Task 1", status: "Complete" },
    { id: 2, title: "Task 2", status: "Incomplete" },
    { id: 3, title: "Task 3", status: "Complete" }
  ];

  test("should display form and progress information", () => {
    render(<Rightbar token="your-token" user="your-user" tasks={tasks} />);

    expect(screen.getByTestId("add-task-form")).toBeInTheDocument();
    expect(screen.getByTestId("progress-circle")).toBeInTheDocument();
    expect(screen.getByText("2 out of 3 completed")).toBeInTheDocument();
  });
});

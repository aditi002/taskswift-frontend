import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../components/Sidebar";

describe("Sidebar", () => {
  test("should display logo and user information", () => {
    render(
      <Router>
        <Sidebar profile={{ fullname: "John Doe", username: "johndoe", email: "john@example.com" }} />
      </Router>
    );

    expect(screen.getByText("CheckMate")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  test("should display navigation items", () => {
    render(
      <Router>
        <Sidebar profile={{ fullname: "John Doe", username: "johndoe", email: "john@example.com" }} />
      </Router>
    );

    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(screen.getByText("Important")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});

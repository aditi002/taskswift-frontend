import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";

describe("Splash Screen", () => {
  test("should render correctly", () => {
    render(
      <Router>
        <SplashScreen />
      </Router>
    );
  });

  test("should display the Splash Screen", () => {
    render(
      <Router>
        <SplashScreen />
      </Router>
    );

    const expectedText = /Stay.*Achieve more\./i; // Use regular expression
    const splashScreenText = screen.getByText(expectedText);

    expect(splashScreenText).toBeInTheDocument();
  });
});

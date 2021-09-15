import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getTransliterateSuggestions, ReactTransliterate } from "./index";

describe("ReactTransliterate", () => {
  it("is truthy", () => {
    expect(ReactTransliterate).toBeTruthy();
  });

  it("renders without errors", () => {
    const mockValue = "";
    const mockOnChangeText = jest.fn();
    render(
      <ReactTransliterate value={mockValue} onChangeText={mockOnChangeText} />,
    );
  });

  it("renders passed value in the input", () => {
    const mockData = "MOCK_VALUE";
    const mockValue = mockData;
    const mockOnChangeText = jest.fn();
    render(
      <ReactTransliterate value={mockValue} onChangeText={mockOnChangeText} />,
    );
    expect(screen.getByDisplayValue(mockData)).toBeInTheDocument();
  });

  it("calls onChangeText on user input", () => {
    const mockData = "MOCK_VALUE";
    const mockValue = mockData;
    const mockOnChangeText = jest.fn();
    render(
      <ReactTransliterate value={mockValue} onChangeText={mockOnChangeText} />,
    );
    fireEvent.change(screen.getByTestId("rt-input-component"), {
      target: { value: "H" },
    });
    expect(mockOnChangeText).toBeCalled();
  });

  it("renders suggestions list", async () => {
    const mockData = "MOCK_VALUE";
    const mockValue = mockData;
    const mockOnChangeText = jest.fn();

    render(
      <ReactTransliterate value={mockValue} onChangeText={mockOnChangeText} />,
    );
    fireEvent.change(screen.getByTestId("rt-input-component"), {
      target: { value: "there" },
    });
    await waitFor(() => {
      expect(screen.getByTestId("rt-suggestions-list")).toBeInTheDocument();
    });
  });
});

it("returns translate suggestion", () => {
  expect(getTransliterateSuggestions("hello")).resolves.toContain("hello");
});

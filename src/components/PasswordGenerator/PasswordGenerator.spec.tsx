import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import PasswordGenerator from "./PasswordGenerator";
import generatePassword from "../../utils/generatePassword";

jest.mock("../../utils/generatePassword", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGeneratePassword = generatePassword as jest.MockedFunction<
  typeof generatePassword
>;

describe("PasswordGenerator", () => {
  beforeEach(() => {
    // Set up the mock implementation
    mockGeneratePassword.mockReturnValue("mockedPassword");
  });

  test("renders the PasswordGenerator component correctly", () => {
    render(<PasswordGenerator />);

    expect(
      screen.getByPlaceholderText("Generated Password")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Character length:")).toBeInTheDocument();
    expect(screen.getByLabelText("Include Lowercase")).toBeInTheDocument();
    expect(screen.getByLabelText("Include Uppercase")).toBeInTheDocument();
    expect(screen.getByLabelText("Include Numbers")).toBeInTheDocument();
    expect(screen.getByLabelText("Include Symbols")).toBeInTheDocument();
    expect(screen.getByText("Generate")).toBeInTheDocument();
  });

  test("generates a password on initial render", () => {
    render(<PasswordGenerator />);

    expect(mockGeneratePassword).toHaveBeenCalledWith({
      length: 10,
      includeLowercase: true,
      includeUppercase: false,
      includeNumbers: false,
      includeSymbols: false,
    });
    const inputElement = screen.getByPlaceholderText(
      "Generated Password"
    ) as HTMLInputElement;
    expect(inputElement.value).toBe("mockedPassword");
  });

  test("regenerates a password when length is changed", () => {
    render(<PasswordGenerator />);

    const slider = screen.getByLabelText(
      "Character length:"
    ) as HTMLInputElement;
    fireEvent.change(slider, { target: { value: 15 } });

    expect(mockGeneratePassword).toHaveBeenCalledWith(
      expect.objectContaining({ length: 15 })
    );
  });

  test("regenerates a password when constraints are changed", () => {
    render(<PasswordGenerator />);

    const uppercaseCheckbox = screen.getByLabelText(
      "Include Uppercase"
    ) as HTMLInputElement;
    fireEvent.click(uppercaseCheckbox);

    expect(mockGeneratePassword).toHaveBeenCalledWith(
      expect.objectContaining({ includeUppercase: true })
    );
  });

  test("copies the password to clipboard when copy button is clicked", async () => {
    render(<PasswordGenerator />);
    const copyButton = screen.getByLabelText("Copy password to clipboard");

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        "mockedPassword"
      );
      expect(screen.getByText("Password copied")).toBeInTheDocument();
    });
  });

  test("does not allow all constraints to be unchecked", () => {
    render(<PasswordGenerator />);

    const lowercaseCheckbox = screen.getByLabelText(
      "Include Lowercase"
    ) as HTMLInputElement;
    fireEvent.click(lowercaseCheckbox);

    expect(lowercaseCheckbox).toBeChecked();
    expect(mockGeneratePassword).not.toHaveBeenCalledWith(
      expect.objectContaining({ includeLowercase: false })
    );
  });

  test("shows a toast message when the password is copied", async () => {
    render(<PasswordGenerator />);
    const copyButton = screen.getByLabelText("Copy password to clipboard");

    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText("Password copied")).toBeInTheDocument();
    });
  });
});

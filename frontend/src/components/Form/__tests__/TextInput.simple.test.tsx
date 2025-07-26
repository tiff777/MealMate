import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TextInput from "../TextInput";
import { FiUser } from "react-icons/fi";

describe("TextInput - Simple", () => {
  it("renders input element", () => {
    render(
      <TextInput
        label="Username"
        placeholder="Enter username"
        value=""
        onChange={vi.fn()}
        icon={<FiUser />}
      />
    );

    const input = screen.getByPlaceholderText("Enter username");
    expect(input).toBeInTheDocument();
  });

  it("shows label text", () => {
    render(
      <TextInput
        label="Email"
        placeholder="Enter email"
        value=""
        onChange={vi.fn()}
        icon={<FiUser />}
      />
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    render(
      <TextInput
        label="Password"
        placeholder="Enter password"
        value=""
        onChange={vi.fn()}
        icon={<FiUser />}
        error="Password is required"
      />
    );

    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("shows required asterisk when required", () => {
    render(
      <TextInput
        label="Name"
        placeholder="Enter name"
        value=""
        onChange={vi.fn()}
        icon={<FiUser />}
        required
      />
    );

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("displays current value", () => {
    render(
      <TextInput
        label="Username"
        placeholder="Enter username"
        value="testuser"
        onChange={vi.fn()}
        icon={<FiUser />}
      />
    );

    const input = screen.getByDisplayValue("testuser");
    expect(input).toBeInTheDocument();
  });
});

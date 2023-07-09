// Component Interactions and Events:
// Test the behavior when entering text into each of the input fields.
// Check if error handling works correctly: if you don't meet input requirements (certain length, special characters, etc.) there should be an error message displayed.
// Test if the 'Register' button becomes active only when all the input fields are correctly filled out.
// Check how your component reacts on the form submission event. For instance, you can test if the form prevents default form submission behavior.
// Test what happens when you submit the form with valid inputs.
// Asynchronous Behavior and Side Effects:
// If your registration involves API requests, test if these requests are triggered on form submission.
// Test the loading state if you show a spinner or a loading message while waiting for the server response.
// Check if the form displays the correct message or redirects to the correct page when the request is successful.
// Test the error handling when the server responds with an error.

import RootLayout from "@/app/layout";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import RegisterForm from "@/app/register/page";
import { useRouter } from "next/navigation";
import { mockNextRouter } from "../mocks/mockRouter";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { NextRouter } from "next/router";

global.fetch = jest.fn((value) => {
  Promise.resolve({
    json: () => Promise.resolve(value),
  });
});

describe("Register component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders form correctly", () => {
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders username, password and confirm password", () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it("renders placeholder field for username, password and confirm password", () => {
    expect(screen.getByPlaceholderText(/Username123/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+5 characters")).toBeInTheDocument();
  });

  it("renders register button", () => {
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("renders register image", () => {
    const image = screen.getByAltText("register") as HTMLImageElement;
    expect(image.src).toContain("img.jpg");
  });

  it("renders register button as disabled", () => {
    expect(screen.getByRole("button", { name: /register/i })).toBeDisabled();
  });

  it("renders spinner on register button", async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmInput = screen.getByTestId("confirm-password");
    const registerButton = screen.getByRole("button", { name: /register/i });

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    fireEvent.input(usernameInput, {
      target: { value: "Username123" },
    });
    fireEvent.input(passwordInput, {
      target: { value: "password12345" },
    });
    fireEvent.input(confirmInput, {
      target: { value: "password12345" },
    });

    fireEvent.click(registerButton);

    expect(await screen.findByText("spinner")).toBeInTheDocument();
  });

  it("displays error message when input requirements are not met", async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);
    fireEvent.input(usernameInput, {
      target: { value: "" },
    });
    fireEvent.blur(usernameInput);
    await waitFor(() =>
      expect(screen.getByText("Username is required")).toBeInTheDocument()
    );

    fireEvent.input(passwordInput, {
      target: { value: "1234" },
    });
    fireEvent.blur(passwordInput);
    await waitFor(() =>
      expect(
        screen.getByText("Must be 5 characters or longer")
      ).toBeInTheDocument()
    );

    fireEvent.input(confirmInput, {
      target: { value: "12345" },
    });
    fireEvent.blur(confirmInput);
    await waitFor(() =>
      expect(screen.getByText("Passwords should match")).toBeInTheDocument()
    );
  });

  it("renders as register button being disabled", async () => {
    expect(screen.getByRole("button", { name: /register/i })).toBeDisabled();
  });

  it("enables register button when all input fields are correctly filled out", async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmInput = screen.getByTestId("confirm-password");
    const registerButton = screen.getByRole("button", { name: /register/i });

    console.log("con input", confirmInput);
    fireEvent.input(usernameInput, {
      target: { value: "Username123" },
    });
    fireEvent.input(passwordInput, {
      target: { value: "password12345" },
    });
    fireEvent.input(confirmInput, {
      target: { value: "password12345" },
    });

    await waitFor(() => {
      expect(registerButton).not.toBeDisabled();
    });
  });

  it("prevents default form submission behavior", () => {
    const form = screen.getByRole("form");
    const preventDefault = jest.fn();
    form.addEventListener("submit", (event) => {
      event.preventDefault = preventDefault;
    });

    fireEvent.submit(form);

    waitFor(() => expect(preventDefault).toHaveBeenCalled());
  });

  // TODO false positive
  it.skip("navigates to login page when form is submitted with valid inputs", () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as NextRouter);

    fireEvent.input(screen.getByLabelText(/username/i), {
      target: { value: "Username123" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password12345" },
    });
    fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: "password12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    waitFor(() => expect(mockRouterPush).toHaveBeenCalledWith("/login"));
  });
});

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

function renderComponent() {
  act(() => {
    render(
      <RouterContext.Provider value={{ push: mockRouterPush }}>
        <RootLayout>
          <RegisterForm />
        </RootLayout>
      </RouterContext.Provider>
    );
  });
}

mockIntersectionObserver();

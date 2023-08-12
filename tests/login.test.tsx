import RootLayout from "@/app/layout";
import LoginForm from "@/app/login/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { useRouter } from "next/navigation";
import { act } from "react-dom/test-utils";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import { mockNextRouter, mockRouterPush } from "../mocks/mockRouter";

(global.fetch as jest.Mock) = jest.fn((value) => {
  Promise.resolve({
    json: () => Promise.resolve(value),
  });
});

describe("Login component", () => {
  beforeEach(() => {
    setupTests();
  });

  it("renders form correctly", () => {
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders username, password and confirm password", () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders placeholder field for username and password", () => {
    expect(screen.getByPlaceholderText(/Username123/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders login button", () => {
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("renders login image", () => {
    const image = screen.getByAltText("login") as HTMLImageElement;
    expect(image.src).toContain("img.jpg");
  });

  it("renders login button as disabled", () => {
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  it("renders spinner on login button", async () => {
    jest
      .mocked(useRouter)
      .mockReturnValueOnce(mockNextRouter as AppRouterInstance);

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.input(usernameInput, {
      target: { value: "Username123" },
    });
    fireEvent.input(passwordInput, {
      target: { value: "password12345" },
    });

    fireEvent.click(loginButton);
    expect(screen.getByTestId("spinner"));
  });

  it("displays error message when input requirements are not met", async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
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
      expect(screen.getByText("Password is required")).toBeInTheDocument()
    );
  });

  it("renders as login button being disabled", async () => {
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeDisabled();
  });

  it("enables login button when all input fields are correctly filled out", async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.input(usernameInput, {
      target: { value: "Username123" },
    });
    fireEvent.input(passwordInput, {
      target: { value: "password12345" },
    });

    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
    });
  });

  it("prevents default form submission behavior", async () => {
    const form = screen.getByRole("form");
    const preventDefault = jest.fn();
    form.addEventListener("submit", (event) => {
      event.preventDefault = preventDefault;
    });

    fireEvent.submit(form);

    await waitFor(() => expect(preventDefault).toHaveBeenCalled());
  });

  it("triggers dashboard route when form is submitted with valid inputs", async () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as AppRouterInstance);

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.input(usernameInput, {
      target: { value: "Username123" },
    });
    fireEvent.input(passwordInput, {
      target: { value: "password12345" },
    });

    fireEvent.click(loginButton);

    await waitFor(() =>
      expect(mockRouterPush).toHaveBeenCalledWith("/dashboard")
    );
  });
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

function setupTests() {
  act(() => {
    render(
      <RouterContext.Provider value={{ push: mockRouterPush }}>
        <RootLayout>
          <LoginForm />
        </RootLayout>
      </RouterContext.Provider>
    );
  });
}

mockIntersectionObserver();

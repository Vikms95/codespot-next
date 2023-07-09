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
  });

  it("renders placeholder field for username, password and confirm password", () => {
    expect(screen.getByPlaceholderText(/Username123/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("renders register button", () => {
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("renders register image", () => {
    const image = screen.getByAltText("login") as HTMLImageElement;
    expect(image.src).toContain("img.jpg");
  });

  it("renders register button as disabled", () => {
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });

  it("renders spinner on register button", async () => {
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

  it("renders as register button being disabled", async () => {
    const registerButton = screen.getByRole("button", { name: /login/i });
    expect(registerButton).toBeDisabled();
  });

  it("enables register button when all input fields are correctly filled out", async () => {
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

  it.skip("triggers login route when form is submitted with valid inputs and navigates to login page", async () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as AppRouterInstance);

    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const confirmInput = screen.getByTestId("confirm-password");
    const registerButton = screen.getByRole("button", { name: /register/i });

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

    await waitFor(() => expect(mockRouterPush).toHaveBeenCalledWith("/login"));
  });
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

function renderComponent() {
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

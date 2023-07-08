import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import * as userService from "@services/user";
import {
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import {
  mockPostArray,
  mockPostArrayManyElements,
} from "../mocks/mockPostArray";

jest.mock("../src/services/user", () => ({
  ...jest.requireActual("../src/services/user"),
  verifyUser: jest.fn(),
  loginUser: jest.fn(),
}));

jest.mock("../src/services/post", () => ({
  getPosts: jest.fn().mockImplementation(async () => mockPostArray),
}));

const mockRouterPush = jest.fn();

describe("Navbar with guest", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.mocked(userService).verifyUser.mockResolvedValue(undefined);
    renderComponent();
  });

  it("has title", () => {
    waitFor(
      () => {
        screen.getByText("CODESPOT");
      },
      { timeout: 0 }
    );
  });
  it("has login text", () => {
    waitFor(
      () => {
        screen.getByText("Login");
      },
      { timeout: 0 }
    );
  });
  it("has register text", () => {
    waitFor(
      () => {
        screen.getByText("Register");
      },
      { timeout: 0 }
    );
  });
});

describe("Navbar with user", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.mocked(userService).verifyUser.mockResolvedValue("mockuser");
    renderComponent();
  });

  it("has dashboard text", () => {
    waitFor(
      () => {
        screen.getByText("Dashboard");
      },
      { timeout: 0 }
    );
  });
  it("has new post text", () => {
    waitFor(
      () => {
        screen.getByText("New post");
      },
      { timeout: 0 }
    );
  });
  it("has logout text", () => {
    waitFor(
      () => {
        screen.getByText("Logout");
      },
      { timeout: 0 }
    );
  });
});

function renderComponent() {
  act(() => {
    render(
      <RouterContext.Provider value={{ push: mockRouterPush }}>
        <RootLayout>
          <Home setIsModalActive={jest.fn()} setLastClickedPostId={jest.fn()} />
        </RootLayout>
      </RouterContext.Provider>
    );
  });
}

mockIntersectionObserver();

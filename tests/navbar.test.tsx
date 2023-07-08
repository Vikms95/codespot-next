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
  });

  it("has title", () => {
    renderComponent();
    screen.getByText("CODESPOT");
  });
  it("has login text", () => {
    renderComponent();
    screen.getByText("Login");
  });
  it("has register text", () => {
    renderComponent();
    screen.getByText("Register");
  });
});

describe("Navbar with user", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.mocked(userService).verifyUser.mockResolvedValue("mockuser");
  });

  it("has dashboard text", () => {
    renderComponent();

    waitFor(
      () => {
        expect(userService.verifyUser).toHaveBeenCalledTimes(1);
        screen.getByText("Dashboard");
      },
      { timeout: 5000 }
    );
  });
  it.todo("has new post text");
  it.todo("has logout text");
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

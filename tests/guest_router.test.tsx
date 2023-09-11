import { fireEvent, render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter, useRouter } from "next/router";
import { act } from "react-dom/test-utils";
import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import { mockPostArrayManyElements } from "../mocks/mockPostArray";
import { mockNextRouter, mockRouterPush } from "../mocks/mockRouter";

describe("guest routes", () => {
  setupTests();

  it("navigates to login page", () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as NextRouter);
    const loginButton = screen.getByTestId("login-button");
    act(() => fireEvent.click(loginButton));
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/login",
      expect.objectContaining({ forceOptimisticNavigation: false })
    );
  });
  it("navigates to register page", () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as NextRouter);
    const registerButton = screen.getByTestId("register-button");
    act(() => fireEvent.click(registerButton));
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/register",
      expect.objectContaining({ forceOptimisticNavigation: false })
    );
  });
  it("navigates to home page", () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as NextRouter);
    const dashboardButton = screen.getByTestId("home-button");
    act(() => fireEvent.click(dashboardButton));
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/",
      expect.objectContaining({ forceOptimisticNavigation: false })
    );
  });
  it("navigates to post route", () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as NextRouter);
    const postLink = screen.getAllByTestId("post-link").at(0);
    if (!postLink) return;

    act(() => fireEvent.click(postLink));
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/posts/" + mockPostArrayManyElements[0]._id,
      expect.objectContaining({ forceOptimisticNavigation: false })
    );
  });
});

function setupTests() {
  beforeEach(() =>
    act(() => {
      render(
        <RouterContext.Provider value={{ push: mockRouterPush }}>
          <RootLayout>
            <Home
              setIsModalActive={jest.fn()}
              setLastClickedPostId={jest.fn()}
            />
          </RootLayout>
        </RouterContext.Provider>
      );
      jest.clearAllMocks();
    })
  );

  afterEach(() => {
    jest.clearAllMocks();
  });
}

// Mocks //
mockIntersectionObserver();

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/services/post");
jest
  .mocked(postService)
  .getPosts.mockImplementation(async () => mockPostArrayManyElements);

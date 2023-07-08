import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter, useRouter } from "next/router";
import * as React from "react";
import { act } from "react-dom/test-utils";
import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import * as userService from "@services/user";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import {
  mockPostArray,
  mockPostArrayManyElements,
} from "../mocks/mockPostArray";
import {
  mockNextRouter,
  mockRouter,
  mockRouterPush,
} from "../mocks/mockRouter";

describe("user routes", () => {
  setupTests();

  it("navigates to create page", () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as NextRouter);
    const createButton = screen.getByTestId("create-button");
    act(() => fireEvent.click(createButton));
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/create",
      expect.objectContaining({ forceOptimisticNavigation: false })
    );
  });
  it("navigates to dashboard page", () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as NextRouter);
    const dashboardButton = screen.getByTestId("dashboard-button");
    act(() => fireEvent.click(dashboardButton));
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/dashboard",
      expect.objectContaining({ forceOptimisticNavigation: false })
    );
  });
  it("logs out and navigates to home", () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as NextRouter);
    const logoutButton = screen.getByTestId("logout-button");
    act(() => fireEvent.click(logoutButton));
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/",
      expect.objectContaining({ forceOptimisticNavigation: false })
    );
  });
  it("navigates to post route", () => {
    jest.mocked(useRouter).mockReturnValue(mockNextRouter as NextRouter);
    const postLink = screen.getByTestId("post-link");
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
jest.mocked(postService).getPosts.mockImplementation(async () => mockPostArray);

jest.mock("../src/services/user");
jest.mocked(userService).verifyUser.mockImplementation(async () => {
  return {
    user: "mockuser",
  };
});
jest.mocked(userService).loginUser.mockImplementation(async () => {
  return {
    user: "mockuser",
  };
});

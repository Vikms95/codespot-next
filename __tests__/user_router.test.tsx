import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter, useRouter } from "next/router";
import * as React from "react";
import { act } from "react-dom/test-utils";
import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import * as userService from "@services/user";
import { mockIntersectionObserver } from "../__mocks__/mockIntersectionObserver";
import { mockPostArray } from "../__mocks__/mockPostArray";
import {
  mockNextRouter,
  mockRouter,
  mockRouterPush,
} from "../__mocks__/mockRouter";

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
jest.mock("../src/services/user");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/services/post");
jest.mocked(postService).getPosts.mockImplementation(async () => mockPostArray);

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

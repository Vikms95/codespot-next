import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import * as userService from "@services/user";
import { render, screen } from "@testing-library/react";
import { mockRouterPush } from "../__mocks__/mockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { verifyUser } from "@/services/user";
import { getPosts } from "@/services/post";
import { mockPostArray } from "__mocks__/mockPostArray";
import { mockIntersectionObserver } from "__mocks__/mockIntersectionObserver";

describe("init api calls", () => {
  setupTests();
  it("verify user", () => {
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  //   it("home posts", () => {
  //     expect(getPosts).toHaveBeenCalledTimes(1);
  //   });
});

function setupTests() {
  beforeEach(() => {
    // verifyUser.mockResolvedValueOnce({ user: "mockUser" });
    // getPosts.mockResolvedValueOnce(mockPostArray);
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
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
}

mockIntersectionObserver();
jest.mock("../src/services/user");
jest.mock("../src/services/post");
jest.mocked(postService).getPosts.mockImplementation(async () => mockPostArray);
jest.mocked(userService).verifyUser.mockImplementation(async () => {
  return {
    user: "mockuser",
  };
});

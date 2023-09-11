import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import * as userService from "@services/user";
import { render, screen } from "@testing-library/react";
import { mockRouterPush } from "../mocks/mockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { verifyUser } from "@/services/user";
import { getPosts } from "@/services/post";
import { mockPostArrayManyElements } from "../mocks/mockPostArray";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import useSWR from "swr";

describe("init api calls", () => {
  setupTests();

  it("calls verify user", () => {
    const verifyUserSpy = jest.spyOn(userService, "verifyUser");
    expect(verifyUserSpy).toHaveBeenCalledTimes(1);
  });

  it.todo("calls home posts");
  //   , async () => {
  //     const fakeData = { fake: "data" };
  //     global.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData));

  //     render(
  //       <RootLayout>
  //         <Home setIsModalActive={jest.fn()} setLastClickedPostId={jest.fn()} />
  //       </RootLayout>
  //     );
  //     expect(global.fetch).toHaveBeenCalledWith("hi");
  //   });
});

function setupTests() {
  beforeEach(() => {
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
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
}

function setupFetchStub(data: any) {
  return function fetchStub(_url: string) {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve({
            data,
          }),
      });
    });
  };
}

mockIntersectionObserver();

jest.mock("../src/services/user");
jest.mock("../src/services/post");
jest
  .mocked(postService)
  .getPosts.mockImplementation(async () => mockPostArrayManyElements);
jest.mocked(userService).verifyUser.mockImplementation(async () => {
  return {
    user: "mockuser",
  };
});

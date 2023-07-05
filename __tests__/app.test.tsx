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
import { mockNextRouter, mockRouterPush } from "../__mocks__/mockRouter";

jest.mock("../src/services/post");
jest.mocked(postService).getPosts.mockImplementation(async () => mockPostArray);

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(mockIntersectionObserver);

//

describe("init", () => {
  setupTests();

  it("renders correctly", () => {
    expect(screen.getByRole("navigation")).toBeInTheDocument(); // Assuming the Navbar component is wrapped in a <nav> element
    expect(screen.getByRole("main")).toBeInTheDocument(); // Assuming the children components are wrapped in a <main> element
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

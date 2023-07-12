import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import { render, screen } from "@testing-library/react";
import { mockRouterPush } from "../mocks/mockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import {
  mockPostArrayManyElements,
  mockPostUser,
} from "../mocks/mockPostArray";
import * as userService from "../src/services/user";
import Dashboard from "@/app/dashboard/page";

describe("Dashboard component", () => {
  setupTests();
  it("renders the published post layout title", () => {
    screen.getByRole("heading", { name: "Published posts" });
  });
  it("renders the unpublished post layout title", () => {
    screen.getByRole("heading", { name: "Unpublished posts" });
  });
  it("renders two posts layout", () => {
    const layouts = screen.getAllByTestId("posts-layout");
    expect(layouts).toHaveLength(2);
  });
  it("renders the correct amount of total posts", () => {
    const posts = screen.getAllByTestId("post-link");
    expect(posts).toHaveLength(3);
  });
  it("renders correct amount of private and public posts", () => {
    const layouts = screen.getAllByTestId("posts-layout");
    expect(layouts[0].children).toHaveLength(1);
    expect(layouts[1].children).toHaveLength(2);
  });
  it.skip("only renders posts that are from the logged in user", () => {});
  it.skip("renders no post layout on user with no post", () => {
    // expect(screen.getByTestId("posts-layout")).not.toBeInTheDocument();
  });
});
function setupTests() {
  beforeEach(() =>
    act(() => {
      render(
        <RouterContext.Provider value={{ push: mockRouterPush }}>
          <RootLayout>
            <Dashboard setIsModalActive={jest.fn()} />
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
mockIntersectionObserver();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/services/user");
jest.mocked(userService).verifyUser.mockImplementation(async () => {
  return {
    user: "notvalidmockuser",
  };
});
// jest.mocked(userService).verifyUser.mockImplementation(async () => {
//   return {
//     user: "mockuser",
//   };
// });

jest.mock("../src/services/post");
jest
  .mocked(postService)
  .getUserPosts.mockImplementation(async () => mockPostUser);

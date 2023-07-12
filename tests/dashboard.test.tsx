import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import { render, screen, waitFor } from "@testing-library/react";
import { mockRouterPush } from "../mocks/mockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import {
  mockPostArrayManyElements,
  mockPostDashboard,
} from "../mocks/mockPostArray";
// import * as userService from "../src/services/user";
import Dashboard from "@/app/dashboard/page";
import { verifyUser } from "@/services/user";
import { getUserPosts } from "@/services/post";

mockIntersectionObserver();
jest.mock("../src/services/user");
jest.mock("../src/services/post");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

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
  it("renders the correct amount of total posts according to the user", () => {
    const posts = screen.getAllByTestId("post-link");
    expect(posts).toHaveLength(3);
  });
  it("renders correct amount of private and public posts", () => {
    const layouts = screen.getAllByTestId("posts-layout");
    expect(layouts[0].children).toHaveLength(1);
    expect(layouts[1].children).toHaveLength(2);
  });
  it("renders no post layout on user with no post", async () => {
    (verifyUser as jest.Mock).mockImplementation(async () => {
      return { id: "userid3", user: "mockuser3" };
    });
    const postsLayout = screen.queryByTestId("posts-layout");
    expect(postsLayout).not.toBeInTheDocument();
  });
  it.skip("only renders posts that are from the logged in user", () => {});
});

function setupTests() {
  beforeEach(() =>
    act(() => {
      (verifyUser as jest.Mock).mockImplementation(async () => {
        return { id: "userid1", user: "mockuser" };
      });
      (getUserPosts as jest.Mock).mockImplementation(async () => {
        return mockPostDashboard.filter((post) => post.user._id === "userid1");
      });

      render(
        <RouterContext.Provider value={{ push: mockRouterPush }}>
          <RootLayout>
            <Dashboard setIsModalActive={jest.fn()} />
          </RootLayout>
        </RouterContext.Provider>
      );
    })
  );

  afterEach(() => {
    jest.clearAllMocks();
  });
}

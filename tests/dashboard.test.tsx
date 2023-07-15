import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import {
  cleanup,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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

describe("Dashboard component with user that has 3 post", () => {
  setupTests("userid1", "mockuser");

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
  it("only renders posts that are from the user", () => {
    expect(screen.queryByText("mockuser2")).not.toBeInTheDocument();
  });
});

describe("Dashboard on user with no post", () => {
  setupTests("mockid1", "mockuser999");

  it("renders no post layout on user with no post", async () => {
    const layouts = screen.queryAllByTestId("posts-layout");
    expect(layouts).toHaveLength(0);
  });

  it("does not render post from other users", () => {
    expect(screen.queryByText("mockuser")).not.toBeInTheDocument();
  });
});

function setupTests(id: string, user: string) {
  beforeEach(() =>
    act(() => {
      (verifyUser as jest.Mock).mockImplementation(async () => {
        return { id, user };
      });
      (getUserPosts as jest.Mock).mockImplementation(async () => {
        return mockPostDashboard.filter((post) => post.user._id === id);
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

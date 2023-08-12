import PostForm from "@/app/create/page";
import RootLayout from "@/app/layout";
import { getUserPosts } from "@/services/post";
import { verifyUser } from "@/services/user";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import { mockRouterPush } from "../mocks/mockRouter";
import { render, screen, waitFor } from "@testing-library/react";
import { mockPostDashboard } from "../mocks/mockPostArray";

mockIntersectionObserver();
jest.mock("../src/services/user", () => ({
  verifyUser: jest.fn(),
}));
jest.mock("../src/services/post", () => ({
  getUserPosts: jest.fn(),
}));
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
  it("only renders posts that are from the user", async () => {
    expect(screen.queryByText("mockuser2")).not.toBeInTheDocument();
  });
});

describe.skip("Dashboard on user with no post", () => {
  setupTests("invalidid", "invalidmockuser");

  it.skip("renders no post layout on user with no post", async () => {
    const mockImpl = await Promise.resolve(
      (verifyUser as jest.Mock).getMockImplementation()!()
    );
    console.log(mockImpl);
    const layouts = screen.queryAllByTestId("posts-layout");
    expect(layouts).toHaveLength(0);
  });

  it.skip("does not render post from other users", () => {
    expect(screen.queryByText("mockuser")).not.toBeInTheDocument();
  });
});

function setupTests(id: string, user: string) {
  beforeEach(() =>
    act(() => {
      jest.clearAllMocks();
      (verifyUser as jest.Mock).mockResolvedValue({ id, user });
      (getUserPosts as jest.Mock).mockResolvedValue(
        mockPostDashboard.filter((post) => post.user._id === id)
      );

      render(
        <RouterContext.Provider value={{ push: mockRouterPush }}>
          <RootLayout>
            <Dashboard setIsModalActive={jest.fn()} />
          </RootLayout>
        </RouterContext.Provider>
      );
    })
  );

  afterEach(() => {});
}

import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import { render, screen } from "@testing-library/react";
import { mockRouterPush } from "../mocks/mockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import { mockPostArrayManyElements } from "../mocks/mockPostArray";

describe("Home", () => {
  setupTests();
  it("renders the post layout title", () => {
    screen.getByRole("heading", { name: "Latest post" });
  });
  it("renders the posts layout", () => {
    screen.getByTestId("posts-layout");
  });
  it("renders the correct amount of posts", () => {
    const postLayout = screen.getByTestId("posts-layout");
    expect(postLayout.children).toHaveLength(23);
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
mockIntersectionObserver();

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/services/post");
jest
  .mocked(postService)
  .getPosts.mockImplementation(async () => mockPostArrayManyElements);

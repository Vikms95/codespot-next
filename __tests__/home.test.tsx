import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import { render, screen } from "@testing-library/react";
import { mockRouterPush } from "../__mocks__/mockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import { mockIntersectionObserver } from "../__mocks__/mockIntersectionObserver";
import { mockPostArray } from "../__mocks__/mockPostArray";

describe("Home", () => {
  setupTests();
  it("renders the post layout title", () => {
    console.log(screen.debug());
    screen.getByText("Latest post");
  });
  it.todo("renders the correct amount of posts");
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
jest.mocked(postService).getPosts.mockImplementation(async () => mockPostArray);

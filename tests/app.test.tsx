import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import { mockIntersectionObserver } from "../mocks/mockIntersectionObserver";
import { mockPostArrayManyElements } from "../mocks/mockPostArray";
import { mockRouterPush } from "../mocks/mockRouter";

describe("init", () => {
  setupTests();

  it("renders static elements correctly", () => {
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders post layout", () => {
    expect(screen.getByTestId("posts-layout")).toBeInTheDocument();
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

// MOCKS //
mockIntersectionObserver();

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/services/post");
jest
  .mocked(postService)
  .getPosts.mockImplementation(async () => mockPostArrayManyElements);

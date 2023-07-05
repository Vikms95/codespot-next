import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";
import RootLayout from "@/app/layout";
import Home from "@/app/page";
import * as postService from "@services/post";
import { mockIntersectionObserver } from "../__mocks__/mockIntersectionObserver";
import { mockPostArray } from "../__mocks__/mockPostArray";
import { mockRouterPush } from "../__mocks__/mockRouter";

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

// MOCKS //
mockIntersectionObserver();

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/services/post");
jest.mocked(postService).getPosts.mockImplementation(async () => mockPostArray);

import RootLayout from "@/app/layout";
import Home from "@/app/page";
import { render } from "@testing-library/react";
import { mockRouterPush } from "../__mocks__/mockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { act } from "react-dom/test-utils";

it.todo("hi");
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

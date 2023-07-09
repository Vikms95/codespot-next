import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const useRouter = jest.fn();
export const mockRouterPush = jest.fn();
const mockNextRouter: Partial<AppRouterInstance> = {
  push: mockRouterPush,
  prefetch: () => Promise.resolve(),
  back: () => {},
  forward: () => {},
  refresh: () => {},
  replace: () => {},
  //   reload: () => {},
  //   beforePopState: () => {},
  //   events: {
  //     on: () => {},
  //     off: () => {},
  //     emit: () => {},
  //   },
  //   isFallback: false,
  //   isReady: true,
};

function mockRouter() {
  jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
  }));
}

export { mockRouter, mockNextRouter };

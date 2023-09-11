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
};

function mockRouter() {
  jest.mock("next/navigation", () => ({
    useRouter: mockNextRouter,
  }));
}

export { mockRouter, mockNextRouter };

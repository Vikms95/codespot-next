import { NextRouter } from "next/router";

// export const useRouter = jest.fn();
const mockRouterPush = jest.fn();
const mockNextRouter: Partial<NextRouter> = {
  push: mockRouterPush,
  prefetch: () => Promise.resolve(),
  reload: () => {},
  back: () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isReady: true,
};

function mockRouter() {
  jest.mock("next/router", () => ({
    useRouter: jest.fn(),
  }));
}

export { mockRouter, mockNextRouter, mockRouterPush };

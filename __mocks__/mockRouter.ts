import { NextRouter, useRouter } from "next/router";

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

export { mockNextRouter, mockRouterPush };

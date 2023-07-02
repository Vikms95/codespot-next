// __mocks__/next/router.js
const useRouter = jest.spyOn(require("next/router"), "useRouter");

const nextRouterMock = {
  push: jest.fn().mockResolvedValue(""),
  replace: jest.fn().mockResolvedValue(""),
  prefetch: jest.fn().mockResolvedValue(""),
  route: "/",
  pathname: "/",
  query: "",
  asPath: "/",
  basePath: "/",
};
jest.doMock("next/router", () => ({
  useRouter: () => nextRouterMock,
}));

export { nextRouterMock };

import { TPost } from "@/types";
import { createFormData } from "@utils/createFormData";
import { findByID } from "@utils/findbyID";
import { formatError } from "@utils/formatError";
import { getFormattedDate } from "@utils/getFormattedDate";
import { getFromStorage } from "@utils/getFromStorage";
import { getRelativeCurrentDate } from "@utils/getRelativeCurrentDate";
import { setToStorage } from "@utils/setToStorage";
import { MS_PER_DAY, MS_PER_WEEK } from "@constants";

// Mock data
const form = {
  title: "title",
  text: "text",
  isPublic: true,
  user: { _id: "id", username: "user" },
  image: "image",
};
const { image, title, text, isPublic, user } = form;

const posts = [
  { _id: "1", title: "one" },
  { _id: "2", title: "two" },
  { _id: "3", title: "three" },
];

const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("createFormData", () => {
  it("creates form data of a post", () => {
    const mockFormData = new FormData();

    mockFormData.append("image", image || "");
    mockFormData.append("title", title);
    mockFormData.append("text", text);
    mockFormData.append("isPublic", isPublic as any as string);
    mockFormData.append("user", user as any as string);

    const formData = createFormData(form);
    expect(mockFormData).toStrictEqual(formData);
  });
});

describe("getFormattedDate", () => {
  it("returns the passed in formatted date", () => {
    const timestamp = getFormattedDate(new Date(1687001481870));
    expect(timestamp).toEqual("June 17, 2023");
  });
});

// TODO this will fail on certain hours of the day, so ignore if fails
describe("getRelativeCurrentDate", () => {
  it("returns the correct days", () => {
    const diff = new Date(new Date().getTime() - MS_PER_DAY * 3);
    const timestamp = getFormattedDate(diff);
    const relativeDate = getRelativeCurrentDate(timestamp);

    expect(relativeDate).toBe("3 days ago");
  });

  it("returns the correct weeks", () => {
    const diff = new Date(new Date().getTime() - MS_PER_WEEK * 2);
    const timestamp = getFormattedDate(diff);
    const relativeDate = getRelativeCurrentDate(timestamp);

    expect(relativeDate).toBe("2 weeks ago");
  });
});

describe("formatError", () => {
  it("formats error", () => {
    const err = new Error("test error");
    const formattedErr = formatError(err);
    expect(formattedErr).toBe("test error");
  });
});

describe("findByID", () => {
  it("finds correct element within array", () => {
    const post = findByID(posts as TPost[], "1");
    expect(post).toBe(posts[0]);
  });
});

describe("getFromStorage", () => {
  it("invokes get item from local storage", () => {
    const getItem = jest.spyOn(global.localStorage, "getItem");
    getFromStorage("1");

    expect(getItem).toHaveBeenCalled();
  });
  it("returns the right value from local storage", () => {
    global.localStorage.setItem("1", JSON.stringify(posts[0]));
    const post = getFromStorage("1");

    expect(post).toEqual(posts[0]);
  });
});

describe("setToStorage", () => {
  it("sets the right value to storage", () => {
    setToStorage("1", posts[0]);
    const post = global.localStorage.getItem("1");
    if (!post) return;

    const parsedPost = JSON.parse(post);
    expect(parsedPost).toEqual(posts[0]);
  });
});

import { TPost } from "@/types";

export const mockPostArray: TPost[] = [
  {
    _id: "1",
    image: "a",
    isDeletedWithChildren: false,
    public: true,
    text: "hello",
    timestamp: "aa",
    title: "a",
    user: { _id: "a", username: "hi" },
  },
];

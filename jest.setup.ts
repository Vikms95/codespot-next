import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;
process.env.PAGES_DIRECTORY = "app";

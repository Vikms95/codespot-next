module.exports = {
  extends: ["plugin:testing-library/react"],
  // 1) Here we have our usual config which applies to the whole project, so we don't put testing-library preset here.

  // 2) We load other plugins than eslint-plugin-testing-library globally if we want to.
  plugins: ["react-hooks"],

  overrides: [
    {
      // 3) Now we enable eslint-plugin-testing-library rules or preset only for matching testing files!
      files: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};

const filter = require("./filter");
const mocks = require("./mocks.json");

describe("Test filter with mocked input", () => {
  for (let i = 0; i < mocks.length; i++) {
    it(mocks[i].description, () => {
      expect(filter(mocks[i].input)).toEqual(mocks[i].output);
    });
  }
});

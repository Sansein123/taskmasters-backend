const { productPriceUnits } = require("../../config");
module.exports = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    expirytime: {
      type: "string",
    },
    status: {
      type: "bool",
    },
  },
  required: ["title", "expirytime"],
  additionalProperties: false,
};

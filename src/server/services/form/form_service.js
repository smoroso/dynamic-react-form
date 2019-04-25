"use strict";

const fs = require("fs");

const getFormDefinition = (formId) => {
  return JSON.parse(fs.readFileSync(`src/config/form/form_definitions/${formId}.json`));
};

module.exports = {
  getFormDefinition
};

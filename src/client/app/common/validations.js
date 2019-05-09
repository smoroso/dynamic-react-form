"use strict";

//----Rules----//

// eslint-disable-next-line no-unused-vars
const requiredFn = (givenValue, _expected) => {
  return !!(givenValue || typeof givenValue === "number");
};

const patternFn = (givenValue, expect) => {
  return new RegExp(expect).test(givenValue);
};

//-----Main-----//

const createValidationObj = (validationFn, errorMessage) => {
  return { validationFn, errorMessage };
};

const getValidationFnsList = () => {
  const requiredObj = createValidationObj(requiredFn, "Required");
  const patternObj = createValidationObj(patternFn, "Unmatching pattern");

  return {
    required: requiredObj,
    pattern: patternObj
  };
};
const validationFnsList = getValidationFnsList();

//-----Exported-----//

const validateForRule = (child, rule) => {
  const ruleKey = Object.keys(rule)[0];
  const ruleValue = Object.values(rule)[0];
  const validationObj = validationFnsList[ruleKey];
  return (validationObj && validationObj.validationFn(child.value, ruleValue)) ? null : validationObj.errorMessage;
};

export {validateForRule};
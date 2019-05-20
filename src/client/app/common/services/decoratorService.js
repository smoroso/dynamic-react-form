"use strict";

import { PRISTINE_STATUS } from "common/constants";

const basicProperties = {errors: [], rules: [], status: PRISTINE_STATUS};
const inputDecorator = (child) => {
  return {value: "", ...basicProperties, ...child};
};
const checkboxDecorator = (child) => {
  return {value: [], ...basicProperties, ...child};
};

//-----Main-----//

//==Child
const stringToDecoratorMapper = () => {
  const inputObjsDecorator = ["date", "email", "text", "select", "radio"].reduce((obj, currentName) => {
    return {[currentName]: inputDecorator, ...obj};
  }, {});
  const checkboxObjsDecorator = ["checkbox"].reduce((obj, currentName) => {
    return {[currentName]: checkboxDecorator, ...obj};
  }, {});
  return {
    ...inputObjsDecorator,
    ...checkboxObjsDecorator
  };
};

const childDecoratorsObj = stringToDecoratorMapper();

/** adds default obj properties to a child object */
const decorateChildDef = (child, index, array) => {
  const decorator = childDecoratorsObj[child.type];
  return decorator.call(this, child, index, array);
};

//==Step
/** adds default obj properties to a step object */
const decorateStep = (step, index) => {
  const clickableAndOpen = index == 0 ? true : false;
  return {status: PRISTINE_STATUS, clickable: clickableAndOpen, open: clickableAndOpen, ...step};
};

export {
  decorateChildDef,
  decorateStep
};
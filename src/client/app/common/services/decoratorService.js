"use strict";

import { PRISTINE_STATUS } from "common/constants";

const inputDecorator = (child) => {
  return {value: "", errors: [], rules: [], status: PRISTINE_STATUS, ...child};
};

//-----Main-----//

const stringToDecoratorMapper = () => {
  const inputObjsDecorator = ["checkbox", "date", "email", "text", "radio", "select"].reduce((obj, currentName) => {
    return {[currentName]: inputDecorator, ...obj};
  }, {});
  return {
    ...inputObjsDecorator
  };
};

const decoratorsObj = stringToDecoratorMapper();

const decorateChildDef = (child, index, array) => {
  const decorator = decoratorsObj[child.type];
  return decorator.call(this, child, index, array);
};

const decorateStep = (step, index) => {
  const clickableAndOpen = index == 0 ? true : false;
  return {status: PRISTINE_STATUS, clickable: clickableAndOpen, open: clickableAndOpen, ...step};
};

export {
  decorateChildDef,
  decorateStep
};
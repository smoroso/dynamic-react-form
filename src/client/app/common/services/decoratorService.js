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
    ...inputObjsDecorator,
    reset: () => {},
    next: () => {},
    submit: () => {}
  };
};

const decoratorsObj = stringToDecoratorMapper();

const decorateChildDef = (child, index, array) => {
  const decorator = decoratorsObj[child.type];
  return decorator.call(this, child, index, array);
};

export {
  decorateChildDef
};
const tap = (value, interceptor) => {
  interceptor(value);
  return value;
};

export {tap};

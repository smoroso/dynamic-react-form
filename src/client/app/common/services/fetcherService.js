const fetchFormDefinition = (formId) => {
  return fetch(`/api/getFormDefinition/${formId}`)
    .then(res => res.json());
};

// TODO: fetch the fromDef on one side; the form data values on another. Then merge both
// TODO2: Decorate the received data. To add methods or empty errors array, etc.

export {
  fetchFormDefinition
};
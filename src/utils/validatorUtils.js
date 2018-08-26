import { validatorMap, exprMessageMap } from './validatorMap';

export const getValidationRule = (item) => {
  const expressionMap = exprMessageMap(item.expr, item.value || item.element);
  return {
    expr: expressionMap.expr,
    value: item.value,
    element: item.element,
    func: expressionMap.expr === 'function' ? item.func : validatorMap[expressionMap.expr],
    message: item.message || expressionMap.message,
  };
};

export const getSelfValidator = validations => (value) => {
  const errors = [];
  validations.map((item) => {
    if (!item.func.call(this, item, value)) errors.push(item.message);
    return null;
  });
  return errors;
};

export const getSiblingValidator = validations => (value, sibling) => {
  const errors = [];
  validations.filter(item => item.element === sibling.name)
    .map((item) => {
      const newItem = { ...item, value: sibling.value };
      if (!newItem.func.call(this, newItem, value)) errors.push(newItem.message);
      return null;
    });
  return errors;
};

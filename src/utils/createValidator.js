import { getValidationRule, getSelfValidator, getSiblingValidator } from './validatorUtils';

export default function createValidator(validations = []) {
  const selfValidationRules = validations
    .filter(item => item.element === undefined)
    .map(rule => getValidationRule(rule));
  const siblingValidationRules = validations
    .filter(item => item.element !== undefined)
    .map(rule => getValidationRule(rule));

  const selfValidator = getSelfValidator(selfValidationRules);
  const siblingValidator = getSiblingValidator(siblingValidationRules);

  return (value, sibling) => {
    if (sibling) {
      return siblingValidator(value, sibling);
    }
    return selfValidator(value);
  };
}

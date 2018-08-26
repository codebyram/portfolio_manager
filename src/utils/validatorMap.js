const validatorMap = {
  req(rule, value) {
    if (value === '' || value === null || value === undefined || (value instanceof Array && value.length === 0)) {
      return false;
    }
    return true;
  },
  selReq(rule, value) {
    return value !== '-1';
  },
  digits(rule, value) {
    return (/^\d{5}$/).test(value);
  },
  alphanumeric(rule, value) {
    const ckAlphaNumeric = /^\w+$/;
    return ckAlphaNumeric.test(value);
  },
  number(rule, value) {
    if (value === undefined) {
      return true;
    }
    const numberVal = +value;
    return numberVal === numberVal;
  },
  email(rule, value) {
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    const ckEmail = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\\+]+)*@[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-\+]+)*(\.[A-Za-z]{2,})$/i;
    return ckEmail.test(value.trim());
  },
  minlen(rule, value) {
    const min = rule.value;
    return String(value).trim().length >= min;
  },
  maxlen(rule, value) {
    const max = rule.value;
    return String(value).trim().length <= max;
  },
  lt(rule, value) {
    const target = parseFloat(rule.value);
    const curvalue = parseFloat(value);
    return curvalue < target;
  },
  gt(rule, value) {
    const target = parseFloat(rule.value);
    const curvalue = parseFloat(value);
    return curvalue > target;
  },
  eq(rule, value) {
    return rule.value === value;
  },
  neq(rule, value) {
    return rule.value !== value;
  },
  url(rule, value) {
    if (value === '') {
      return true;
    }
    const ckUrl = /(http|https|market):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
    return ckUrl.test(value.trim());
  },
  emaillist(rule, value) {
    const emails = value.split(',');
    const ckEmail = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    for (let i = 0; i < emails.length; i = +1) {
      if (emails[i].trim() !== '' && !ckEmail.test(emails[i].trim())) {
        return false;
      }
    }
    return true;
  },
};

const exprMessageMap = (expr, val) => {
  const expression = expr.toLowerCase().trim();
  switch (expression) {
    case 'req':
    case 'required':
      return { expr: 'req', message: 'Required' };
    case 'lt':
    case 'lessthan':
    case 'max':
    case 'maximum':
      return { expr: 'lt', message: `Should be less than ${val}` };
    case 'gt':
    case 'greaterthan':
    case 'min':
    case 'minimum':
      return { expr: 'gt', message: `Should be greater than ${val}` };
    case 'eq':
    case 'equals':
    case 'equalto':
      return { expr: 'eq', message: `Should be equal to ${val}` };
    case 'neq':
    case 'notequals':
    case 'notequalto':
      return { expr: 'neq', message: `Should not be equal to ${val}` };
    case 'maxlen':
    case 'maxlength':
      return { expr: 'maxlen', message: `Length should be less than ${val}` };
    case 'minlen':
    case 'minlength':
      return { expr: 'minlen', message: `Length should be greater than ${val}` };
    default:
      return { expr, message: ` Not a valid ${expr}` };
  }
};

export { validatorMap, exprMessageMap };

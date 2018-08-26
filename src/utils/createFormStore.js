export default function createFormStore(data = {}) {
  const subscriptions = [];

  let dataMap = {};
  Object.keys(data).map((prop) => {
    dataMap[prop] = data[prop];
    return null;
  });

  const subscribe = (func) => {
    subscriptions.push(func);
    return () => {
      subscriptions.splice(subscriptions.indexOf(func), 1);
    };
  };

  const trigger = (type, payload) => {
    subscriptions.forEach((func) => { func(type, payload); });
  };

  // const getUnsubscribe = prop => () => { subscriptions.splice; };

  const get = prop => dataMap[prop];

  const getAll = () => {
    const toReturn = {};
    Object.keys(dataMap).map((prop) => {
      toReturn[prop] = dataMap[prop];
      return null;
    });
    return toReturn;
  };

  const set = (prop, value, silent = false) => {
    dataMap[prop] = value;
    if (!silent) {
      trigger('change', { prop, value });
    }
  };

  const unSet = (prop) => {
    const newDataMap = [];
    Object.keys(dataMap).map((key) => {
      if (key !== prop) {
        newDataMap[key] = dataMap[key];
      }
      return null;
    });
    dataMap = newDataMap;
  };

  const setAll = (map) => {
    dataMap = {};
    Object.keys.map((prop) => {
      dataMap[prop] = map[prop];
      return null;
    });
  };

  return {
    subscribe,
    trigger,
    get,
    getAll,
    set,
    setAll,
    unSet,
  };
}

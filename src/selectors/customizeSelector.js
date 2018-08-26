const customizeSelector = (state) => {
  const { fetching, bucketList, categories } = state.constituent;
  const categoryList = [];
  if (categories) {
    categories.map((cat) => {
      const list = [];
      let totalWeight = 0;
      let totalEditWeight = 0;
      bucketList.reduce((acc, item) => {
        if (item.type === cat) {
          if (item.editWeight === undefined) {
            item.editWeight = item.weight;
          }
          acc.push(item);
          totalWeight += item.weight;
          totalEditWeight = Math.round((totalEditWeight + item.editWeight) * 100) / 100;
        }
        return acc;
      }, list);
      categoryList.push({
        type: cat, list, totalWeight, totalEditWeight,
      });
      return null;
    });
  }
  return { fetching, categoryList };
};

export default customizeSelector;

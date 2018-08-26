const listingSelector = (state) => {
  const { fetching, listing } = state.portfolio;
  return { fetching, listing };
};

export default listingSelector;

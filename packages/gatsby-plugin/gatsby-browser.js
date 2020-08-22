exports.shouldUpdateScroll = ({
  getSavedScrollPosition,
  prevRouterProps: prevLocationObj = {},
  routerProps: locationObj = {},
}) => {
  const { prevLocation } = prevLocationObj;
  const { location } = locationObj;

  if (!(prevLocation && location)) return;

  const stripPath = (path) => path.replace(/[^a-z0-9]/gi, '');

  // if the path changes, we let the browser do its thing
  if (stripPath(location.pathname) !== stripPath(prevLocation.pathname)) {
    return [0, 0];
  }

  // if a query param changes, we want to maintain our previous scroll position
  if (location.search !== prevLocation.search) {
    const position = getSavedScrollPosition(prevLocation);
    if (position) return position;
  }

  // if nothing changed, nothing needs to be done
  return false;
};

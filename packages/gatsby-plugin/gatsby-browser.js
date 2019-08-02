exports.shouldUpdateScroll = ({
  getSavedScrollPosition,
  prevRouterProps: { location: prevLocation },
  routerProps: { location },
}) => {
  const stripPath = path => path.replace(/[^a-z0-9]/gi, '');

  // if the path changes, we let the browser do its thing
  if (stripPath(location.pathname) !== stripPath(prevLocation.pathname)) {
    return true;
  }

  // if a query param changes we want to maintain our previous scroll position
  if (location.search !== prevLocation.search) {
    const position = getSavedScrollPosition(prevLocation);
    if (position) return position;
  }

  // if nothing changed, nothing needs to be done
  return false;
};

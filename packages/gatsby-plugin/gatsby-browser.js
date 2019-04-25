exports.shouldUpdateScroll = ({
  getSavedScrollPosition,
  prevRouterProps,
  routerProps,
}) => {
  if (
    routerProps.location.pathname === prevRouterProps.location.pathname &&
    routerProps.location.search !== prevRouterProps.location.search
  ) {
    window.scrollTo(...getSavedScrollPosition(prevRouterProps.location));
    return false;
  }

  return true;
};

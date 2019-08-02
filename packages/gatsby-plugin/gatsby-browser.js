exports.shouldUpdateScroll = ({
  getSavedScrollPosition,
  prevRouterProps,
  routerProps,
}) => {
  if (
    routerProps.location.pathname === prevRouterProps.location.pathname &&
    routerProps.location.search !== prevRouterProps.location.search
  ) {
    window.scrollTo(
      ...(getSavedScrollPosition(prevRouterProps.location) || [0, 0])
    );
    return false;
  }

  return true;
};

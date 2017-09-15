import pathToRegexp from 'path-to-regexp'

export default routeMap => {
  for (const route of routeMap) {
    if (pathToRegexp(route.path).test(location.pathname)) {
      return route.component
    }
  }
}

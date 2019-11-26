export default {
  auth: {
    isFetching: false,
    isAuthenticated:
      SKIP_AUTHENTICATE || (accessToken && publisherId) ? true : false,
    error: null,
    accessToken,
    publisherId
  }
}
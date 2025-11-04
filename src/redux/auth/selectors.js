export const selectUser = (state) => state.auth;
export const selectUserIsLoading = (state) => state.auth.isLoading;
export const selectUserError = (state) => state.auth.error;
export const selectUserIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUserToken = (state) => state.auth.token;
export const selectUserInfo = (state) => state.auth.userInfo.data;
export const selectUserInfoPlus = (state) => state.auth.userInfo.data;

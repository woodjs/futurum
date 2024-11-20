const storeTokens = (token: string, refreshToken: string): void => {
  if (window.localStorage) {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
  }
}

export default storeTokens

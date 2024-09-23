export enum Routes {
    MAIN = '/',
    LOGIN = '/login',
    SIGNUP = '/signup',
    FORGOT_PASSWORD = '/forgot-password',
    RESET_PASSWORD = '/reset-password',
    // shop
    SHOP = '/shop',
    CATEGORIES = '/shop/:slug',
    // profile
    PROFILE = '/profile',
    WALLET = '/profile/wallet',
    MY_ASSETS = '/profile/assets',
    MY_ORGANIZATIONS = '/profile/organizations',
    PURCHASES = '/profile/purchases',
    MESSAGES = '/profile/messages',
    CART = '/profile/cart',
    FAVORITES = '/profile/favorites',
    TARIFFS = '/profile/tariffs'
}
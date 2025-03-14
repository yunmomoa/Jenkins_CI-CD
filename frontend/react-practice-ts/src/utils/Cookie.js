import { Cookies } from "react-cookie";
const cookies = new Cookies();
export const setCookie = (name, value) => {
    return cookies.set(name, value, { maxAge: 60 * 30 * 1, path: '/' });
};
export const getCookie = (name) => {
    return cookies.get(name);
};
export const removeCookie = (name) => {
    return cookies.set(name, "", { maxAge: 0, path: '/' });
};
export const setIdCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/;`;
};

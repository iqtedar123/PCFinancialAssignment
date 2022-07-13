import jwt from "jwt-decode";

const setCookie = (cname: string, cvalue: string, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const saveJWTInCookie = ({ token }: { token: string }) => {
  var today = new Date();
  today.setHours(today.getHours() + 4);
  setCookie("jwt-cookie", token, 1);
};

export const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const checkIsAuthenticated = () => {
  const jwtToken = getCookie("jwt-cookie");
  return jwtToken !== "undefined" && jwtToken !== ""
    ? jwt<{ username: string }>(jwtToken)?.username
    : undefined;
};

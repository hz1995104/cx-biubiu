/**
 * 浏览器本地存储方法集
 * **/
export const storage = {
  getLocalStorage: function (name: string) {
    if (!name) return;
    return window.localStorage.getItem(name);
  },

  setLocalStorage: function (name: string, content: any) {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },

  deleteLocalStorage: function (name: string) {
    if (!name) return;
    window.localStorage.removeItem(name);
  },
  getSessionStorage: function (name: string) {
    if (!name) return;
    return window.sessionStorage.getItem(name);
  },

  setSessionStorage: function (name: string, content: any) {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
  },

  deleteSessionStorage: function (name: string) {
    if (!name) return;
    window.sessionStorage.removeItem(name);
  },

  clearLocalStorage: function () {
    window.localStorage.clear();
  },

  clearSessionStorage: function () {
    window.sessionStorage.clear();
  },
};

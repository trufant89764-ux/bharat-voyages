const logger = {
  request(method, url, params) {
    const time = (/* @__PURE__ */ new Date()).toISOString();
    console.log(`[API ${time}] ${method} ${url}`, params ? params : "");
  },
  success(method, url, count) {
    const time = (/* @__PURE__ */ new Date()).toISOString();
    console.log(`[API ${time}] \u2713 ${method} ${url}${count !== void 0 ? ` \u2192 ${count} rows` : ""}`);
  },
  error(method, url, error) {
    const time = (/* @__PURE__ */ new Date()).toISOString();
    console.error(`[API ${time}] \u2717 ${method} ${url} \u2192 ${error}`);
  }
};
var stdin_default = logger;
export {
  stdin_default as default
};

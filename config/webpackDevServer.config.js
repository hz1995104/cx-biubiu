"use strict";

const fs = require("fs");
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware");
const paths = require("./paths");
const getHttpsConfig = require("./getHttpsConfig");

const host = process.env.HOST || "0.0.0.0";
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function (proxy, allowedHost) {
  return {
    disableHostCheck: //是否绕过主机检查，不建议这么做，可能受到DNS重新连接攻击
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true",
    compress: true,
    clientLogLevel: "none",
    contentBase: paths.appPublic, //当提供静态文件时，告诉服务器从哪个目录中提供内容
    contentBasePublicPath: paths.publicUrlOrPath,
    watchContentBase: true, //告诉服务器contentBase选项下的文件，然后监听
    hot: true,
    transportMode: "ws",
    injectClient: false,
    sockHost,
    sockPath,
    sockPort,
    publicPath: paths.publicUrlOrPath.slice(0, -1),
    quiet: true,  //除了初始启动信息之外的任何内容都不会被打印到控制台，这也意味着来自 webpack 的错误或警告在控制台不可见
    watchOptions: {
      ignored: ignoredFiles(paths.appSrc),
    },
    https: getHttpsConfig(),
    host,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    public: allowedHost,
    proxy,
    before(app, server) {
      app.use(evalSourceMapMiddleware(server));

      app.use(errorOverlayMiddleware());

      if (fs.existsSync(paths.proxySetup)) {
        require(paths.proxySetup)(app);
      }
    },
    after(app) {
      app.use(redirectServedPath(paths.publicUrlOrPath));

      app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },
  };
};

let proxyObj = {};

proxyObj["/api"] = {
  ws: false,
  target: "http://localhost:8088",
  changeOrigin: true,
  pathRewrite: {
    "^/api": ""
  }
};

module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: proxyObj
  }
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api1',
    createProxyMiddleware({
      target: 'https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app',
      changeOrigin: true,
    })
  );
  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app',
      changeOrigin: true,
    })
  );
};
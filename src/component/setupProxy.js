const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app',
    createProxyMiddleware({
      target: 'https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app',
      changeOrigin: true,
      pathRewrite: {
        '^/port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app': ''
      }
    })
  );
  app.use(
    '/port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app',
    createProxyMiddleware({
      target: 'https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app',
      changeOrigin: true,
      pathRewrite: {
        '^/port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app': ''
      }
    })
  );
};
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({ target: 'https://api.covid19india.org', changeOrigin: true }));

app.listen(3001, () => {
  console.log('Proxy server started on port 3001');
});
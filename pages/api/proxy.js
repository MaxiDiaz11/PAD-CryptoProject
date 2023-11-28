// pages/api/proxy.js
import { createProxyMiddleware } from 'next-http-proxy-middleware';

const proxy = createProxyMiddleware({
  target: ' https://2a98-181-87-31-150.ngrok-free.app', // Replace with your API server URL
  pathRewrite: {
    '^/': '', // Remove '/api/proxy' prefix when forwarding the request
  },
});

export default proxy;
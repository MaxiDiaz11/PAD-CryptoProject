// pages/api/_middleware.js
import proxyMiddleware from './proxy';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function middleware(req, res, next) {
  if (req.url.startsWith('/api/proxy')) {
    return proxyMiddleware(req, res, next);
  }

  next();
}
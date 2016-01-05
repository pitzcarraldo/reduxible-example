import HttpClient from '../helpers/HttpClient';
import CookieManager from '../helpers/CookieManager';

export default function helpers(req) {
  const http = HttpClient.getInstance(req);
  const cookie = CookieManager.getInstance(req);
  return { http, cookie }
}
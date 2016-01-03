import HttpClient from '../helpers/HttpClient';
import CookieManager from '../helpers/CookieManager';

export default function helpers(req) {
  const httpClient = new HttpClient(req);
  const cookieManager = new CookieManager(req);
  return { httpClient, cookieManager }
}
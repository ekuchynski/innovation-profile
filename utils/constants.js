import { Modal } from "antd"

export const URL_PROJECT_SERVICE = 'http://lc-project-service.lc-ci.global.sdl.corp/projects/v3'
export const URL_FMS_SERVICE = 'http://lc-file-management-service.lc-ci.global.sdl.corp/file-management'
export const CLIENT_ID = 'bTPnqZCslwcWZwMMdljGyKyCncVMRMri'
export const CLIENT_SECRET = 'nMfO4VuVvZy7j9CItsnpaLbNQ7JaRa3GIujFt-hFW-YV7Txy-JRxYMFGz_xxIuHX'
export const URL_TOKEN = 'https://sdl-prod.eu.auth0.com/oauth/token'
export const URL_API = 'https://lc-api.sdl.com/public-api/v1'
export const TENANT_ID = '5d5532444f94ca4c91e2c9f0'

export const DEFAULT_HEADERS = {
   'Content-Type': 'application/json',
   'Access-Control-Allow-Headers': '*',
   'Accept': 'application/json',
   'Accept-Encoding': 'gzip, deflate, br',
   'X-LC-Tenant': TENANT_ID,
   'X-RateLimit-Reset': true
}

export const DEFAULT_FETCH_PARAMS = {
   keepalive: true,
   cache: 'no-cache',
   //mode: 'same-origin',
   referrerPolicy: 'same-origin',
}

export async function showApiError(res, errorMessage)
{

   let err = errorMessage;

   try
   {
      const body = await res.json();
      if (body.message) err += '. ' + body.message;
   }
   catch { }

   Modal.error({
      content: err
   });
}

export async function GetToken()
{
   const now = Date.now();
   const currentToken = localStorage.getItem('token');
   const currentTokenExp = localStorage.getItem('tokenExp');

   if (currentToken && (currentTokenExp > now))
      return currentToken;

   const res = await fetch('/api/get_token')
   if (res.ok)
   {
      const body = await res.json();
      console.log(body);

      localStorage.setItem('token', body.access_token);
      localStorage.setItem('tokenExp', now + 60 * 3 * 60000);

      return body.access_token;
   }
}
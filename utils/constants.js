import { Modal } from "antd"

export const URL_PROJECT_SERVICE = 'http://lc-project-service.lc-ci.global.sdl.corp/projects/v3'

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
import { URL_API, DEFAULT_FETCH_PARAMS, DEFAULT_HEADERS, TENANT_ID } from "@/utils/constants"
import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res)
{
  const form = new IncomingForm();
  form.uploadDir = "/Users/eugene/Downloads/";
  form.keepExtensions = true;

  form.keepExtensions = true;

  const formParsed = await form.parse(req);

  let payload = new FormData();
  for (let index = 0; index < formParsed[1].file.length; index++)
  {
    const file = formParsed[1].file[index];
    //const contents = await fs.readFile(file.filepath, {
    //encoding: 'utf8',
    //})
    const contents = await fs.readFile('/Users/eugene/Downloads/innovation-profile/upload/sample1.docx')
    let blob = new Blob([contents])
    payload.append('file', blob, 'sample1.docx');
  }
  payload.append('properties', JSON.stringify({
    name: 'sample1.docx',
    role: 'translatable',
    type: 'native',
    language: 'en-US'
  }))

  let result;
  try
  {
    result = await fetch(`${URL_API}/projects/${formParsed[0].projectId[0]}/source-files`, {
      ...DEFAULT_FETCH_PARAMS,
      headers: {
        'X-LC-Tenant': TENANT_ID,
        //'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        Authorization: `Bearer ${formParsed[0].token[0]}`
      },
      method: 'POST',
      body: payload
    })
  }
  catch (e)
  {
    console.log(e);
    res.status(400).json({ message: 'Error when uploading files. ' + e })
    return;
  }

  if (!result.ok)
  {
    console.log(result);
    let err = 'Error when uploading file. Status: ' + result.statusText + '. ';
    try
    {
      const data = await result.json();
      console.log(data)
      if (data?.message) err += data.message;
    }
    catch { }
    res.status(400).json({ message: err })
  }

  res.status(200).json({});
}
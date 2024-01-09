// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { URL_PROJECT_SERVICE } from "@/utils/constants"

export default async function handler(req, res)
{
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'X-LC-Principal': req.query.token,
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br'
  }

  const result = await fetch(`${URL_PROJECT_SERVICE}/project-templates`, {
    headers: headers,
    keepalive: true,
    method: 'GET',
    cache: 'no-cache',
    mode: 'same-origin',
    referrerPolicy: 'same-origin'
  })

  if (result.ok)
  {
    const data = await result.json();
    console.log(data.projectTemplates[0]);
    res.status(200).json(data.projectTemplates)
  }
  else
  {
    let err = 'Error while retrieving list of project templates. Status: ' + result.statusText + '. ';
    try
    {
      const data = await result.json();
      if (data.message) err += data.message;
    }
    catch { }
    res.status(400).json({ message: err })
  }

}

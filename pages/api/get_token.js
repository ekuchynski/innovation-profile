// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { URL_API, DEFAULT_FETCH_PARAMS, DEFAULT_HEADERS, URL_TOKEN, CLIENT_ID, CLIENT_SECRET } from "@/utils/constants"

export default async function handler(req, res)
{
  console.log('Getting token');

  const result = await fetch(URL_TOKEN, {
    ...DEFAULT_FETCH_PARAMS,
    method: "POST",
    body: JSON.stringify(
      {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "client_credentials",
        "audience": "https://api.sdl.com"
      }
    ),
    headers: DEFAULT_HEADERS
  })

  if (result.ok)
  {
    const body = await result.json();
    res.status(200).json(body);
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

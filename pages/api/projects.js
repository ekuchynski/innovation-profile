// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { URL_API, DEFAULT_FETCH_PARAMS, DEFAULT_HEADERS } from "@/utils/constants"

export default async function handler(req, res)
{
  const result = await fetch(`${URL_API}/projects?fields=id,name,description,dueBy,createdAt,customer,languageDirections,analysisStatistics`, {
    ...DEFAULT_FETCH_PARAMS,
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${req.query.token}`
    },
    method: 'GET',
  })

  if (result.ok)
  {
    const data = await result.json();
    res.status(200).json(data.items)
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

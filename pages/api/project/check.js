import { TENANT_ID, DEFAULT_FETCH_PARAMS, URL_API } from "@/utils/constants"

export default async function handler(req, res)
{
  let result;
  try
  {
    result = await fetch(`${URL_API}/projects/${req.query.projectId}?fields=quote`,
      {
        ...DEFAULT_FETCH_PARAMS,
        headers: {
          'X-LC-Tenant': TENANT_ID,
          Authorization: `Bearer ${req.query.token}`
        },
        method: 'GET'
      })
  }
  catch (e)
  {
    res.status(400).json({ message: 'Error when getting a project. ' + e })
    return;
  }

  if (result.ok)
  {
    const data = await result.json();
    console.log(data)
    res.status(200).json(data)
  }
  else
  {
    let err = 'Error when getting a project. Status: ' + result.statusText + '. ';
    try
    {
      const data = await result.json();
      if (data.message) err += data.message;
    }
    catch { }
    res.status(400).json({ message: err })
  }
}
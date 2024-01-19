import { DEFAULT_HEADERS, DEFAULT_FETCH_PARAMS, URL_API } from "@/utils/constants"

export default async function handler(req, res)
{
  const body = JSON.parse(req.body);

  let result;
  try
  {
    result = await fetch(`${URL_API}/projects/${body.projectId}/start`, {
      ...DEFAULT_FETCH_PARAMS,
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${body.token}`
      },
      method: 'PUT',
    })
  }
  catch (e)
  {
    res.status(400).json({ message: 'Error when starting a project. ' + e })
    return;
  }

  if (result.ok)
  {
    res.status(200).json({})
  }
  else
  {
    let err = 'Error while starting a project. Status: ' + result.statusText + '. ';
    try
    {
      const data = await result.json();
      if (data.message) err += data.message;
    }
    catch { }
    res.status(400).json({ message: err })
  }
}
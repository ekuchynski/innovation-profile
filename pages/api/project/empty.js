import { DEFAULT_HEADERS, DEFAULT_FETCH_PARAMS, URL_API } from "@/utils/constants"

export default async function handler(req, res)
{
  const body = JSON.parse(req.body);

  let result;
  try
  {
    result = await fetch(`${URL_API}/projects`, {
      ...DEFAULT_FETCH_PARAMS,
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${body.token}`
      },
      method: 'POST',
      body: JSON.stringify({
        name: 'new prj 1',
        description: 'Project created form public profile',
        dueBy: '2024-01-31T18:00:00.000Z',
        projectTemplate: {
          id: body.templateId
        },
        location: '429937a349634696aca12cf0b1c83106',
        languageDirections: [
          {
            sourceLanguage: {
              languageCode: 'en-US'
            },
            targetLanguage: {
              languageCode: 'de-DE'
            }
          }
        ]
      })
    })
  }
  catch (e)
  {
    res.status(400).json({ message: 'Error when creating a project. ' + e })
    return;
  }

  if (result.ok)
  {
    const data = await result.json();
    res.status(200).json(data)
  }
  else
  {
    let err = 'Error while creating an empty project. Status: ' + result.statusText + '. ';
    try
    {
      const data = await result.json();
      console.log(data)
      if (data.message) err += data.message;
    }
    catch { }
    res.status(400).json({ message: err })
  }
}
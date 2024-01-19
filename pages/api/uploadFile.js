export const config = {
   api: {
      bodyParser: {
         sizeLimit: '4mb'
      }
   }
}

export default function handler(req, res)
{
   res.status(200).json({ status: 'done' })
}
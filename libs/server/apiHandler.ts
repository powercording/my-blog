import { NextApiRequest, NextApiResponse } from 'next';

export default function apiHandler(
  method: 'POST' | 'GET' | 'DELETE',
  fn: (req: NextApiRequest, res: NextApiResponse) => void,
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (method !== req.method) {
      return res.status(405).end();
    }
    try {
      fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

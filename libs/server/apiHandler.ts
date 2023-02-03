import { NextApiRequest, NextApiResponse } from 'next';

interface ApiType {
  method: 'POST' | 'GET' | 'DELETE';
  fn: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate: boolean;
}

export default function   apiHandler({ method, fn, isPrivate = true }: ApiType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (method !== req.method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(404).json({ ok: false, error: 'Plz loing first.' });
    }
    try {
      fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

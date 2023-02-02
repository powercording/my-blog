import apiHandler from '@libs/server/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { sessionHandler } from '@libs/server/sessionHandler';

async function Confirm(req: NextApiRequest, res: NextApiResponse) {
  const user = req.session.user;

  const profile = await client.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  res.json({ ok: true, profile });
}

export default sessionHandler(
  apiHandler({ method: 'GET', fn: Confirm, isPrivate: true }),
);

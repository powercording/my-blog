import apiHandler from '@libs/server/apiHandler';
import client from '@libs/server/client';
import { sessionHandler } from '@libs/server/sessionHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  const user = await client.user.findUnique({
    where: {
      email: email + '',
    },
  });

  if (user) {
    return res
      .status(200)
      .json({ ok: true, warn: '존재하는 이메일 입니다.' });
  }

  //user will be a null.
  return res.status(200).json(user);
}

export default sessionHandler(
  apiHandler({ method: 'GET', fn: getUser, isPrivate: false }),
);

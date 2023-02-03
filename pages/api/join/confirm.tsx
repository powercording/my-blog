import apiHandler from '@libs/server/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { sessionHandler } from '@libs/server/sessionHandler';

async function Confirm(req: NextApiRequest, res: NextApiResponse) {
  const { payload, email } = req.body;

  const token = await client.token.findUnique({
    where: {
      payload: `${payload}`,
    },
    include: {
      user: true,
    },
  });
  console.log('token data with user in confirm Api', token);

  if (!token) {
    return res.status(404).json({ ok: false });
  }

  if (token?.user?.email !== email) {
    return res.status(404).json({ ok: false });
  }

  const deleteToken = client.token.deleteMany({
    where: {
      userId: token.userId,
    },
  });

  const validUser = client.user.update({
    where: {
      id: token.userId,
    },
    data: {
      vaild: true,
    },
  });

  const [, user] = await Promise.allSettled([deleteToken, validUser]);
  console.log(user);

  if (token?.user?.email === email) {
    req.session.user = {
      id: token?.userId,
    };
  }
  await req.session.save();
  res.status(200).json({ ok: true, user });
}

export default sessionHandler(
  apiHandler({ method: 'POST', fn: Confirm, isPrivate: false }),
);

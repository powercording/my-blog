import { withIronSessionApiRoute } from 'iron-session/next';
import apiHandler from '@libs/server/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';

async function Confirm(req: NextApiRequest, res: NextApiResponse) {
  const { payload, email } = req.body;

  const findToken = client.token.findUnique({
    where: {
      payload: payload + '',
    },
  });

  const findUser = client.user.findUnique({
    where: {
      email,
    },
  });

  const [token, user] = await Promise.all([findToken, findUser]);

  if (!token) {
    return res.status(404).json({ ok: false });
  }

  if (token?.userId !== user?.id) {
    return res.status(404).json({ ok: false });
  }

  if (token?.userId === user?.id) {
    req.session.user = {
      id: token?.userId,
    };
  }
  await req.session.save();

  console.log(`리퀘스트 세션 ${req.session}`);
  res.status(200).json({ ok: true });
}

export default withIronSessionApiRoute(apiHandler('POST', Confirm), {
  cookieName: 'myblog-session',
  password: process.env.NEXT_PUBLIC_SESSION_PWD + '',
});

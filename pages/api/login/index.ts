import apiHandler from '@libs/server/apiHandler';
import client from '@libs/server/client';
import { sessionHandler } from '@libs/server/sessionHandler';
import { NextApiRequest, NextApiResponse } from 'next';



async function Login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  let user;

  user = await client.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || user?.password !== password) {
    return res
      .status(401)
      .json({ ok: false, message: '존재하지 않는 회원 입니다.' });
  }

  if (user.password === password) {
    req.session.user = {
      id: user.id,
    };
  }

  await req.session.save();
  return res.status(200).json({ ok: true });
}

export default sessionHandler(
  apiHandler({ method: 'POST', fn: Login, isPrivate: false }),
);

import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import apiHandler from '@libs/server/apiHandler';

async function Join(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  let user;

  user = await client.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res
      .status(200)
      .json({ ok: false, warn: '이미 존재하는 아이디 입니다.' });
  }

  if (!user) {
    console.log("user dosen't exist. creating user...");
    user = await client.user.create({
      data: {
        email,
        name: email,
        password,
      },
    });
    console.log('userResult :', user);
  }

  const token = await client.token.create({ 
    data: {
      
    }
  });

  return res.status(200).json({ ok: true, ...user });
}

export default apiHandler('POST', Join);

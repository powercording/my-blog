import apiHandler from '@libs/server/apiHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;
  console.log('쿼리이메일', email);

  const user = await client.user.findUnique({
    where: {
      email: email + '',
    },
  });

  console.log(user);
  return res.status(200).json({ user });
}

export default apiHandler('GET', getUser);

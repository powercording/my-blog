import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import apiHandler from '@libs/server/apiHandler';

async function Join(req: NextApiRequest, res: NextApiResponse) {
  // const createdUser = await client.user.create({
  //   data: {
  //     email: 'adoim@naver.com',
  //     name: 'ado',
  //     password: '12345',
  //   },
  // });

  return res.status(200).json({ ok: true });
}

export default apiHandler('POST', Join);

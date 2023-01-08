import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/client';

export default async function Join(req: NextApiRequest, res: NextApiResponse) {
  const createdUser = await client.user.create({
    data: {
      email: 'adoim@naver.com',
      name: 'ado',
      password: '12345',
    },
  });

  return res.status(200).json(createdUser);
}

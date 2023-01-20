import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import apiHandler from '@libs/server/apiHandler';
import nCloudApiHeader from '@libs/utiles/nCloudApiHeader';

const url = `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.NEXT_PUBLIC_NCLOUD_SID}/messages`;

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

  // const token = await client.token.create({
  //   data: {
  //     payload: '페이로드',
  //     user: {
  //       connect: {
  //         id: user.id,
  //       },
  //     },
  //   },
  // });

  // console.log(token);

  const messageBody = {
    type: 'SMS',
    from: '01020732223',
    content: '호잇',
    messages: [
      {
        to: '01020732223',
        content: '암호는 12345 입니다.',
      },
    ],
  };

  await fetch(url, {
    method: 'POST',
    headers: nCloudApiHeader(),
    body: JSON.stringify(messageBody),
  })
    .then(res => res.json().catch(e => console.log(e)))
    .then(json => console.log(json))
    .catch(e => console.log(e));

  return res.status(200).json({ ok: true, ...user });
}

export default apiHandler('POST', Join);

import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import apiHandler from '@libs/server/apiHandler';
import CryptoJS from 'crypto-js';
import axios from 'axios';
const nowTime = Date.now();

function makeSignature() {
  let space = ' ';
  let newLine = '\n';
  let method = 'GET';
  let url =
    'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:293832677997:sdblog/messages';
  let timeStamp = `${nowTime}`;
  let accessKey = `${process.env.NEXT_PUBLIC_NCLOUD_ACCESS}`;
  let secretKey = `${process.env.NEXT_PUBLIC_NCLOUD_SECRET}`;

  let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey + '');
  hmac.update(method);
  hmac.update(space);
  hmac.update(url);
  hmac.update(newLine);
  hmac.update(timeStamp);
  hmac.update(newLine);
  hmac.update(accessKey + '');

  let hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}

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

  await axios
    .post(
      'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:293832677997:sdblog/messages',
      {
        type: 'SMS',
        from: '01020732223',
        content: '테스트메세지 입니다',
        messages: [
          {
            to: '01020732223',
            content: '테스트배열입니다',
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-apigw-timestamp': nowTime,
          'x-ncp-iam-access-key': process.env.NEXT_PUBLIC_NCLOUD_ACCESS,
          'x-ncp-apigw-signature-v2': makeSignature(),
        },
      },
    )
    .then(res => console.log(res))
    .catch(error => console.log('에러', error));
  return res.status(200).json({ ok: true, ...user });
}

export default apiHandler('POST', Join);

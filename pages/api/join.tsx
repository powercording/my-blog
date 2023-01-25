import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import apiHandler from '@libs/server/apiHandler';
import nCloudApiHeader from '@libs/utiles/nCloudApiHeader';
import smtpTransport from '@libs/utiles/email';

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

  const payLoad = Math.floor(100000 + Math.random() * 900000);

  const token = await client.token.create({
    data: {
      payload: payLoad + '',
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  // const messageBody = {
  //   type: 'SMS',
  //   from: '01020732223',
  //   content: '호잇',
  //   messages: [
  //     {
  //       to: '01020732223',
  //       content: '암호는 12345 입니다.',
  //     },
  //   ],
  // };

  // await fetch(url, {
  //   method: 'POST',
  //   headers: nCloudApiHeader(),
  //   body: JSON.stringify(messageBody),
  // })
  //   .then(res => res.json().catch(e => console.log(e)))
  //   .then(json => console.log(json))
  //   .catch(e => console.log(e));

  const mailOptions = {
    from: process.env.NEXT_PUBLICK_EMAIL_ID,
    to: user.email,
    subject: '마이블로그 가입 인증 이메일 입니다.',
    text: `마이블로그 인증 번호는 ${payLoad} 입니다.`,
  };

  const mailResult = await smtpTransport.sendMail(mailOptions);

  return res.status(200).json({ ok: true, ...user });
}

export default apiHandler('POST', Join);

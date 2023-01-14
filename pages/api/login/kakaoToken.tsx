import apiHandler from '@libs/server/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export async function kakaoToken(req: NextApiRequest, res: NextApiResponse) {
  const url = `https://kauth.kakao.com/oauth/token`;
  const code = req.query.code;

  const kakaoToken = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=authorization_code&
      client_id=${process.env.NEXT_PUBLIC_KAKAO_REST}&
      redirec_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT}&
      code=${code}`,
  }).then(res => res.json());
  console.log(kakaoToken);
  res.status(200).redirect('/login');
}

export default apiHandler('GET', kakaoToken);

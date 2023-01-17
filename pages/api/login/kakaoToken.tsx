import apiHandler from '@libs/server/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export async function kakaoToken(req: NextApiRequest, res: NextApiResponse) {
  const url = `https://kauth.kakao.com/oauth/token`;
  const code = req.query.code;

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', process.env.NEXT_PUBLIC_KAKAO_REST + '');
  params.append('redirect_uri', process.env.NEXT_PUBLIC_KAKAO_REDIRECT + '');
  params.append('code', code + '');

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  }

  const kakaoToken = await fetch(url, fetchOptions).then(res => res.json());
  console.log(kakaoToken);

  res.status(302).redirect('/login');
}

export default apiHandler('GET', kakaoToken);

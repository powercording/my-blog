import { NextApiRequest, NextApiResponse } from 'next';
import apiHandler from '@libs/server/apiHandler';

const uri = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT}&response_type=code`;

export async function kakaoLogin(req: NextApiRequest, res: NextApiResponse) {
  fetch(uri, { method: 'GET' }).then(response =>
    res.status(302).redirect(response.url),
  );
}

export default apiHandler('GET', kakaoLogin);

//the button which is sending kakao login request will have an address this file's path. (api/login/kakaoLogin)

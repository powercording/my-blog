import { withIronSessionApiRoute } from 'iron-session/next';

declare module 'iron-session' {
  interface IronSessionData {
    user: {
      id?: number;
    };
  }
}
const cookieOptions = {
  cookieName: 'myblogCookies',
  password: process.env.NEXT_PUBLIC_SESSION_PWD + '',
};

export function sessionHandler(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

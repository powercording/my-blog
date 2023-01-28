import apiHandler from '@libs/server/apiHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function Confirm(req: NextApiRequest, res: NextApiResponse) {
  const { payLoad } = req.body;

  console.log(`콘솔페이로드 ${payLoad}`);
}

export default apiHandler('POST', Confirm);
 
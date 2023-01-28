import CryptoJS from 'crypto-js';

export function signature() {
  const date = Date.now() + '';
  const secretKey = `${process.env.NEXT_PUBLIC_NCLOUD_SECRET}`;
  const accessKey = `${process.env.NEXT_PUBLIC_NCLOUD_ACCESS}`;
  const method = 'POST';
  const space = ' ';
  const newLine = '\n';
  const url2 = `/sms/v2/services/${process.env.NEXT_PUBLIC_NCLOUD_SID}/messages`;

  let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(url2);
  hmac.update(newLine);
  hmac.update(date);
  hmac.update(newLine);
  hmac.update(accessKey);

  let hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}

export default function nCloudApiHeader() {
  const customHeader = new Headers();
  customHeader.append('Content-Type', 'application/json; charset=utf-8');
  customHeader.append('x-ncp-apigw-timestamp', Date.now().toString());
  customHeader.append(
    'x-ncp-iam-access-key',
    process.env.NEXT_PUBLIC_NCLOUD_ACCESS!,
  );
  customHeader.append('x-ncp-apigw-signature-v2', signature());

  return customHeader;
}

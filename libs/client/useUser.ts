import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const key = 'api/user/me';

export default function useUser() {
  const { data } = useSWR(key);
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      // router.replace('join');
      //TODO: 유저확인이 안되면 리디렉션. (어디로?)
    }
  }, [data, router]);

  return {
    id: data?.profile?.id,
    name: data?.profile?.email,
    avatar: data?.profile?.avatar,
    isLoading: !data,
  };
}

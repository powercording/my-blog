import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch('api/user/me', {
      method: 'GET',
    })
      .then(response => response.json().catch(e => console.log(e)))
      .then(json => {
        if (!json.ok) {
          return router.replace('/join');
        }
        if (json.ok) {
          setUser(json.profile);
        }
      });
  }, [router]);

  return user;
}

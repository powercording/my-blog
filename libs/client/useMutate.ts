import { useState } from 'react';

export default function useMutate(url: string) {
  //return state object
  const [state, setState] = useState({
    fetchLoading: false,
    error: undefined,
    data: undefined,
  });

  //return mutating function
  const mutationFunction = (data: any) => {
    setState(prev => ({ ...prev, fetchLoading: true }));

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json().catch(() => {}))
      .then(json => setState(prev => ({ ...prev, data: json })))
      .catch(error => setState(prev => ({ ...prev, error })))
      .finally(() => setState(prev => ({ ...prev, fetchLoading: false })));
  };

  return [mutationFunction, { ...state }] as const;
}

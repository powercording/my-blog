import { useState } from 'react';

interface MutationState<T> {
  loading: boolean;
  error: undefined | Error;
  data?: T;
}

type MutationReturn<T> = [(data: any) => void, () => void, MutationState<T>];

export default function useMutate<T = any>(url: string): MutationReturn<T> {
  //return state object
  const [state, setState] = useState<MutationState<T>>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  //resetData
  const reset = () => {
    setState(prev => ({ ...prev, data: undefined }));
  };

  //return mutating function
  const mutationFunction = (data: any) => {
    setState(prev => ({ ...prev, loading: true }));

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

  return [mutationFunction, reset, { ...state }];
}

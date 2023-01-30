import { useState } from 'react';

interface MutationState<T> {
  loading: boolean;
  error: undefined | Error;
  data?: T;
}

type MutationReturn<T> = [(data: any) => void, MutationState<T>, () => void];

export default function useMutate<T = any>(url: string): MutationReturn<T> {
  //return state object
  const [state, setState] = useState<MutationState<T>>({
    loading: false,
    error: undefined,
    data: undefined,
  });

  //return fetch options to mutation function.
  const fetchOptions = (data: any) => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  };

  //resetData
  const reset = () => {
    setState(prev => ({ loading: false, error: undefined, data: undefined }));
  };

  //return mutating function
  const mutationFunction = (data: any) => {
    setState(prev => ({ ...prev, loading: true }));

    const mutate = fetch(url, fetchOptions(data))
      .then(res => res.json().catch(() => {}))
      .then(json => {
        setState(prev => ({ ...prev, data: json, loading: false }));
        return json;
      })
      .catch(error => setState(prev => ({ ...prev, error, loading: false })));

    return mutate;
  };

  return [mutationFunction, { ...state }, reset];
}

import { useState } from 'react';

interface MutationState<T> {
  loading: boolean;
  error: undefined | Error;
  data?: T;
}

type LoginReturn = {
  ok: boolean;
  data?: any;
  message?: string;
  [key: string]: any;
};

type MutationReturn<T> = [
  (data: any) => Promise<LoginReturn>,
  MutationState<T>,
  () => void,
];

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
  const mutationFunction = async (data: any): Promise<LoginReturn> => {
    setState(prev => ({ ...prev, loading: true }));

    const mutate = await fetch(url, fetchOptions(data));
    const json = await mutate.json().catch(e => {
      console.log(e);
      setState(prev => ({ ...prev, error: e, loading: false }));
    });
    setState(prev => ({ ...prev, data: json, loading: false }));

    return json;
  };

  return [mutationFunction, { ...state }, reset];
}

import { useState } from 'react';

interface MutationState<T> {
  loading: boolean;
  error: undefined | Error;
  data?: T;
}

type MutationReturn<T> = [(data: any) => void, MutationState<T>, () => void];

export default function useMutation<T = any>(url: string): MutationReturn<T> {
  //return state object
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  //resetData
  const reset = () => {
    setData(() => undefined);
  };

  //return mutating function
  const mutationFunction = (fieldData: any) => {
    
    const mutate = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldData),
    })
      .then(result => result.json().catch(() => {}))
      .catch(e => console.log(e));

    return mutate;

    // return new Promise(res => {
    //   const doFetch = fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(fieldData),
    //   }).then(hh => hh.json());

    //   setLoading(() => false);
    //   res(doFetch);
    // });
  };

  return [mutationFunction, { data, loading, error }, reset];
}

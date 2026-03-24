import useSWR from 'swr';

const fetcher = async (url: string) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return response.json();
};

export function useFetch<T>(url: string | null) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

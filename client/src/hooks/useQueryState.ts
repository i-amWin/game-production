import { useSearchParams } from 'react-router';

export const useQueryState = <T extends Record<string, string>>(
  initialState: T
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse the current query parameters and merge with initial state
  const queryState = {
    ...initialState,
    ...Object.fromEntries(searchParams.entries()),
  } as T;

  // Function to update query parameters
  const setQueryState = (newState: Partial<T>) => {
    const updatedParams = new URLSearchParams(searchParams);

    // Update the new query parameters
    Object.entries(newState).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        updatedParams.set(key, value); // Set new value
      } else {
        updatedParams.delete(key); // Remove key if value is null/undefined
      }
    });

    // Update the URL without adding to the history stack
    setSearchParams(updatedParams);
  };

  return [queryState, setQueryState] as const;
};

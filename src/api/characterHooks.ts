import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { fetchCharacter, saveCharacter } from './api';

export const useFetchCharacter = () => {
    return useQuery<any, Error>({
        queryKey: ['character'],
        queryFn: fetchCharacter,
        onSuccess: (fetchedData) => {
          console.log("Character data fetched successfully:", fetchedData);
        },
        onError: (error) => {
          console.error("Error fetching character data:", error);
        },
      } as UseQueryOptions<any, Error>);
};

export const useSaveCharacter = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: saveCharacter,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['character'] });
      },
      onError: (error) => {
        console.error("Error saving character data:", error);
      },
    });
  };

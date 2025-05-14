import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useDelete() {
  const queryClient = useQueryClient();

  const delTaskData = async (id) => {
    let url = `api/tasks/${id}`;
    return await axios
      .delete(url, {
        headers: {
          Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
        },
      })
      .then((response) => response)
      .catch((error) => error);
  };
  const delData = useMutation({
    mutationFn: delTaskData,
    cacheTime: 500,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Data'] });
    },
  });
  return delData;
}

import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useNewComments() {
  const query = useQueryClient();
  let setComment = ({ id, comment }) => {
    return axios
      .post(
        `api/comments`,
        {
          task_id: id,
          content: comment,
        },
        {
          headers: {
            Authorization: 'Bearer 28bdff91e233b9ff99d93849eee0068191774040',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response)
      .catch((error) => error.message);
  };

  let addComment = useMutation({
    mutationFn: setComment,
    onSuccess: () => query.invalidateQueries({ queryKey: ['Data'] }),
  });

  return addComment;
}

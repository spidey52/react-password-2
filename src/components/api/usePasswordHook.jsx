import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { password_list_url } from "../../config";

export const usePassworListdHook = () => {
  const { token } = useSelector((state) => state.user);

  const fetchPasswords = () => {
    return axios.get(password_list_url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };

  return useQuery(["passwords"], fetchPasswords, {
    refetchOnWindowFocus: true,
    select: (res) => res.data,
    placeholderData: { data: [] },

  })
};


export const usePasswordCreateHook = () => {
  const { token } = useSelector((state) => state.user);

  const createPassword = async (password) => {
    return axios.post(password_list_url, password, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  const queryClient = useQueryClient()

  return useMutation(createPassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(["passwords"]);
    }
  })
}

export const usePasswordUpdateHook = () => {
  const { token } = useSelector(state => state.user)

  const updatePassword = ({ id, password }) => {
    console.log(password)
    return axios.patch(`${password_list_url}/${id}`, password, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        id: id
      },
    });
  }

  const queryClient = useQueryClient()

  return useMutation(updatePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(["passwords"]);
    }
  })
}

export const usePasswordDeleteHook = () => {
  const { token } = useSelector(state => state.user)

  const deletePassword = (id) => {
    return axios.delete(`${password_list_url}/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  const queryClient = useQueryClient()

  return useMutation(deletePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(["passwords"]);
    }
  })
}



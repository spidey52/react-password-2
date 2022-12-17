import axios from "axios";
import React from "react";
import { useMutation, useQuery } from "react-query";
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

  const createPassword = (password) => {
    return axios.post(password_list_url, password, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  return useMutation(createPassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(["passwords"]);
    }
  })
}

export const usePasswordUpdateHook = () => {
  const { token } = useSelector(state => state.user)

  const updatePassword = (id, password,) => {
    return axios.patch(`${password_list_url}/${id}`, password, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  return useMutation(updatePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(["passwords"]);
    }
  })
}

export const usePasswordDeleteHook = () => {
  const { token } = useSelector(state => state.user)

  const deletePassword = (id) => {
    return axios.delete(`${password_list_url}/id`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  return useMutation(deletePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(["passwords"]);
    }
  })
}
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {


      const { data } = await axios[method](
        url,
        { ...body, ...props },
        { withCredentials: true }
      );
      onSuccess(data);
      return data;
    } catch (errors) {

      console.log(errors)

      setErrors(

        <ul>

          {errors.response.data.errors &&

            errors.response.data.errors.map((err) => (

              <li key={err.message}> {err.message}</li>
            ))}
        </ul>
      );
    }

    setTimeout(() => {

      setErrors(null);
    }, 2000);
  }
  return { doRequest, errors };
}

export default useRequest;

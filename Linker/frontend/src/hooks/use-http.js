import { useContext, useState, useCallback } from 'react';
import AuthenticateContext from '../utils/authentication';

const useHttp = () => {
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthenticateContext);
  const sendRequest = useCallback(async (url, method, body, responseData) => {
    try {
      setIsLoading(true);
      //! IMPORTANT. replace 192.168.1.6 with your IP. you can find it in the terminal message
      const response = await fetch(`http://192.168.1.6:4000/${url}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCtx.accessToken}`
        },
        body: method === 'GET' ? null : JSON.stringify(body)
      });
      const data = await response.json();
      if (!data.status) {
        throw new Error(data.message);
      }
      setIsError(null);
      responseData !== null && responseData(data.data);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return { isLoading, isError, sendRequest };
};
export default useHttp;

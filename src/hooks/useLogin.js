import {useState} from 'react';
import {LOGIN_URL} from '../constants/api_urls';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState(null);
  const [errors, setErrors] = useState(null);

  const login = async (params, successCallback) => {
    setLoading(true);
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const json = await res.json();
      setLoading(false);
      if (res.ok) {
        setUser(json.user);
        setOtp(json.otp);
        successCallback();
      } else {
        setErrors(json.message);
      }
    } catch (err) {
      console.error('ERROR =============> ', err);
      setErrors(err);
    }
  };

  return {
    loading,
    user,
    otp,
    errors,
    login,
  };
};

export default useLogin;

import { Fragment, useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Http } from './Http';

export const Interceptor = () => {
  const [reqInterceptor, setReqInterceptor] = useState<number | null>(null);
  const [resInterceptor, setResInterceptor] = useState<number | null>(null);

  const requestInterceptor = () => {
    const reqInter = Http.interceptors.request.use(
      config => {
        config.headers.set('App-Version', 'v1.20');

        return config;
      },
      error => Promise.reject(error)
    );

    setReqInterceptor(reqInter);
  };

  const responseInterceptor = () => {
    const resInter = Http.interceptors.response.use(
      response => response,
      (_error: AxiosError) => {
        if (_error.status === 400) {
          toast.error(_error.message);
          return Promise.reject(_error);
        }

        const defaultError = new AxiosError(
          'Ocurió un error. Intente más tarde 😥'
        );

        toast.error(defaultError.message);
        return Promise.reject(defaultError);
      }
    );

    setResInterceptor(resInter);
  };

  const clearInterceptors = () => {
    if (reqInterceptor !== null) {
      Http.interceptors.request.eject(reqInterceptor);
      setReqInterceptor(null);
    }

    if (resInterceptor !== null) {
      Http.interceptors.response.eject(resInterceptor);
      setResInterceptor(null);
    }
  };

  useEffect(() => {
    requestInterceptor();
    responseInterceptor();

    return () => {
      clearInterceptors();
    };
  }, []);

  return <Fragment />;
};

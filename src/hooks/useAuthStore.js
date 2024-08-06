import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { onChecking, onClearErrorMessage, onLogin, onLogout } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth', { email, password });

      // * Guardamos el token.
      localStorage.setItem('token', data.token);
      // * Guardamos la fecha en el que el token se crea.
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));

      //   * Agrego un timeout porque al ser sincrono le damos un tiempito para mostrar el error y limpiarlo!
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);

      console.log(error);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });

      console.log({ data });

      // * Guardamos la fecha en el que el token se crea.
      localStorage.setItem('token', data.token);
      // * Guardamos la fecha en el que el token se crea.
      localStorage.setItem('token-init-date', new Date().getTime());

      // *Ingresamos.
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || '--'));
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 10);
      console.log({ error });
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    console.log({ token });
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get('auth/renew');

      // *  Guardamos el token.
      localStorage.setItem('token', data.token);
      // * Guardamos la fecha en el que el token se crea.
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log({ error });
      // * Si hay un error al validar el token, limpiamos el localStorage para borrar el token ya expirado!
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();

    dispatch(onLogout());
  };

  return {
    // * Properties
    errorMessage,
    status,
    user,

    // * Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};

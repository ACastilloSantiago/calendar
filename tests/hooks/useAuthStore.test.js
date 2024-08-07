import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { authSlice } from '../../src/store';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { Provider } from 'react-redux';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe('Pruebas en useAuthStore', () => {
  test('Debe de regresar los valores por defecto ', () => {
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      errorMessage: undefined,
      status: 'checking',
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  test('startLogin debe de realizar el login correctamente', async () => {
    localStorage.clear();
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    // * Como en este caso la funcion que vamos a testear "startLogin", es asincron podemos sin problema manejarlo con async-await. Pero el act tambien necesitara el async-await
    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({
      errorMessage,
      status,
      user,
    }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test user', uid: '66b257df0af55b6dc4083f54' },
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('startLogin debe de fallar la autenticación', async () => {
    localStorage.clear();
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: 'queace@gmal.cos',
        password: '123457435',
      });
    });

    const { errorMessage, status, user } = result.current;

    expect(localStorage.getItem('token')).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      // * Como el error Message viene del backend podriamos esperar que venga cualquier STRING, por si en algun momento el backend cambia la respuesta!
      errorMessage: 'Credenciales incorrectas',
      status: 'not-authenticated',
      user: {},
    });

    //   * Como en nuestra función tenemos un setTimout, utilizamos el waitFor para que espere a que cambie el valor. En caso de que no suceda nos dara error
    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });
});

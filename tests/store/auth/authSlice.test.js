import {
  authSlice,
  onChecking,
  onClearErrorMessage,
  onLogin,
  onLogout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Pruebas en authSlice', () => {
  test('Debe de regresar el estado inicial', () => {
    //* Utilizo un fixture para hacer las comparaciones de las variaciones con los reducers!
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('Debe de regresar un login ', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));

    expect(state).toEqual({
      ...authenticatedState,
      user: testUserCredentials,
    });
  });

  test('Debe de realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual({
      ...notAuthenticatedState,
    });
  });

  test('Debe de realizar el logout con errorMessage', () => {
    const errorMessage = 'Credenciales no válidas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage,
    });
  });

  test('Debe de limpiar el msg de error', () => {
    const errorMessage = 'Credenciales no válidas';
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    const newState = authSlice.reducer(state, onClearErrorMessage());

    expect(newState.errorMessage).toBe(undefined);
  });
  test('Debe de realizar el checking', () => {
    const state = authSlice.reducer(authenticatedState, onChecking());


    expect(state.status).toBe('checking');
  });
});

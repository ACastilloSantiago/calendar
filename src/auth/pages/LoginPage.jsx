import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,

    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const onloginSubmit = (event) => {
    event.preventDefault();

    startLogin({ email: loginEmail, password: loginPassword });
  };
  const onRegisterSubmit = (event) => {
    event.preventDefault();

    if (registerPassword !== registerPassword2) {
      Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });

    console.log({
      registerName,
      registerEmail,
      registerPassword,
      registerPassword2,
    });
  };

  return (
    <div className="container login-container">
      <div className="row w-100">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onloginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit w-100" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={onRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit w-100"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

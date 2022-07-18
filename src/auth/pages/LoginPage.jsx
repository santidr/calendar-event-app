import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks';

import './Login.css';

export const LoginPage = () => {
    const { startLogin, startRegister, errorMessage } = useAuthStore()

    const { register, handleSubmit, formState: { errors: loginErrors } } = useForm()
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: registErrors } } = useForm()

    const loginSubmit = ({ email, password }) => {
        startLogin({ email, password })
    }

    const registerSubmit = ({ email, name, password, password2 }) => {
        if (password !== password2) {
            Swal.fire('Register Error', 'Passwords don\'t match.', 'error')
            return
        }

        startRegister({ email, name, password })
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Auth Error', errorMessage, 'error')
        }
    }, [ errorMessage ])


    return (
        <div className="container">
            <div className="row d-flex align-items-center">
                <div className="col-xs-12 col-md-5 offset-md-1 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleSubmit(loginSubmit)}>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Field required'
                                    },
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                        message: 'Email not valid'
                                    }
                                })}
                            />
                            { loginErrors.email && <small className="form-valid-msg">{ loginErrors.email.message }</small> }
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Field required'
                                    }
                                })}
                            />
                            { loginErrors.password && <small className="form-valid-msg">{ loginErrors.password.message }</small> }
                        </div>
                        <div className="d-grid d-gap-2 my-3">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-xs-12 col-md-5 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleSubmit2(registerSubmit)}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                {...register2('name', {
                                    required: {
                                        value: true,
                                        message: 'Field required'
                                    }
                                })}
                            />
                            { registErrors.name && <small className="form-valid-msg">{ registErrors.name.message }</small> }
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                {...register2('email', {
                                    required: {
                                        value: true,
                                        message: 'Field required'
                                    },
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                        message: 'Email not valid'
                                    }
                                })}
                            />
                            { registErrors.email && <small className="form-valid-msg">{ registErrors.email.message }</small> }
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                {...register2('password', {
                                    required: {
                                        value: true,
                                        message: 'Field required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Password length must be 6 chars long.'
                                    }
                                })}
                            />
                            { registErrors.password && <small className="form-valid-msg">{ registErrors.password.message }</small> }
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                {...register2('password2', {
                                    required: {
                                        value: true,
                                        message: 'Field required'
                                    }
                                })}
                            />
                            { registErrors.password2 && <small className="form-valid-msg">{ registErrors.password2.message }</small> }
                        </div>

                        <div className="d-grid d-gap-2 my-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
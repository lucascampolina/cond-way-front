import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser, selectRegistrationStatus, selectRegistrationError} from "../redux/userSlice";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import {useForm} from "react-hook-form";
import {registrationSchema} from '../validationSchemas';
import {zodResolver} from '@hookform/resolvers/zod';
import HeaderSignUp from "./HeaderSignUp";
import Footer from "./Footer";

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(registrationSchema),
    });
    const [showAlert, setShowAlert] = useState(false);
    const [, setErrorMessage] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const registrationStatus = useSelector(selectRegistrationStatus);
    const registrationError = useSelector(selectRegistrationError);

    useEffect(() => {
        if (registrationStatus === 'succeeded') {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } else if (registrationStatus === 'failed') {
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    }, [registrationStatus, registrationError]);

    const onSubmit = async (formData) => {
        console.log("Form data submitted:", formData);
        const user = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            passwordConfirmation: formData.passwordConfirmation,
            marketingAccept: formData.marketingAccept,
        };

        dispatch(registerUser(user))
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (

        <section className="bg-white py-8 px-4 sm:px-10">
            <HeaderSignUp/>
            {showAlert && (
                <div className="alert-container">
                    <SuccessAlert
                        message="Usuário cadastrado."
                        description='Usuário salvo com sucesso.'
                        onClose={handleCloseAlert}
                    />
                </div>
            )}

            {showErrorAlert && (
                <div className="alert-container">
                    <ErrorAlert
                        message="Erro"
                        description={
                            registrationError.message || "Um erro ocorreu durante a operação."
                        }
                        onClose={() => {
                            setErrorMessage(null);
                            setShowErrorAlert(false);
                        }}
                    />
                </div>
            )}

            <div className="max-w-3xl mx-auto">
                <form action="#" className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                Nome
                            </label>

                            <input
                                type="text"
                                id="FirstName"
                                name="firstName"
                                placeholder="Digite o seu primeiro nome"
                                className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 ${errors.firstName ? 'border-red-500' : ''}`}
                                {...register("firstName")}
                            />
                            {errors.firstName &&
                                <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                Sobrenome
                            </label>

                            <input
                                type="text"
                                id="LastName"
                                name="lastName"
                                placeholder="Digite o seu sobrenome"
                                className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2  ${errors.lastName ? 'border-red-500' : ''}`}
                                {...register("lastName")}
                            />
                            {errors.lastName &&
                                <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                            E-mail
                        </label>

                        <input
                            type="email"
                            id="Email"
                            name="email"
                            placeholder="Digite o seu e-mail"
                            className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"  ${errors.email ? 'border-red-500' : ''}`}
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>

                            <input
                                type="password"
                                id="Password"
                                name="password"
                                placeholder="Digite a sua senha"
                                className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"  ${errors.password ? 'border-red-500' : ''}`}
                                {...register("password")}
                            />
                            {errors.password &&
                                <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="PasswordConfirmation"
                                   className="block text-sm font-medium text-gray-700">
                                Confirmação da senha
                            </label>

                            <input
                                type="password"
                                id="PasswordConfirmation"
                                name="passwordConfirmation"
                                placeholder="Confirme a sua senha"
                                className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 ${errors.password ? 'border-red-500' : ''}`}
                                {...register("passwordConfirmation")}
                            />
                            {errors.passwordConfirmation &&
                                <p className="text-red-500 text-xs italic">{errors.passwordConfirmation.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="MarketingAccept" className="flex items-center">
                            <input
                                type="checkbox"
                                id="MarketingAccept"
                                name="marketingAccept"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                {...register("marketingAccept")}
                            />

                            <span className="ml-2 block text-sm text-gray-900">
                                Eu quero receber e-mails sobre eventos, atualizações de produtos e anúncios da empresa.
                            </span>
                        </label>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Criando a sua conta, você concorda com nossos{" "}
                            <button className="text-indigo-600 hover:text-indigo-500"> termos e condições</button>
                            {" "}
                            e{" "}
                            <button className="text-indigo-600 hover:text-indigo-500"> política de privacidade</button>
                            .
                        </p>
                    </div>

                    <div>
                        <button
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Crie sua conta
                        </button>

                        <p className="mt-2 text-center text-sm text-gray-600">
                            Já tem uma conta? {" "}
                            <button className="font-medium text-indigo-600 hover:text-indigo-500"> Entrar</button>
                            .
                        </p>
                    </div>
                </form>
            </div>
            <Footer/>
        </section>
    );
};

export default RegistrationForm;
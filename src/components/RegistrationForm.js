import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser, selectRegistrationStatus, selectRegistrationError} from "../redux/userSlice";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import {useForm} from "react-hook-form";
import { registrationSchema } from '../validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

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
        console.log("Registration status:", registrationStatus);
        console.log("Registration error:", registrationError);
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
                {showAlert && (
                    <div className="alert-container">
                        <SuccessAlert
                            message="User saved."
                            description='Your user have been saved.'
                            onClose={handleCloseAlert}
                        />
                    </div>
                )}

                {showErrorAlert && (
                    <div className="alert-container">
                        <ErrorAlert
                            message="Error"
                            description={
                                registrationError.message || "An error occurred during registration."
                            }
                            onClose={() =>  {
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
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    id="FirstName"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 ${errors.firstName ? 'border-red-500' : ''}`}
                                    {...register("firstName")}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    id="LastName"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2  ${errors.lastName ? 'border-red-500' : ''}`}
                                    {...register("lastName")}
                                />
                                {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                id="Email"
                                name="email"
                                placeholder="Enter your email"
                                className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"  ${errors.email ? 'border-red-500' : ''}`}
                                {...register("email")}
                            />
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2"  ${errors.password ? 'border-red-500' : ''}`}
                                    {...register("password")}
                                />
                                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="PasswordConfirmation"
                                       className="block text-sm font-medium text-gray-700">
                                    Password Confirmation
                                </label>

                                <input
                                    type="password"
                                    id="PasswordConfirmation"
                                    name="passwordConfirmation"
                                    placeholder="Confirm your password"
                                    className={`mt-1 w-full rounded-md border-gray-300 shadow-sm p-2 ${errors.password ? 'border-red-500' : ''}`}
                                    {...register("passwordConfirmation")}
                                />
                                {errors.passwordConfirmation && <p className="text-red-500 text-xs italic">{errors.passwordConfirmation.message}</p>}
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
                                I want to receive emails about events, product updates and company announcements.
                            </span>
                            </label>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                By creating an account, you agree to our{" "}
                                <button className="text-indigo-600 hover:text-indigo-500"> terms and
                                    conditions  </button>{" "}
                                 and{" "}
                                <button className="text-indigo-600 hover:text-indigo-500"> privacy policy</button>.
                            </p>
                        </div>

                        <div>
                            <button
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create an account
                            </button>

                            <p className="mt-2 text-center text-sm text-gray-600">
                                Already have an account?
                                <button className="font-medium text-indigo-600 hover:text-indigo-500"> Log in</button>.
                            </p>
                        </div>
                    </form>
                </div>
            </section>
    );
};

export default RegistrationForm;
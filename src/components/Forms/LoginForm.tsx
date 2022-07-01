import React from "react";
import s from './forms.module.scss'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../Redux/redux-store";
import {signIn} from "../../Redux/authReducer"

const validationSchemaLoginForm = Yup.object().shape({
    email: Yup.string()
        .email('The email is incorrect')
        .required('Please enter your email'),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

type LoginFormType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

export const LoginForm : React.FC= () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const dispatch: AppDispatch = useDispatch()

    const onSubmit = (values: LoginFormType, {setFieldValue}: any) => {
        dispatch(signIn(
            values.email,
            values.password,
            values.rememberMe,
            values.captcha,
            setFieldValue
            ));
    }

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                rememberMe: false,
                captcha: ""
            }}
            validationSchema={validationSchemaLoginForm}
            onSubmit={onSubmit}
        >
            {({
                errors,
                touched,
                values
            }) => (
                <Form>
                    <div className={s.form_group}>
                        <label htmlFor="email">Email</label>
                        <Field
                            name={'email'}
                            type={'text'}
                            placeholder={'e-mail'}
                            className={(errors.email && touched.email ? s.is_invalid : '') + ( !errors.email && touched.email ? s.is_valid : '') }
                        />
                        <ErrorMessage className={s.info} name="email" component="div" />
                    </div>

                    <div className={s.form_group}>
                        <label htmlFor="password">Password</label>
                        <Field
                            name={'password'}
                            type={'password'}
                            placeholder={'password'}
                            className={(errors.password && touched.password ? s.is_invalid : '') + ( !errors.password && touched.password ? s.is_valid : '') }
                        />
                        <ErrorMessage className={s.info} name="password" component="div" />
                    </div>

                    <div className={s.checkbox}>
                        <label htmlFor={'rememberMe'}> remember me </label>
                        <Field
                            type={'checkbox'}
                            name={'rememberMe'}
                            id='rememberMe' />
                    </div>

                    {captchaUrl &&  <div className={s.form_group}>
                                        <img className={s.captcha} src={captchaUrl}/>
                                        <Field
                                            name={'captcha'}
                                            type={'text'}
                                            placeholder={'Enter symbols'}
                                        />
                                        <ErrorMessage className={s.info} name="captcha" component="div" />
                                    </div>}
                    <button className={s.button_submit} type={'submit'}>Login</button>
                    {/* {values.general ? <div className={s.info}>{values.general}</div>: null} */}
                </Form>
            )}
        </Formik>
    )
}
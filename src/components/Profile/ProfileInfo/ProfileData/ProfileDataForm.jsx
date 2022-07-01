import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from './ProfileData.module.scss'

// const validationSchemaAddPostForm = Yup.object().shape({
//     newPostText: Yup.string('')
//        .min(1, "")
//        .max(100, "Must be shorter than 100 characters")
//        .required("")
//  });

const ProfileDataForm = ({saveProfileData, profile, deactivateEditMode}) => {

const onSubmit = (values, {setFieldValue}) => {
    saveProfileData(values, setFieldValue).then(
        () => {
            deactivateEditMode();
        })
    }

    return (
        <Formik
            initialValues={profile}
            // validationSchema={validationSchemaAddPostForm}
            onSubmit={onSubmit}
        >
            {({
                errors,
                touched,
                values
            }) => (
                <Form>
                    <div className={s.form_group}>
                        <label htmlFor="fullName">ФИО</label>
                        <Field
                            name={'fullName'}
                            type={'text'}
                            placeholder={''}
                        />
                        <ErrorMessage className={s.info} name="email" component="div" />
                    </div>
                    <div className={s.form_group}>
                        <label htmlFor="lookingForAJob">Ищу работу:</label>
                        <Field
                            name={'lookingForAJob'}
                            type={'checkbox'}
                        />
                    </div>
                    <div className={s.form_group}>
                        <label htmlFor="lookingForAJobDescription">Твои навыки</label>
                        <Field
                            name={'lookingForAJobDescription'}
                            type={'textarea'}
                            placeholder={''}
                        />
                    </div>
                    <div className={s.form_group}>
                        <label htmlFor="aboutMe">Обо мне</label>
                        <Field
                            name={'aboutMe'}
                            type={'textarea'}
                            placeholder={''}
                        />
                    </div>
                    <h3>Contacts</h3>
                        {Object.keys(profile.contacts).map( (key) => {
                            return (
                                <div key={key} className={s.form_group}>
                                    <label htmlFor={"contacts." + key} >{key}</label>
                                    <Field
                                        name={"contacts." + key}
                                        type={'text'}
                                
                                    />
                                </div>
                            )}
                        )}                    
            <button className={s.buttonEdit} type={'submit'}>Save</button>
            {values.general ? <div className={s.info}>{values.general}</div>: null}
                </Form>
            )}
        </Formik>    )
}

export default ProfileDataForm;

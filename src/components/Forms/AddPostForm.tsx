import React from 'react';
import s from './forms.module.scss'
import { Formik, Form, Field, ErrorMessage, FormikState } from "formik";
import * as Yup from "yup";
import { AppDispatch } from '../../Redux/redux-store';
import { useDispatch } from 'react-redux';
import { actions } from '../../Redux/profileReducer';

const validationSchemaAddPostForm = Yup.object().shape({
   newPostText: Yup.string()
      .min(1, "")
      .max(100, "Must be shorter than 100 characters")
      .required("")
});

type AddPostFormType = {
   newPostText: string
   date: string
}


const AddPostForm: React.FC<AddPostFormType> = (props) => {

   const dispatch: AppDispatch = useDispatch()


   const onSubmit = (values: AddPostFormType, { resetForm }: any) => {
      dispatch(actions.addPost(values.newPostText, props.date))
      resetForm();
   }

   return (
      <Formik
         initialValues={{
            newPostText: "",
            date: ''
         }}
         validationSchema={validationSchemaAddPostForm}
         onSubmit={onSubmit}
      >
         {() => (
            <Form>
               <Field className={s.addMyPost}
                  name={'newPostText'}
                  as={'textarea'}
                  placeholder={'start typing...'}
               />
               <ErrorMessage name="newPostText" component="span" className={s.info} />
               <button className={s.addPostButton} type={'submit'}>Add post</button>
            </Form>
         )}
      </Formik>
   )
}

export default AddPostForm;
import React from 'react';
import s from '../Messages/Messages.module.scss'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AppDispatch } from '../../Redux/redux-store';
import { useDispatch } from 'react-redux';
import { actions } from '../../Redux/messagesReducer';

const validationSchemaAddMassageForm = Yup.object().shape({
   newMessageText: Yup.string()
      .min(1, "")
      .required("")
});

type AddMessageType = {
   newMessageText: string
}

const AddMassageForm: React.FC = () => {

   const dispatch: AppDispatch = useDispatch()

   const onSubmit = (values: AddMessageType, { resetForm }: any) => {
      dispatch(actions.addMessage(values.newMessageText))
      resetForm();
   }

   return (
      <Formik
         initialValues={{
           newMessageText: ""
         }}
         validationSchema={validationSchemaAddMassageForm}
         onSubmit={onSubmit}
      >
         {({errors}) => (
            <Form className={s.input}>
               <Field 
                   name={'newMessageText'}
                   type={'text'}
                   placeholder={'start typing a message...'}
               />
               <button type={'submit'}>Send message</button>
            </Form>
         )}
      </Formik>
   )
}

export default AddMassageForm;
import React from 'react';
import s from './forms.module.scss'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UserFilterType } from '../../Redux/friendsReducer';
import { useSelector } from 'react-redux';
import { getUsersSearchFilter } from '../../Redux/usersSelector';


const validationSchemaUsersSearch = Yup.object().shape({
   term: Yup.string()
      .min(1, "")
});

type Props = {
   onFilterChanged: (filter: UserFilterType) => void
}

const UsersSearchForm: React.FC<Props> = React.memo((props) => {

   const filter = useSelector(getUsersSearchFilter)

   const submit = (values: UserFilterType) => {
      props.onFilterChanged(values)
   }

   return (
      <Formik
         enableReinitialize={true}
         initialValues={{
           term: filter.term, friend: filter.friend
         }}
         validationSchema={validationSchemaUsersSearch}
         onSubmit={submit}
      >
         {({errors}) => (
            <Form className={s.search}>
               <Field 
                   name={'term'}
                   type={'text'}
                   placeholder={'Find somebody...'}
               />
               <Field name="friend" as="select">
                  <option value="">All</option>
                  <option value="true">Only followed</option>
                  <option value="false">Only unfollowed</option>
               </Field>
               <button type={'submit'}>Find</button>
            </Form>
         )}
      </Formik>
   )
})

export default UsersSearchForm;
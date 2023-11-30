import { useTranslation } from 'react-i18next';
import { Formik, Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignUpPage() {
  const { t } = useTranslation();

  return <>
    <Formik initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    }}
    validationSchema={Yup.object({
      firstName: Yup.string()
        .max(15, t('signUpPage.firstName.max'))
        .required(t('signUpPage.firstName.required')),
      lastName: Yup.string()
        .max(20, t('signUpPage.lastName.max'))
        .required(t('signUpPage.lastName.required')),
      email: Yup.string()
        .email(t('signUpPage.email.email'))
        .required(t('signUpPage.email.required')),
      password: Yup.string()
        .min(6, t('signUpPage.password.min'))
        .max(20, t('signUpPage.password.max'))
        .required(t('signUpPage.password.required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], t('signUpPage.confirmPassword.oneOf'))
        .required(t('signUpPage.confirmPassword.required')),
      acceptTerms: Yup.boolean()
        .oneOf([true], t('signUpPage.acceptTerms.oneOf'))
        .required(t('signUpPage.acceptTerms.required')),
    })}
    onSubmit={(values)=>{
      console.log(values);
    }}>
      <Form className="form" autoComplete='off'>
        <div className='FirstName'>
          <label htmlFor="firstName">{t('signUpPage.firstName.label')}</label>
          <Field name="firstName" type="text" />
          <div className="error">
            <ErrorMessage name="firstName" />
          </div>
        </div>
        <div className='LastName'>
          <label htmlFor="lastName">{t('signUpPage.lastName.label')}</label>
          <Field name="lastName" type="text" />
          <div className="error">
            <ErrorMessage name="lastName" />
          </div>
        </div>
        <div className='Email'>
          <label htmlFor="email">{t('signUpPage.email.label')}</label>
          <Field name="email" type="email" />
          <div className="error">
            <ErrorMessage name="email" />
          </div>
        </div>
        <div className='Password'>
          <label htmlFor="password">{t('signUpPage.password.label')}</label>
          <Field name="password" type="password" />
          <div className="error">
            <ErrorMessage name="password" />
          </div>
        </div>
        <div className='ConfirmPassword'>
          <label htmlFor="confirmPassword">{t('signUpPage.confirmPassword.label')}</label>
          <Field name="confirmPassword" type="password" />
          <div className="error">
            <ErrorMessage name="confirmPassword" />
          </div>
        </div>
      </Form>
    </Formik>


  </>;
}

export default SignUpPage;

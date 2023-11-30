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

      </Form>
    </Formik>


  </>;
}

export default SignUpPage;

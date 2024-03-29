// Dependencies
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useLocation, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

// Resources
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { ProgressSpinner } from 'primereact/progressspinner';
import FormField from '../../../sharedcomponents/FormField';
import api from '../../../utils/api';

const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const [messages, setMessages] = useState(new Messages());

  const fieldsValidation = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Campo obligatorio';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Campo obligatorio';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no son iguales';
    }
    return errors;
  };

  const showMessage = (severity, summary, detail) => {
    messages.show({ severity, summary, detail });
  };

  const Reset = async (values, actions) => {
    const aux = { ...values };
    const urlParams = new window.URLSearchParams(location.search);
    const email = urlParams.get('email');
    delete aux.confirmPassword;
    aux.password = CryptoJS.AES.encrypt(aux.password, email).toString();
    const res = await api.User.ResetPassword(aux, location.search);
    switch (res.code) {
      case '01':
        showMessage('success', 'Muy bien!', 'Se actualizaron tus datos');
        setTimeout(() => {
          actions.setSubmitting(false);
          history.push('/');
        }, 3000);
        break;
      default:
        showMessage('error', 'Error!', 'Tu codigo de restablecimiento expiro');
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 3000);
        break;
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: (values) => fieldsValidation(values),
    onSubmit: (values, actions) => { Reset(values, actions); },
  });

  return (
    <>
      <div className="p-col-11 p-sm-10 p-md-8 p-lg-6 p-xl-4">
        <form
          className="form p-grid p-dir-col p-nogutter"
          onSubmit={formik.handleSubmit}
        >
          <hgroup className="heading p-col-11 p-col-align-center">
            <h1 className="title">Por favor, ingresa tu nueva contraseña</h1>
          </hgroup>
          <FormField
            className="mb-15 p-col-11 p-col-align-center"
            disabled={formik.isSubmitting}
            errors={formik.errors.password && formik.touched.password}
            errorMessage={formik.errors.password}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="Contraseña"
            name="password"
            type="password"
            value={formik.values.password}
          />
          <FormField
            className="mb-15 p-col-11 p-col-align-center"
            disabled={formik.isSubmitting}
            errors={formik.errors.confirmPassword && formik.touched.confirmPassword}
            errorMessage={formik.errors.confirmPassword}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
          />
          <div className="mb-15 p-col-10 p-xl-6 p-col-align-center">
            <Button
              label="Establecer nueva contraseña"
              className="button p-button-rounded"
              type="submit"
              disabled={formik.isSubmitting}
            />
          </div>
          {
            formik.isSubmitting && (
              <div className="mb-15 p-col-align-center">
                <ProgressSpinner
                  strokeWidth="6"
                  style={{
                    width: '2rem',
                    height: '2rem',
                  }}
                />
              </div>
            )
          }
          <div className="p-col-11 p-col-align-center">
            <Messages ref={(el) => { setMessages(el); }} />
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;

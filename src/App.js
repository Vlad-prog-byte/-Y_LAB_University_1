import React, { useState } from 'react';
import { useFormik } from 'formik';
import './App.css';
import axios from 'axios';

const validate = values => {
  const errors = {};
  if (!values.password) {
 errors.firstName = 'Обязательное поле';
  } else if (values.password.length < 5) {
 errors.password = 'Длина пароля должна быть больше 5 символов';
  }


  if (!values.email) {
 errors.email = 'Обязятельное поле';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
 errors.email = 'Неправильный адрес';
  }

  return errors;
};


//верные входные данные email === "vlad@gmail.com" && password === "123456"


function App() {
  const [result, setResult] = useState(null);
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      axios.post('/auth', values)
      .then((res) => setResult(res.data.status));
    },
  });
  return (
    <div className='login-page'>
      
      <form className='login-form' onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Почта</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}

        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.errors.password ? <div className='error' >{formik.errors.password}</div> : null}



        <button 
          type="submit"
          disabled={!formik.isValid}
        >
          Войти
        </button>
      </form>
      {!!result ? result === "ok" ? <p className='response'>Успешная аутентификация</p> : <p className='response'>Неверные входные данные</p>
          : null
        }
    </div>
  );
}



export default App;

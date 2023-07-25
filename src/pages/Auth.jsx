import logo from '../assets/twitter-x-logo.png';
import google from '../assets/google.png';
import { useState } from 'react';
import { useFormik } from 'formik';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { option } from '../constants';

const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  // formun gönderilmesi
  const onSubmit = (values) => {
    if (signUp) {
      // kaydol > kullanıcı oluştturucaz
      createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
        .then(() => {
          navigate('/home');
          toast.success('Hesabınız olışturuldu', option);
        })
        .catch((err) =>
          toast.error('Hata oluştu: ' + err.code, option)
        );
      return;
    }

    // login > giriş yapıcaz
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        navigate('/home');
        toast.success('Giriş Yapıldı', option);
      })
      .catch((err) =>
        toast.error('Hata oluştu: ' + err.code, option)
      );
  };

  // form yönetimi
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit,
  });

  return (
    <div className="bg-zinc-800 h-[100vh] grid place-items-center">
      {/* Kutucuk */}
      <div className="bg-black text-white  flex flex-col gap-10 py-16 px-32 rounded-lg ">
        <div className="flex justify-center">
          <img className="h-[60px]" src={logo} />
        </div>
        <h1 className="font-bold text-center text-xl">
          Twitter'a giriş yap
        </h1>

        <div className="flex items-center gap-3 bg-white text-black py-2 px-10 rounded-full cursor-pointer hover:bg-gray-200">
          <img className="h-[20px]" src={google} />
          <span className="whitespace-nowrap">
            Google ile giriş yap
          </span>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col"
        >
          <label>Email:</label>
          <input
            className="text-black rounded p-2 shadow-white mt-3"
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label className="mt-5">Password</label>
          <input
            className="text-black rounded p-2 shadow-white mt-3"
            type="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="bg-white text-black mt-10 rounded-full p-1 font-bold transition-all hover:bg-gray-300 "
          >
            {signUp ? 'Kaydol' : 'Giriş Yap'}
          </button>

          <p className="text-gray-500 mt-5">
            <span>
              {signUp ? 'Hesabınız Var mı ?' : 'Hesabınız Yok mu ?'}
            </span>
            <button
              onClick={() => setSignUp(!signUp)}
              type="button"
              className="mx-3 text-blue-500 disabled:bg-gray-700"
            >
              {signUp ? 'Giriş Yap' : ' Kaydol'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;

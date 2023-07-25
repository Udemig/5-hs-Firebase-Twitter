import { Route, Routes, useNavigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Feed from './pages/Feed';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

  // kullanının uygulamaya girdiği anda çalşır
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // kayıtlı kullanıcı var
        navigate('/home');
      } else {
        // kullanıcı kayıtlı değil (çıkış yapmış)
        navigate('/');
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Feed />} />
    </Routes>
  );
}

export default App;

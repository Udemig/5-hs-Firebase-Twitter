import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <div>
      <button onClick={logoutUser}>Çıkış Yap</button>
    </div>
  );
};

export default Feed;

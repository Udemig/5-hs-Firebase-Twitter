import React from 'react';
import { navSections } from '../constants';
import { auth } from '../firebase/firebaseConfig';
import profileP from '../assets/default-pp.png';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  // çıkış yapma
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="max-h-[100vh] flex flex-col justify-between">
      <div>
        {navSections.map((sec, i) => (
          <div
            className="flex items-center gap-3 rounded p-3 hover:bg-gray-900"
            key={i}
          >
            {sec.icon}
            <span>{sec.title}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <img
          className="rounded-full w-14"
          src={
            auth?.currentUser?.photoURL
              ? auth?.currentUser?.photoURL
              : profileP
          }
        />
        <div className="flex flex-wrap">
          <span>{auth?.currentUser?.displayName}</span>
          <span>
            @{auth?.currentUser?.displayName?.toLowerCase()}
          </span>
        </div>
        <button onClick={handleLogout} className="mx-2 my-4">
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Nav;

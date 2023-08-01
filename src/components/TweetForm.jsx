import React from 'react';
import { auth, db, storage } from '../firebase/firebaseConfig';
import profileP from '../assets/default-pp.png';
import { BsCardImage } from 'react-icons/bs';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const TweetForm = () => {
  // firebase veritabanının referansını alma
  const tweetsCol = collection(db, 'tweets');

  // resmi storage'a yükleyip
  // çağrıldığı yere url'ni gönderiri
  const uploadImage = async (image) => {
    if (image == null) return null;

    // storage da dosya için yer ayarlama
    const stroageRef = ref(
      storage,
      `${new Date().getTime() + image.name}`
    );

    // dosyayı yükleme
    const url = await uploadBytes(stroageRef, image)
      // yükleme bittiği anda foto'nun url'ini alma
      .then((snapshot) => getDownloadURL(snapshot.ref));

    // fonksiyonun çağrıldığı yere veri gönderme
    return url;
  };

  // tweeti veritabanına elke
  const handleSubmit = async (e) => {
    e.preventDefault();
    // mesajı formdan alma
    const content = e.target[0].value;
    const image = e.target[1].files[0];

    // resim varsa onu storage'yükleyü urlni al
    const url = await uploadImage(image);

    // mesaj boşsa göderme
    if (!content) {
      toast.info('Lütfen mesaj alanını doldurun!');
      return;
    }
    // tweet'i kolleksiyona / veritabanına ekle
    await addDoc(tweetsCol, {
      content,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        name: auth.currentUser.displayName,
        profilePic: auth.currentUser.photoURL
          ? auth.currentUser.photoURL
          : profileP,
      },
      likes: [],
    });

    // formu temizleme
    e.target[0].value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 p-4 w-full">
      <img
        className="rounded-full h-[40px]"
        src={
          auth?.currentUser?.photoURL
            ? auth.currentUser.photoURL
            : profileP
        }
      />
      <div className="w-full">
        <input
          className="w-full mx-2 text-gray-400 outline-none bg-black placeholder:text-lg "
          placeholder="Neler Oluyor?"
          type="text"
        />
        <div className="flex items-center justify-between">
          <div className="relative rounded-full cursor-pointer transition duration-200 hover:bg-white/10 p-3">
            <BsCardImage />
            <input
              type="file"
              className="absolute w-full h-ful left-0 top-0 opacity-0"
            />
          </div>
          <button className="bg-blue-600 py-2 px-4 rounded-full hover:bg-blue-500">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;

import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Aside from './../components/Aside';
import Nav from '../components/Nav';
import TweetForm from './../components/TweetForm';
import Post from './../components/Post';
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Feed = () => {
  const [tweets, setTweets] = useState(null);
  // kolleklsiyonun referansını alam
  const tweetsCol = collection(db, 'tweets');

  useEffect(() => {
    // filtreleme yaralarını tanımlama
    // en yaniden eskiye şeklinde olsun
    const queryOptions = query(
      tweetsCol,
      orderBy('createdAt', 'desc')
    );

    // kollleksiyondaki/veritabanındaki değişimi izleme
    // her değiştiğinde state'i güncelleme
    onSnapshot(queryOptions, (snapshot) => {
      const liveTweets = [];

      snapshot.forEach((doc) => {
        liveTweets.push({ ...doc.data(), id: doc.id });
      });

      setTweets(liveTweets);
    });
  }, []);

  return (
    <div className="bg-black text-white min-h-[100vh]">
      <div className="grid grid-cols-5">
        <Nav />

        <main className="col-span-4 md:col-span-3 border min-h-[100vh]">
          <header className="font-bold p-4 border">Ana Sayfa</header>
          <TweetForm />
          {/* atılan tweetler burada listelenecek */}
          {tweets?.map((tweet) => (
            <Post tweet={tweet} />
          ))}
        </main>

        <Aside />
      </div>
    </div>
  );
};

export default Feed;

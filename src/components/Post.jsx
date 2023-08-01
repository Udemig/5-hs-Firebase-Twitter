import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { BiMessageRounded } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { FaRetweet } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import moment from 'moment/moment';
import 'moment/locale/tr';
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import TweetForm from './TweetForm';

const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);

  // timestamp js tarih objesine çevirme
  const tweetDate = new Date(tweet.createdAt?.toDate());

  // kullanıcnın tweet'i beğenip beğenemediğini kontrol etme
  useEffect(() => {
    const found = tweet?.likes?.find(
      (user) => user === auth.currentUser.displayName
    );

    if (found) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [tweet]);

  // like butonuna tıklayınca çalışır
  const handleLike = async (tweet) => {
    // güncellinecek tweet'in referansını alma
    const tweetRef = doc(db, 'tweets', tweet.id);

    // tweetine likes dizisine beğenen kullanıcıyı ekleme
    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.displayName)
        : arrayUnion(auth.currentUser.displayName),
    });
  };
  return (
    <div className="border-b-[0.5px] border-gray-600 p-2 flex space-x-4 ">
      <div>
        <img
          className="rounded-full w-14"
          src={tweet.user.profilePic}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">
              @{tweet.user.name?.toLowerCase()}
            </p>
            <p className="text-gray-400">
              {moment(tweetDate).fromNow()}
            </p>
          </div>
          <div className="me-3 rounded-full p-2 cursor-pointer hover:bg-white/10">
            <BsThreeDots />
          </div>
        </div>
        <div>
          <p>{tweet.content}</p>
          {/* varsa resmi ekran bas */}
          {tweet.imageContent && (
            <img
              className="max-h-56 rounded-lg my-3"
              src={tweet.imageContent}
            />
          )}
        </div>
        <div className="flex items-center space-x-20 mt-2">
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <BiMessageRounded />
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <FaRetweet />
          </div>
          <div
            onClick={() => handleLike(tweet)}
            className="flex items-center gap-2 rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            {tweet.likes.length}
          </div>
          <div className="rounded-full hover:bg-white/10 transition duration-200 p-3 cursor-pointer">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

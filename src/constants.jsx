import { BiHomeCircle } from 'react-icons/bi';
import {
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
} from 'react-icons/ai';
import { RiBookmarkLine } from 'react-icons/ri';

export const option = {
  autoClose: 3000,
};

export const navSections = [
  {
    title: 'Anasayfa',
    icon: <BiHomeCircle />,
  },
  {
    title: 'Bildirimler',
    icon: <AiOutlineBell />,
  },
  {
    title: 'Mesajlar',
    icon: <AiOutlineMail />,
  },
  {
    title: 'Profil',
    icon: <AiOutlineUser />,
  },
  {
    title: 'Favoriler',
    icon: <RiBookmarkLine />,
  },
];

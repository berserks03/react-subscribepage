import { FC } from 'react';
import style from './SocialIcons.module.scss';

interface Props {
  icon: string;
  iconWhite: string;
  name: string;
  link?: string;
}

const SocialIcons: FC<Props> = ({ icon, iconWhite, name, link = '/#' }) => {
  return (
    <a href={link}>
      <div
        className={`${style.circle} 
        ${name === 'facebook' ? style.facebook : ''} 
        ${name === 'instagram' ? style.instagram : ''}
        ${name === 'twitter' ? style.twitter : ''} 
        ${name === 'youtube' ? style.youtube : ''}
      `}
      >
        <img src={icon} alt={name} className={style.icon} />
        <img src={iconWhite} alt={name} className={style.iconWhite} />
      </div>
    </a>
  );
};

export default SocialIcons;

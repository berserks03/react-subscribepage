import React, { FC } from 'react';
import style from './Input.module.scss';
import arrow from '../../assets/images/arrow.svg';

interface Props  {
  placeholder: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValu: string;
  disabled: boolean;
};

const Input: FC<Props> = ({ placeholder, onClick, onChange, inputValu, disabled }) => {
  return (
    <form>
      <div className={style.form}>
        <div className={style.line} />
        <input
          className={style.input}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={inputValu}
        />
        <button
          type="submit"
          className={style.button}
          onClick={onClick}
          disabled={disabled}
        >
          <img src={arrow} alt="arrow"/>
        </button>
      </div>
    </form>
  );
};

export default Input;

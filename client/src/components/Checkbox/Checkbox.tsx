import { FC } from 'react';
import style from './Checkbox.module.scss';
import base from '../../assets/images/base.svg';
import checkmark from '../../assets/images/checkmark.svg';

interface Props {
  selected: boolean;
  onChange: () => void;
}

const Checkbox: FC<Props> = ({ selected, onChange }) => {
  return (
    <div className={`mb-50 ml-36 ${style.checkbox}`}>
      <input
        id='checkbox'
        type='checkbox'
        className={style.input}
        checked={selected}
        onChange={onChange}
      />
      <div className={style.newCheckbox}>
        {selected ? (
          <img src={checkmark} alt="selected"/>
        ) : (
          <img src={base} alt="unselected"/>
        )}
      </div>
      <span className={style.label}>
        <label htmlFor='checkbox'>I agree to </label>
        <a href='/#'>terms of service</a>
      </span>
    </div>
  );
};

export default Checkbox;

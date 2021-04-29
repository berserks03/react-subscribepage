import React, { useState } from 'react';
import style from './Subscription.module.scss';
import Header from '../Header/Header';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import SocialIcons from '../SocialIcons/SocialIcons';
import { socialIconsData } from '../../assets/data/SocialIconsData';
import {
  validateEmail,
  fromColombia,
  getProvider,
} from '../../utils/EmailValidation';
import ProviderDataService from '../../services/ProviderService';
import success from '../../assets/images/success.svg';

const validationMessage = {
  invalid: 'Please provide a valid e-mail address',
  checkbox: 'You must accept the terms and conditions',
  noEmail: 'Email address is required',
  fromColombia: 'We are not accepting subscriptions from Colombia emails',
  serverError:
    'There is a problem with server connection , your subscription was unsuccessful. Please try again later.',
};

const Subscription = () => {
  const [showForm, setShowForm] = useState(true);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [showError, setShowError] = useState(false);
  const [postError, setPostError] = useState(false);

  const [inputValue, setInputValue] = useState('');

  

  const saveProvider = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    var data = {
      email: inputValue,
      provider: getProvider(inputValue),
      selected: false
    };

    if (
      !inputValue ||
      !validateEmail(inputValue) ||
      !checkboxValue ||
      fromColombia(inputValue)
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      ProviderDataService.create(data)
        .then(() => {          
          setShowForm(false);
        })
        .catch((event) => {
          console.log(event);
          setPostError(true);
        });
      console.log(inputValue, 'before');
      setInputValue('');
      console.log(inputValue, 'after');
      setCheckboxValue(false);
    }
  };

  const homeHandler = () => {
    setShowForm(true);
    setPostError(false);
  };

  return (
    <div className={style.wrapper}>
      <Header onClick={homeHandler} />
      <div className={style.content}>
        {showForm ? (
          <div>
            <div className='ml-36'>
              <h1>Subscribe to newsletter</h1>
              <p className='mb-50'>
                Subscribe to our newsletter and get 10% discount on pineapple
                glasses.
              </p>
            </div>
            <Input
              placeholder='Type your email address here…'
              onClick={saveProvider}
              onChange={(event) => setInputValue(event.target.value)}              
              inputValu={inputValue}
              disabled={
                showError &&
                (!inputValue ||
                  !validateEmail(inputValue) ||
                  !checkboxValue ||
                  fromColombia(inputValue))
              }
            />
            {showError && (
              <div className={`mb-50 ${style.validation}`}>
                {!inputValue && <div>{validationMessage.noEmail}</div>}
                {inputValue && !validateEmail(inputValue) && (
                  <div>{validationMessage.invalid}</div>
                )}
                {inputValue && !checkboxValue && (
                  <div>{validationMessage.checkbox}</div>
                )}
                {inputValue &&
                  validateEmail(inputValue) &&
                  fromColombia(inputValue) && (
                    <div>{validationMessage.fromColombia}</div>
                  )}
              </div>
            )}
            {postError && (
              <div className={`mb-50 ${style.validation}`}>
                {validationMessage.serverError}
              </div>
            )}
            <div className='mb-50' />
            <Checkbox
              selected={checkboxValue}
              onChange={() => setCheckboxValue(!checkboxValue)}
            />
          </div>
        ) : (
          <div className='ml-36 mr-36'>
            <img src={success} className={style.successIcon} alt='successful' />
            <h1>Thanks for subscribing!</h1>
            <p className='mb-50'>
              You have successfully subscribed to our email listing. Check your
              email for the discount code.
            </p>
          </div>
        )}
        <div>
          <hr className={`mb-50 ${style.line}`} />
          <div className={style.socials}>
            {socialIconsData.map(({ name, icon, iconWhite }) => {
              return (
                <SocialIcons
                  icon={icon}
                  name={name}
                  iconWhite={iconWhite}
                  key={name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

import React, { useState } from 'react';
import classes from '../css/Language.module.css';

const Language = () => {
  const [lang, setLang] = useState('en');
  const onChangeLang = (e) => {
    setLang(e.target.value);
  };

  return (
    <div className={classes['language']}>
      <select name='lang' id='lang' defaultValue={lang} onChange={onChangeLang}>
        <option value='en'>Engilsh</option>
        <option value='ar'>Arabic</option>
      </select>
    </div>
  );
};
export default Language;

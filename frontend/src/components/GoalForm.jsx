import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';
import { useLanguage } from '../hooks/useLanguage';

function GoalForm() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const { translations } = useLanguage();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText('');
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>{translations.goalText}</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            {translations.addGoal}
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;

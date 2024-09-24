import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='py-8'>
      <section className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-2'>
          Welcome {user && user.name}
        </h1>
        <p className='text-gray-600 dark:text-gray-300'>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='mt-8'>
        {goals.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3 className='text-xl text-gray-600 dark:text-gray-300'>
            You have not set any goals
          </h3>
        )}
      </section>
    </div>
  );
}

export default Dashboard;

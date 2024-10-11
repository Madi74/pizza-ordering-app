import { useEffect} from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import './Dishes.css';
import { fetchMenu } from '../../features/menu.slice';
import DishCard from '../../components/DishCard/DishCard';
import { useNavigate } from 'react-router-dom';

const Dishes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const addClickHandler = () => {
    navigate('/add-dish');
  }

  return (
    <div className='container'>
      <div className='block'>
        <h1 className='title'>Dishes</h1>
        <button className='add_button' onClick={addClickHandler}>Add new Dish</button>
      </div>
        <DishCard />
    </div>
  );
};

export default Dishes;
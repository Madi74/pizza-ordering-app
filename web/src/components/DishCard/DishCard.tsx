import { useNavigate } from 'react-router-dom';
import { deleteDish, selectMenuValue } from '../../features/menu.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './DishCard.css';

const DishCard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dishs = useAppSelector(selectMenuValue);

  const handleEditCard = (id: string) => {
    navigate('/add-dish', { state: {id} });
  };

  const handleDeletCard = async (id: string) => {
    await dispatch(deleteDish(id));
  };

  return (
    <div className='dishes'>
    {dishs.map((dish) => (
        <div key={dish.id} className='dish_card'>
            <img src={dish.image} alt="dish-img" className='dish_card_img'/>
            <p className='dish_card_name'>{dish.title}</p>
            <p className='dish_card_price'>{dish.price} KZT</p>
            <button onClick={() => handleEditCard(dish.id)} className='edit_button'>Edit</button>
            <button onClick={() => handleDeletCard(dish.id)} className='delet_button'>Delete</button>
        </div>
    ))}
    </div>
  )
};

export default DishCard;
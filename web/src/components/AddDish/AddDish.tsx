import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { DishItem, addNewDish, editingDish, selectDishById } from "../../features/menu.slice";
import './AddDish.css';

const AddDish = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const editDish = useAppSelector((state) => selectDishById(state, location.state?.id));
  const [editing, setEditing] = useState(false);

  const [dish, setDish] = useState<DishItem>({
      title: '',
      price: 0,
      image: '',
      id: ''
  });

  useEffect(() => {
    if(location.state && typeof location.state.id === 'string') {
      console.log(location.state.id);
      setEditing(true);
      if(editDish) {
        setDish(editDish);
      }
    }
  }, [location.state]);
  
  const dishChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setDish((prevDish) => ({ ...prevDish, [name]: value }));
  };
  
  const submitNewDishHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValidation()) {
      if(editing && location.state && typeof location.state.id === 'string') {
        await dispatch(editingDish(dish));
      } else {
        await dispatch(addNewDish(dish));
      }
    }
    navigate('/');
  };
  
  const inputValidation = (): boolean => {
    let validation = true;
    if (!dish.title.trim() && !dish.price && !dish.image.trim() ) {
      validation = false;
    };
    return validation;
  };
  
    return (
      <div className='edit_block'>
        {editing 
        ? <h4 className="edit_block-title">Edit dish</h4> 
        : <h4 className="edit_block-title">Add a new dish</h4>}
        <form onSubmit={submitNewDishHandler} className="form_input">
          <input className='Input' type="text" name='title' placeholder='Title' value={dish.title} onChange={dishChangeHandler} />
          <input className='Input' type="number" name='price' placeholder='Price' value={dish.price} onChange={dishChangeHandler}  />
          <input className='Input' type="text" name='image' placeholder='Image URL' value={dish.image} onChange={dishChangeHandler}  />
          {editing 
          ? <button className="order_button" disabled={!inputValidation()}>Save</button> 
          : <button className="order_button" disabled={!inputValidation()}>Add</button>}
        </form>
      </div>
    )
};

export default AddDish;
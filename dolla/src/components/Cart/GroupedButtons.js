import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useDispatch } from 'react-redux';

function GroupedButtons(props) {
 // state = { counter: 0 };

    const dispatch = useDispatch();
 

  const AddToBasketHandler=(id)=>{
    dispatch({type:'ADD_QUANTITY',id:id});
  } 

  const RemoveFromBasketHandler=(id)=>{
    dispatch({type:'SUB_QUANTITY',id:id});
  }

  const handleIncrement = () => {
    this.setState(state => ({ counter: state.counter + 1 }));
  };

 const  handleDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }));
  };
 

    return (
      <>
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={()=>AddToBasketHandler(props.id)}>+</Button>
          {/* { && <Button disabled>{this.props.quantity}</Button>}
          {displayCounter && <Button onClick={this.handleDecrement}>-</Button>}
    */}

       <Button >{props.quantity}</Button>
       <Button onClick={()=>RemoveFromBasketHandler(props.id)}>-</Button>
      </ButtonGroup>
      </>
    );
  
}

export default GroupedButtons;

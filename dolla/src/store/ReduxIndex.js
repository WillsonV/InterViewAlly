import { createStore } from 'redux';
import rootReducer from './rootReducer.js'

//reducer
/*
const RootReducer=(state={counter:0,cart:[{id:'1',name:'C1',price:'200',unit:1}]},action)=>{
    if(action.type==='Add')
    {
        return {counter:state.counter+1}
    }
    if(action.type==='Remove')
    {
        return {counter:state.counter-1}
    }
    
    
    return state
};

*/

//store
//const MainStore=createStore(RootReducer);
const MainStore=createStore(rootReducer);




//dispather



export default MainStore;
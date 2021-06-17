const cartReducer=(state={counter:0,cart:[{id:'1',name:'C1',price:'200',unit:1}]},action)=>{
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

export default cartReducer;
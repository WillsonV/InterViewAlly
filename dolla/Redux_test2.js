const Store= require('redux');
//reducer
const RootReducer=(state,action)=>{return state};



//store
const ReduxStore=Store.createStore(RootReducer);

console.log(ReduxStore.getState);


//dispather
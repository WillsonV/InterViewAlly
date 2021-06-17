//import cartReducer from './cartReducer';
import { combineReducers } from 'redux';

/*
 const rootReducer = combineReducers({
    'cart': cartReducer,
});
*/


 const initState = {
    items: [

        {id:1,title:'Coding Interview Test 1', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1},

         {id:2,title:'Coding Interview 2', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1},

         {id:3,title:'Coding Interview Test 3', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1},

         {id:4,title:'Coding Interview Test 4', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1},

         {id:5,title:'Coding Interview Test 5', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1},

         {id:6,title:'Coding Interview Test 6', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1},

         {id:7,title:'Coding Interview Test 7', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1},

         {id:8,title:'Coding Interview Test 8', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1},

         {id:9,title:'Coding Interview Test 9', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1},

         {id:10,title:'Coding Interview Test 10', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", Features:"Prepare better with us. Get an in-depth 1:1 session. ",
         Features2: "Targeting FAANG or similar tech companies? ",
         Features3:"Increase your chances of getting hired in 60 mins." ,
         Features4:"Get detailed analysis and improve yourself.",
         price:110,unit:1}

      /*  {id:2,title:'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: Item2},
        {id:3,title:'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: Item3},
        {id:4,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:Item4},
        {id:5,title:'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: Item5},
        {id:6,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: Item6}
        */
    ],
    addedItems:[],
    total: 0,
     counter: 0,
     TotalCartItems: 0,
     LoggedInUserName: null

}




const rootReducer=(state=initState,action)=>{
    if (action.type === 'Add') {
        //return {counter:state.counter+1,items:state.items}
          
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1;
            return {
                ...state,
                total: state.total + addedItem.price,TotalCartItems:state.TotalCartItems+1
            }
        }
        else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal,
                TotalCartItems:state.TotalCartItems+1
            }
        
        }
    }
    if(action.type==='Remove')
    {
        return {counter:state.counter-1}
    }
    //INSIDE CART COMPONENT
    if(action.type=== 'ADD_QUANTITY'){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
        let newTotal = state.total + addedItem.price
        let NewTotalCartItems = state.TotalCartItems + 1
          return{
              ...state,
              total: newTotal,
              TotalCartItems:NewTotalCartItems
          }
    }
    if (action.type === 'SUB_QUANTITY') {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            addedItem.quantity -= 1
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
             let NewTotalCartItems = state.TotalCartItems - 1
            return {
                ...state,
                addedItems: new_items,
                total: newTotal,
                TotalCartItems:NewTotalCartItems
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            let NewTotalCartItems = state.TotalCartItems - 1
            return {
                ...state,
                total: newTotal,
                TotalCartItems:NewTotalCartItems
            }
        }
    }
    
    return state
};



export default rootReducer;
import { auth } from "../firebase";
import { useHistory } from 'react-router-dom';


function requireAuth(nextState, replace, next) {
  if (!auth) {
   /* replace({
      pathname: "/login",
      state: {nextPathname: nextState.location.pathname}
    });
    */
    useHistory.push("/Login");
  }
  else
  {
    useHistory.push("/");
  }
 // next();
}

export {requireAuth};   
import {createStore} from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
}

//Reducer is not allowed to have any side effects and must not modify existing state. In redux unlike useReducer's reducer function, we pass the initial state as the default state.
//Before the case used to be in UPPER_CASE. The naming convention is, the domain and then the event (**domain/event**).
function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {...state, balance: state.balance + action.payload}
    case "account/withdraw":
      return {...state, balance: state.balance - action.payload}
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount}
    case "account/payLoan":
      if (state.loan > 0) return state;
      return {...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan}
    default:
      // We used to throe error in the default case. But in redux, it is advised to return the state.
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({type: "account/deposit", payload: 500});
store.dispatch({type: "account/withdraw", payload: 200});
store.dispatch({type: "account/requestLoan", payload: {amount: 1000, purpose: "Buy a car"}})
console.log(store.getState());

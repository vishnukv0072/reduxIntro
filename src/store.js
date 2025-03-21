import {combineReducers, createStore} from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
}

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: ""
}


function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {...state, balance: state.balance + action.payload}
    case "account/withdraw":
      return {...state, balance: state.balance - action.payload}
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount}
    case "account/payLoan":
      return {...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan}
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt }
    case "customer/updateName":
      return {...state, fullName: action.payload}
    default:
      return state
  }
}

function deposit(amount) {
  return {type: "account/deposit", payload: amount}
}

function withdraw(amount) {
  return {type: "account/withdraw", payload: amount}
}

function requestLoan(amount, purpose) {
  return {type: "account/requestLoan", payload: {amount, purpose}}
}

function payLoan() {
  return {type: "account/payLoan"}
}

function createCustomer(fullName, nationalID) {
  //calculations could've been done inside the reducer function. But since date calculation is a side effect and the reducer must always be a pure function, we can't have it inside the reducer.
  return {type: "customer/createCustomer", payload: {fullName, nationalID, createdAt: new Date().toString()}}
}

function updateName(fullName) {
  return {type: "customer/updateName", payload: fullName}
}

const rootReducer = combineReducers({account: accountReducer, customer: customerReducer})
const store = createStore(rootReducer);
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "Buy a car"))
store.dispatch(payLoan())

store.dispatch(createCustomer("John doe", "dd4e75e"))
console.log(store.getState());
store.dispatch(updateName("Jane doe"))
console.log(store.getState());

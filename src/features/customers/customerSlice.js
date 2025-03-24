const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: ""
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
  
  function createCustomer(fullName, nationalID) {
    //calculations could've been done inside the reducer function. But since date calculation is a side effect and the reducer must always be a pure function, we can't have it inside the reducer.
    return {type: "customer/createCustomer", payload: {fullName, nationalID, createdAt: new Date().toString()}}
  }
  
  function updateName(fullName) {
    return {type: "customer/updateName", payload: fullName}
  }

  export default customerReducer;
  export {createCustomer, updateName}
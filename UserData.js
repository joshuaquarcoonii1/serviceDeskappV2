let currentUser = '';

export const setCurrentUser = (username) => {
  currentUser = username;
};

export const getCurrentUser = () => currentUser;


//get contact
let userContact="";

export const setUserContact =(contact)=>{
  userContact=contact;
};
export const getUserContact=()=>userContact;


//get location
let userLocation="";

export const setUserLocation =(location)=>{
  userLocation=location;
};
export const getUserLocation=()=>userLocation;


//get department
let userDepartment="";
export const setUserDepartment =(department)=>{
  userDepartment=department;
};
export const getUserDepartment=()=>userDepartment;

//get email
let userEmail="";
export const setUserEmail =(email)=>{
  userEmail=email;
};
export const getUserEmail=()=>userEmail;

//get contact

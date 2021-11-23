import React from 'react'

// Context object

const UserContext = React.createContext();
console.log(UserContext);

// Provider

export const UserProvider = UserContext.Provider;

export default UserContext;
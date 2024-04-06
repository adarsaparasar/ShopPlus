import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

/*
table schemas
1. user

userid
email
password

2. token
userid
token

1. SIGNUP PAGE
  a. user puts in email and password
  b. table user stores email and password and geenerated a USERID

2. login PAGE
 a.user puts in email and password
 b. find in user table if forthe given email and password there is a user
      1. user is not found - login fialure
      2. user if found  
            a. add a token that userid in token table

  3. add to cart button
        a. will need userid and token
        b. need to check from the token table



*/
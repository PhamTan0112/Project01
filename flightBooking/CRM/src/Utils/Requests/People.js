import axios from "axios";

export const getOwners = () => axios.get("/owners");
export const getUsers = () => axios.get("/users");
export const getGuests = () => axios.get("/guests");

export const updateOwner = (id, body) => axios.put(`/owners/${id}`, body);
export const updateUser = (id, body) => axios.put(`/users/${id}`, body);

export const addOwner = body =>{
    console.log(body)
   return axios.post("/auth-owner/signup", body);
}

export const addUser = body =>{
    console.log(body)
   return axios.post("/auth-user/signup", body);
}
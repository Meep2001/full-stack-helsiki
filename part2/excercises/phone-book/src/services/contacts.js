import axios from "axios";

const baseUrl = "api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const addNewPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const deletePerson=(id)=>{
    return axios.delete(`${baseUrl}/${id}`).then(response=>response.data);
}

const updatePerson=(id,person)=>{
    return axios.put(`${baseUrl}/${id}`,person).then(response=>response.data);
}
export default { getAll,addNewPerson,deletePerson,updatePerson };

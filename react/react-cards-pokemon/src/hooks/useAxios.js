import { useState } from 'react';
import axios from 'axios';
import uuid from "uuid";

const useAxios = (baseUrl) => {
  const [data, setData] = useState([]);

  const addToData = async (endpoint='') => {
    try {
      const res = await axios.get(`${baseUrl}/${endpoint}`);
      const dataToAdd = { ...res.data, id: uuid() };
      setData(data => [...data, dataToAdd]);
    } catch (e) {
      console.error(e);
    }
  };

  return [data, addToData];
};

export default useAxios;
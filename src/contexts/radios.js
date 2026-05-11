import React, { createContext, useState } from "react";
import { api } from "../services/api";

export const ContextApi = createContext({});

function ApiProvider({ children }) {
  const [radios, setRadios] = useState([{}]);
  async function radiosApi() {
    try {
      const response = await api.get("/stations/search", {
        params: {
          tag: "gospel",
          country: "Brazil",
          hidebroken: true,
          limit: 75,
        },
      });

      setRadios(response.data);
    } catch (err) {
      console.log("Erro ao buscar dados da api: ", err);
    }
  }
  return (
    <ContextApi.Provider value={{ radios, radiosApi }}>
      {children}
    </ContextApi.Provider>
  );
}

export default ApiProvider;

import React, { createContext, useState } from 'react';
import { parse } from 'url';
import getAllData from "@/firebase/firestore/getAllData";

const SiteContext = createContext();

  // Crea un provider che conterrà lo stato globale
const SiteContextProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const initialState = [];

const getUsers = async () => {
  const { usersData, error } = await getAllData("users");
  console.log(usersData, "DATA ARRIVED in SITE CONTEXT");
  setSiteState(usersData);
  console.log(error);
};

  const [siteState, setSiteState] = useState(initialState);

  // React.useEffect(() => {
  //   const currentURL = parse(window.location.href);
  //   const roomId = currentURL.pathname.substring(1);

  //   getUsers().then(() => {
  //     setLoading(false);
  //   });
  // }, []);

  

  return (
    <SiteContext.Provider value={[siteState, setSiteState]}>
      {loading ? <div className="loading"><span class="loader"></span></div> : children}
    </SiteContext.Provider>
  );
};

export { SiteContext, SiteContextProvider };
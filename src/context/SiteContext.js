import React, { createContext, useState } from 'react';

const SiteContext = createContext();

  // Crea un provider che conterrà lo stato globale
const SiteContextProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const initialState = [];

  const [siteState, setSiteState] = useState(initialState);

  return (
    <SiteContext.Provider value={[siteState, setSiteState]}>
      {loading ? <div className="loading"><span className="loader"></span></div> : children}
    </SiteContext.Provider>
  );
};

export { SiteContext, SiteContextProvider };
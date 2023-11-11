import React from "react";

export const Context = React.createContext({});

const FormProvider = ({ children, ...rest }) => {
  return <Context.Provider value={rest}>{children}</Context.Provider>;
};

export default FormProvider;

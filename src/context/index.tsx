import React, { FC } from "react";
import { AuthContext, useAuthContext } from "./useAuthContext";

interface IContextConsumer {
  children: React.ReactNode;
}

const ContextConsumer: FC<IContextConsumer> = ({ children }) => {
  const {
    authState,
    accountExtendDetail,
    handleLogOut,
    handleLogged,
    getAccountExtendDetails,
    typePayment,
    setTypePaymentAction,
  } = useAuthContext();

  return (
    <AuthContext.Provider
      value={{
        authState,
        accountExtendDetail,
        handleLogOut,
        handleLogged,
        getAccountExtendDetails,
        typePayment,
        setTypePaymentAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextConsumer;

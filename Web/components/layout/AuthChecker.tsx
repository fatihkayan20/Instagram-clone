import { useAxios } from "hooks/useAxios";
import * as React from "react";

interface AuthCheckerProps {
  readonly children?: React.ReactNode;
}

export const AuthChecker = ({ children }: AuthCheckerProps) => {
  const { setup } = useAxios();

  React.useEffect(() => {
    setup();
  }, [setup]);
  return <>{children}</>;
};

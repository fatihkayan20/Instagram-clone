import { useAxios } from "hooks/useAxios";
import * as React from "react";

interface AuthCheckerProps {
  readonly children?: React.ReactNode;
}

export const AuthChecker = ({ children }: AuthCheckerProps) => {
  const [initialized, setInitialized] = React.useState(false);
  const { setup } = useAxios();

  React.useEffect(() => {
    setup();
    setInitialized(true);
  }, [setup]);

  if (!initialized) {
    return null;
  }

  return <>{children}</>;
};

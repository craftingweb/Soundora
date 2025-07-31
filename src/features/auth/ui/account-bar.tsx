import { LoginButton } from "./login-button.tsx";
import { CurrentUser } from "./current-user/current-user.tsx";
import { useMeQuery } from "../api/use-me-query.tsx";

export const AccountBar = () => {
  const query = useMeQuery();

  return (
    <div>
      {/* Show LoginButton if no user data is returned */}
      {!query.data && <LoginButton />}

      {/* Optionally show CurrentUser component if user data exists */}
      {query.data && <CurrentUser />}
    </div>
  );
};

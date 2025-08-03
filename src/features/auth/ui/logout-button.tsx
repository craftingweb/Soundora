import { useLogoutMutation } from "../api/use-logout-mutation";

export const LogoutButton = () => {
  const mutation = useLogoutMutation();

  const handleLogoutClick = () => {
    mutation.mutate();
  };

  return <button onClick={handleLogoutClick}>Logout</button>;
};

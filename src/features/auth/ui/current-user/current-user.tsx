import { Link } from "@tanstack/react-router";
import styles from "../account-bar.module.css";

import { useMeQuery } from "../../api/use-me-query.tsx";

export const CurrentUser = () => {
  // Use the query to fetch current user data
  const query = useMeQuery();

  // Return the component JSX
  return (
    <div className={styles.meInfoContainer}>
      {/* Render login as a link to 'my-playlists' if data is available */}
      {query.data && (
        <Link to="/my-playlists" activeOptions={{ exact: true }}>
          {query.data!.login}
        </Link>
      )}
    </div>
  );
};

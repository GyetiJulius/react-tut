import { useEffect, useState } from "react";
import UserService, { Users } from "../services/user-service";
import { CanceledError } from "axios";

const useUsers = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = UserService.getAll<Users>();

    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, isLoading, setError, setUsers };
};

export default useUsers;

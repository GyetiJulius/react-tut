import UserService, { Users } from "./services/user-service";
import userService from "./services/user-service";
import useUsers from "./hooks/useUsers";

const App = () => {
  const {users, isLoading, setError, error, setUsers} = useUsers();

  const deleteUser = (user: Users) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    UserService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Julius" };
    setUsers([newUser, ...users]);

    
      UserService.add(newUser).then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: Users) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + " !" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border align-content-center"></div>}
      <button className="btn btn-primary mb-3 " onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item justify-content-between d-flex "
          >
            {user.name}{" "}
            <div>
              <button
                className="btn btn-outline-primary mx-1 "
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;

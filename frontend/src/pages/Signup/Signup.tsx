import { useRef, useState, useEffect } from "react";
import "./Signup.css";

const Signup = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser("");
    setPwd("");
    setSuccess(true);
  };
  return (
    <>
      {success ? (
        <div className="success">
          <h1>Sign up succesfull</h1>
          <div className="gohome">
            <a href="">Go to home</a>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="create">Create your account</div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <div className="buttons">
              <input id="Back" type="button" value="Back" />
              <input id="Create" type="submit" value="Create" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;

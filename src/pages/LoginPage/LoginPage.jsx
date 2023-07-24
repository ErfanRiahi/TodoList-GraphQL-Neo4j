import "./style.css";

export const LoginPage = () => {
  return (
    <form id="loginForm">
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" />
      </div>
      <button id="login-btn">Login</button>
    </form>
  );
};

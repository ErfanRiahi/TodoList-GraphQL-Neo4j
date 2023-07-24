import "./style.css";

export const SignUpPage = () => {
  return (
    <form id="signUpForm">
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" />
      </div>
      <button id="signUp-btn">Sign up</button>
    </form>
  );
};

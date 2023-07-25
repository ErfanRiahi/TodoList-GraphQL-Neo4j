import { Outlet, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignUpLogin } from "./pages/SignUp-Login/SignUpLogin";
import { Tasks } from "./pages/TasksPage/Tasks";
import { AddTask } from "./pages/AddTask/AddTask";
import { EditTask } from "./pages/EditTask/EditTask";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

//  apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

// Layout with Header
const WithHeaderLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

// Layout without Header
const WithoutHeaderLayout = ({ children }) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route element={<WithHeaderLayout />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/editTask" element={<EditTask />} />
        </Route>
        <Route element={<WithoutHeaderLayout />}>
          <Route path="/" element={<SignUpLogin />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;

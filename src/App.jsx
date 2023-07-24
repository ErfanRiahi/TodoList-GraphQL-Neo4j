import { Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignUpLogin } from "./pages/SignUp-Login/SignUpLogin";
import { Tasks } from "./pages/TasksPage/Tasks";
import { AddTask } from "./pages/AddTask/AddTask";
import { EditTask } from "./pages/EditTask/EditTask";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
// import {createMemoryHistory} from "history"

//  apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    // <ApolloProvider client={client}>
    //   <Tasks />
    // {/* <Route path="/" element={<SignUpLogin />} />
    //   <Route path="/signUp" element={<SignUpPage />} />
    //   <Route path="/login" element={<LoginPage />} />
    //   <Route path="/tasks" element={<Tasks />} />
    //   <Route path="/addTask" element={<AddTask />} />
    //   <Route path="/editTask" element={<EditTask />} /> */}
    // {/* </ApolloProvider> */}

    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<SignUpLogin />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/editTask" element={<EditTask />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;

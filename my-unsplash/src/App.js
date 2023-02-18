import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Missing from "./pages/Missing";
import RequireAuth from "./pages/RequireAuth";
import Unauthorized from "./pages/UnAuthorized";
import PersistLogin from "./components/PersistLogin";
import Admin from "./pages/Admin";


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Route */}
      <Route element={<PersistLogin/>}>
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
        </Route>

          {/*
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
          </Route>
          */}


          {/*
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          */}

          {/*
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        */}
      </Route>
      
      {/* Catch all Route */}
      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;

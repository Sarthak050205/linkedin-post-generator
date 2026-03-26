import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Dashboard from "./pages/Dashboard";
import GeneratePost from "./pages/GeneratePost";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="generate" element={<GeneratePost />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  );
}

export default App;
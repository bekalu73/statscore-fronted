import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./lib/constants";
import MainLayout from "./components/layout/MainLayout";
import MatchDetails from "./pages/MatchDetails";
import Fixtures from "./pages/Fixtures";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.FIXTURE} element={<Fixtures />} />
          <Route path={ROUTES.MATCH_DETAILS} element={<MatchDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

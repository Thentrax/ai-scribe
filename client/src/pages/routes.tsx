import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const PatientsPage = lazy(() => import("./Patients"));
const NotesPage = lazy(() => import("./Notes"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PatientsPage />,
  },
  {
    path: "/notes/:id",
    element: <NotesPage />,
  },
];

export default routes;

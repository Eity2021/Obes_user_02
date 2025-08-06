// All components mapping with path for internal routes

import { lazy } from "react";
const Dashboard = lazy(() => import("../../pages/obes/protected/Dashboard"));
const Page404 = lazy(() => import("../../pages/obes/protected/404"));
const Blank = lazy(() => import("../../pages/obes/protected/Blank"));
const Health = lazy(() => import("../../pages/obes/protected/Health"))
const Bmi = lazy(() => import("../../pages/obes/protected/Bmi"));
const Questions = lazy(() => import("../../pages/obes/protected/ObesQuestion"));
const Team = lazy(() => import("../../pages/obes/protected/Team"));
const DietPlan = lazy(() => import("../../pages/obes/protected/DietPlan"));
const Steps = lazy(() => import("../../pages/obes/protected/Steps"));
const ExerciseRoutine = lazy(() => import("../../pages/obes/protected/ExerciseRoutine"));
const DailyTrack  = lazy(() => import("../../pages/obes/protected/DailyTrack"));
const ObesVideos = lazy(() => import("../../pages/obes/protected/ObesVideos"));
const ProfileSettings = lazy(() => import("../../pages/obes/protected/ProfileSettings"));
const GettingStarted = lazy(() => import("../../pages/obes/GettingStarted"));
const DocFeatures = lazy(() => import("../../pages/obes/DocFeatures"));
const DocComponents = lazy(() => import("../../pages/obes/DocComponents"));
const Survey = lazy(() => import("../../pages/obes/protected/Survey"));



const routes = [
  {
    path: "/",
    component: Dashboard,
  },

  {
    path: "/bmi",
    component: Bmi,
  },

  {
    path: "/health",
    component: Health,
  },

  {
    path: "question/survey",
    component: Questions,
  },
  {
    path: "question/surveyList",
    component: Survey,
  },
  {
    path: "obes/stepsOfSeven",
    component: Steps,
  },

  {
    path: "/settings-team",
    component: Team,
  },

  {
    path: "obes/dietPlan",
    component: DietPlan,
  },

  {
    path: "obes/exerciseRoutine",
    component: ExerciseRoutine,
  },
  {
    path: "obes/dailyTrack",
    component: DailyTrack,
  },

  {
    path: "obes/videos",
    component: ObesVideos,
  },


  {
    path: "/profile",
    component: ProfileSettings,
  },

  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },

  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;

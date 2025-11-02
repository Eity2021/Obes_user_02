import {
  Salad,
  FileDiff,
  ReceiptText,
  Captions,
  PictureInPicture2,
  ChartNoAxesGantt,
  BookOpenText,
  Calculator,
  LayoutDashboard,
  BookCheck,
} from "lucide-react";

const iconClasses = `h-6 w-6`;

const userRoutes = [
  {
    path: "/",
    icon: <LayoutDashboard className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/bmi",
    icon: <Calculator className={iconClasses} />,
    name: "BMI",
  },

  {
    path: "questionnaires",
    icon: <Captions className={`${iconClasses} inline`} />,
    name: "Questionnaire",
    submenu: [
      {
        path: "/questionnaires/survey",
        icon: <FileDiff className={iconClasses} />,
        name: "Survey",
      },

      {
        path: "/questionnaires/surveyList",
        icon: <ReceiptText className={iconClasses} />,
        name: "List of Survey",
      },
    ],
  },

  {
    path: "obes",
    icon: <BookCheck className={`${iconClasses} inline`} />,
    name: "OBES School",
    submenu: [
      {
        path: "/obes/dietPlan",
        icon: <Salad className={iconClasses} />,
        name: "Diet Plan",
      },

      {
        path: "/obes/stepsOfSeven",
        icon: <ChartNoAxesGantt className={iconClasses} />,
        name: "7 Best Practice",
      },

      {
        path: "/obes/education",
        icon: <BookOpenText className={iconClasses} />,
        name: "Obes Education",
      },
      {
        path: "/obes/videos",
        icon: <PictureInPicture2 className={iconClasses} />,
        name: "Videos",
      },
    ],
  },
];

export default userRoutes;

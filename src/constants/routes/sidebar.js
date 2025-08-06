import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import { Footprints , Salad , FileDiff,ReceiptText ,Captions  ,PictureInPicture2  ,FileText,SquareActivity  ,BookOpenText ,Calculator,LayoutDashboard  , BookCheck    } from 'lucide-react';

const iconClasses = `h-6 w-6`;

const userRoutes  = [

  {
    path: "/",
    icon: <LayoutDashboard  className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/bmi",
    icon: <Calculator   className={iconClasses} />,
    name: "Bmi",
  },

  {
    path: "/health",
    icon: <SquareActivity  className={iconClasses} />,
    name: "Heath Review",
  },

    {
    path: "question",
    icon: <Captions      className={`${iconClasses} inline`} />,
    name: "Question",
    submenu: [
      {
        path: "/question/survey",
        icon: <FileDiff  className={iconClasses} />,
        name: "Survey",
      },

      {
        path: "/question/surveyList",
        icon: <ReceiptText  className={iconClasses} />,
        name: "List of Survey",
      },
       
    ],
  },

 
  {
    path: "obes",
    icon: <BookCheck   className={`${iconClasses} inline`} />,
    name: "OBES School",
    submenu: [
      {
        path: "/obes/dietPlan",
        icon: <Salad  className={iconClasses} />,
        name: "Diet Plan",
      },

 {
    path: "/obes/stepsOfSeven",
    icon: <Footprints  className={iconClasses} />,
    name: "7 Best Practice",
  },

      {
        path: "/obes/exerciseRoutine",
        icon: <CurrencyDollarIcon className={iconClasses} />,
        name: "Exercise Routine",
      },
       {
        path: "/obes/dailyTrack",
        icon: <CurrencyDollarIcon className={iconClasses} />,
        name: "Daily Track",
      },
       {
        path: "/obes/videos",
        icon: <PictureInPicture2 className={iconClasses} />,
        name: "Videos",
      },
    ],
  },

  // {
  //   path: "learn",
  //   icon: <BookOpenText  className={`${iconClasses} inline`} />,
  //   name: "Learning Material",
  //   submenu: [
  //     {
  //       path: "/learn/Pdf Documentation",
  //       icon: <FileText  className={iconClasses} />,
  //       name: "PDF Documentation",
  //     },

  //     {
  //       path: "/learn/videos",
  //       icon: <PictureInPicture2  className={iconClasses} />,
  //       name: "Videos",
  //     },
      
  //   ],
  // },

];

export default userRoutes ;

import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import { Footprints , FileDiff,ReceiptText ,Captions  ,PictureInPicture2  ,FileText,SquareActivity  ,HeartPulse ,BookOpenText ,Calculator,LayoutDashboard  , BookCheck    } from 'lucide-react';
const iconClasses = `h-6 w-6`;


const routes = [
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
    path: "/stepsOfSeven",
    icon: <Footprints  className={iconClasses} />,
    name: "7 Best Practice",
  },

  {
    path: "obes",
    icon: <BookCheck   className={`${iconClasses} inline`} />,
    name: "OBES School",
    submenu: [
      {
        path: "/obes/dietPlan",
        icon: <CurrencyDollarIcon className={iconClasses} />,
        name: "Diet Plan",
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
  {
    path: "learn",
    icon: <BookOpenText  className={`${iconClasses} inline`} />,
    name: "Learning Material",
    submenu: [
      {
        path: "/learn/Pdf Documentation",
        icon: <FileText  className={iconClasses} />,
        name: "PDF Documentation",
      },

      {
        path: "/learn/videos",
        icon: <PictureInPicture2  className={iconClasses} />,
        name: "Videos",
      },
      
    ],
  },




  // {
  //   path: "",
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline`} />,
  //   name: "Settings",
  //   submenu: [
  //     {
  //       path: "/settings-profile",
  //       icon: <UserIcon className={submenuIconClasses} />,
  //       name: "Profile",
  //     },
  //     {
  //       path: "/settings-billing",
  //       icon: <WalletIcon className={submenuIconClasses} />,
  //       name: "Billing",
  //     },
  //     {
  //       path: "/settings-team", 
  //       icon: <UsersIcon className={submenuIconClasses} />,
  //       name: "Team Members",
  //     },
  //   ],
  // },
  // {
  //   path: "",
  //   icon: <DocumentTextIcon className={`${iconClasses} inline`} />,
  //   name: "Documentation",
  //   submenu: [
  //     {
  //       path: "/app/getting-started",
  //       icon: <DocumentTextIcon className={submenuIconClasses} />,
  //       name: "Getting Started",
  //     },
  //     {
  //       path: "/app/features",
  //       icon: <TableCellsIcon className={submenuIconClasses} />,
  //       name: "Features",
  //     },
  //     {
  //       path: "/app/components",
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
  //       name: "Components",
  //     },
  //   ],
  // },
];

export default routes;

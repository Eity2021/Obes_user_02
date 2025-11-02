import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import { ChartNoAxesGantt ,Salad , FileDiff,ReceiptText ,Captions  ,PictureInPicture2  ,FileText,SquareActivity  ,BookOpenText ,Calculator,LayoutDashboard  , BookCheck    } from 'lucide-react';

const iconClasses = `h-6 w-6`;

const doctorRoutes   = [

  {
    path: "/",
    icon: <LayoutDashboard  className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/bmi",
    icon: <Calculator   className={iconClasses} />,
    name: "BMI",
  },
  {
        path: "/obes/stepsOfSeven",
        icon: <ChartNoAxesGantt className={iconClasses} />,
        name: "7 Best Practice",
      },
    {
    path: "Doctor question",
    icon: <Captions      className={`${iconClasses} inline`} />,
    name: "Questionnaires",
    submenu: [
      {
        path: "/questionnaires/survey",
        icon: <FileDiff  className={iconClasses} />,
        name: "Survey",
      },

      {
        path: "/questionnaires/surveyList",
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
        path: "/learn/pdfDocumentation",
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

];

export default doctorRoutes;

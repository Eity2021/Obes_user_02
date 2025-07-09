/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TableCellsIcon from "@heroicons/react/24/outline/TableCellsIcon";
import WalletIcon from "@heroicons/react/24/outline/WalletIcon";
import CodeBracketSquareIcon from "@heroicons/react/24/outline/CodeBracketSquareIcon";
import CalendarDaysIcon from "@heroicons/react/24/outline/CalendarDaysIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/bmi",
    icon: <InboxArrowDownIcon className={iconClasses} />,
    name: "Bmi",
  },

  {
    path: "/health",
    icon: <ChartBarIcon className={iconClasses} />,
    name: "Heath Review",
  },
  {
    path: "/questions",
    icon: <BoltIcon className={iconClasses} />,
    name: "Question",
  },
  // {
  //   path: "/calendar",
  //   icon: <CalendarDaysIcon className={iconClasses} />,
  //   name: "Calendar",
  // },

  {
    path: "obes",
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />,
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
        icon: <CurrencyDollarIcon className={iconClasses} />,
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

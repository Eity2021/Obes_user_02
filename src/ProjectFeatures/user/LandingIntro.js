import TemplatePointers from "./components/TemplatePointers";
import logo from "../../images/logo.png";

function LandingIntro() {
  return (
    <div className="hero min-h-full rounded-l-xl bg-base-200">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <div className="flex items-center  text-start font-bold ">
            <img src={logo} className="w-32 inline-block mr-2" alt="logo" />
          </div>
          <TemplatePointers />
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;

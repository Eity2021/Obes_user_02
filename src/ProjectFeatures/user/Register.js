import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import LandingIntro from "./LandingIntro";
import useNavigator from "../../hooks/useNavigator";
import { useForm, Controller } from "react-hook-form";
import { setUser } from "../../features/profile/profileSlice";
import { useRegisterMutation } from "../../features/auth/authApi";
import DatePicker from "../../components/datepicker/Datepicker";

function Register() {
  const { handleNavigation } = useNavigator();
  const [selected, setSelected] = useState("user");
  const [smsNumber, setSmsNumber] = useState(null);
  // const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },

  } = useForm();
  console.log("errors", errors)
  const handleSmsNumber = (e) => {
    const newValue = e.target.value;
    setSmsNumber(newValue);
    setValue("smsmobile", newValue);
  };

  const [resRegister, { data, isLoading, error }] =
    useRegisterMutation();

  useEffect(() => {
    if (error?.data) {
      const apiMessage =
        error?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(apiMessage);

      // console.log( "error", error)
    }

    if (data?.token) {
      dispatch(setUser(data?.data?.role));
      toast.success("Successfully! Sign Up");
      handleNavigation("/login");
      localStorage.clear();
    }
  }, [data, handleNavigation, error]);


  const onSubmit = (formData) => {
    console.log(formData)
    // setError("");
    setIsProcessing(true);
    resRegister({
      fulname: formData.fulname,
      ogender: formData.ogender,
      dob: formData.dob,
      ccode: formData.ccode,
      smsmobile: formData.smsmobile,
      logmobile: formData.logmobile,
      logemail: formData.logemail,
      bmdc: formData.bmdc,
      password: formData.password,
      role: formData.role,
    });

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-7xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Register
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label className="font-poppins text-[14px] ">Full Name</label>
                  <input
                    name="fulname"
                    type="text"
                    placeholder="Full Name"
                    {...register("fulname", { required: "Full name is required" })}
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] mt-2"

                  />
                  {errors.fulname && (
                    <p className="text-red-500 text-sm mt-1">{errors?.fulname?.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="font-poppins text-[14px]">Code</label>
                    <input
                      name="ccode"
                      value="88"
                      {...register("ccode", { required: true })}
                      className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] mt-2"
                    />
                    {errors.ccode && (
                      <p className="text-red-500 text-sm mt-1">{errors.ccode.message}</p>
                    )}
                  </div>
                  <div className="col-span-3">
                    <label className="font-poppins text-[14px]">
                      Mobile Number
                    </label>
                    <input
                      name="logmobile"
                      type="number"
                      autoComplete="logmobile"
                      placeholder="Mobile Number"
                      {...register("logmobile", { required: "Phone Number is required" })}
                      onChange={handleSmsNumber}
                      className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] mt-2"
                    />

                    {errors.logmobile && (
                      <p className="text-red-500 text-sm mt-1">{errors.logmobile.message}</p>
                    )}
                  </div>
                </div>

                {smsNumber && (
                  <div className="hidden">
                    <label className="font-poppins text-[14px]">
                      sms Number
                    </label>
                    <input
                      value={smsNumber}
                      onChange={handleSmsNumber}
                      name="smsmobile"
                      type="number"
                      autoComplete="smsmobile"
                      placeholder="Mobile Number"
                      {...register("smsmobile", { required: true })}
                      className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] mt-2"
                    />

                  </div>
                )}

                <div>
                  <label className="text-[14px] font-poppins">
                    Choose Gender
                  </label>
                  <select
                    defaultValue="choose gender"
                    {...register("ogender", { required: "Gender is required" })}
                    className="select border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-none w-[100%] mt-2"
                  >
                    <option disabled>Pick a gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>

                </div>
                {/* {errors.ogender && (
    <p className="text-red-500 text-sm mt-1">{errors?.ogender?.message}</p>
  )}
       */}
                <div>
                  <label className="font-poppins text-[14px]">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    {...register("logemail", { required: "Email is required" })}
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] mt-2"
                  />
                  {errors.logemail && (
                    <p className="text-red-500 text-sm mt-1">{errors.logemail.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="font-poppins text-[14px]">
                      Date Of Birth
                    </label>
                    <Controller
                      name="dob"
                      control={control}
                      rules={{ required: "DOB is required" }}
                      render={({ field }) => (
                        <DatePicker
                          showCalendar={showCalendar}
                          setShowCalendar={setShowCalendar}
                          {...field}
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                          format="YYYY-MM-DD"
                          className="w-full mt-2"
                        />
                      )}
                    />

                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">{errors?.dob?.message}</p>
                    )}

                  </div>

                  <div>
                    <label
                      className="font-serif text-[14px]"
                      style={{ fontFamily: "poppins" }}
                    >
                      Type
                    </label>
                    <div className="flex gap-4 items-center h-12">
                      <label className="flex items-center space-x-2">
                        <input
                          {...register("role", { required: "Role is required" })}
                          type="radio"
                          name="role"
                          value="user"
                          checked={selected === "user"}
                          onChange={() => setSelected("user")}
                          className="accent-primary "
                        />
                        <span>User</span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          {...register("role", { required: "Role is required" })}
                          type="radio"
                          name="role"
                          value="doctor"
                          checked={selected === "doctor"}
                          onChange={() => setSelected("doctor")}
                          className="accent-primary "
                        />
                        <span>Doctor</span>
                      </label>
                    </div>

                    {errors.role && (
                      <p className="text-red-500 text-sm mt-1">{errors?.role?.message}</p>
                    )}
                  </div>
                </div>

                {selected === "doctor" && (
                  <div>
                    <label className="font-poppins text-[14px]">
                      BMDC Number
                    </label>
                    <input
                      name="bmdc"
                      type="text"
                      placeholder="BMDC Number"
                      {...register("bmdc", { required: true })}
                      className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] mt-2"
                    />
                    {errors.bmdc && (
                      <p className="text-red-500 text-sm mt-1">{errors.bmdc.message}</p>
                    )}
                  </div>
                )}

                <div>
                  <label
                    className="font-serif text-[14px]"
                    style={{ fontFamily: "poppins" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="password"
                      {...register("password", { required: "Password is required" })}
                      className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] mt-2"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors?.password?.message}</p>
                    )}
                  </div>
                </div>
              </div>


              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full font-serif text-[18px] text-[#fff] py-[10px] cursor-pointer mt-6 rounded-[8px] 
                  ${isProcessing ? "bg-gray-400" : "bg-primary hover:bg-primary"}`}
              >
                {isProcessing ? "Processing..." : "Create Account"}
              </button>
            </form>

            <div className="ml-3 text-sm flex justify-center mt-3">
              <label className="font-medium font-serif">
                Do you have an Account?
                <Link to="/login">
                  <span className="inline-block text-primary underline hover:cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

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
  const [showPassword, setShowPassword] = useState(false);
  const [smsNumber, setSmsNumber] = useState(null);
  const [error, setError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const handleSmsNumber = (e) => {
    const newValue = e.target.value;
    setSmsNumber(newValue);
    setValue("smsmobile", newValue);
  };

  const [resRegister, { data, isLoading, error: resError }] =
    useRegisterMutation();

  useEffect(() => {
    if (resError?.data) {
      setError(resError.data);
    }
    if (data?.token) {
      dispatch(setUser(data?.data?.role));
      toast.success("successfully! Sign Up ");
      handleNavigation("/login");
      localStorage.clear();
    }
  }, [data, handleNavigation, resError]);

  const onSubmit = (formData) => {
    console.log("data", formData);
    setError("");
    resRegister({
      fulname: formData.fulname,
      ogender: formData.ogender,
      dob: formData.dob,
      ccode: formData.ccode,
      smsmobile: formData.smsmobile,
      logmobile: formData.logmobile,
      logemail: formData.logemail,
      password: formData.password,
      role: formData.role,
    });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-7xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
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
                  <label className="font-poppins  text-[14px]">Full Name</label>
                  <input
                    name="fulname"
                    type="text"
                    placeholder="Full Name"
                    {...register("fulname", { required: true })}
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                  />
                  {/* {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>} */}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    {" "}
                    <div>
                      <label className="font-poppins  text-[14px]">Code</label>

                      <input
                        name="ccode"
                        value="88"
                        {...register("ccode", { required: true })}
                        className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                      />

                      {/* {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>} */}
                    </div>
                  </div>
                  <div className="col-span-3">
                    {" "}
                    <div>
                      <label className="font-poppins  text-[14px]">
                        Mobile Number
                      </label>
                      <input
                        name="logmobile"
                        type="number"
                        autoComplete="logmobile"
                        placeholder="Mobile Number"
                        {...register("logmobile", { required: true })}
                        onChange={handleSmsNumber}
                        className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                      />
                      {/* {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>} */}
                    </div>
                  </div>
                </div>

                {smsNumber && (
                  <div className="hidden">
                    <label className="font-poppins  text-[14px]">
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
                      className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                    />
                    {/* {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>} */}
                  </div>
                )}

                <div>
                  <label className=" text-[14px] font-poppins">
                    Choose Gender
                  </label>

                  <div>
                    <select
                      defaultValue="choose gender"
                      {...register("ogender", { required: true })}
                      className="select border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-none w-[100%]"
                    >
                      <option disabled={true}>Pick a color</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-poppins  text-[14px]">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    {...register("logemail", { required: true })}
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                  />
                  {/* {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>} */}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="font-poppins  text-[14px]">
                      Date Of Birth
                    </label>
                    <Controller
                      name="dob"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <DatePicker
                          showCalendar={showCalendar}
                          setShowCalendar={setShowCalendar}
                          {...field}
                          value={field.value}
                          onChange={(date) => field.onChange(date)}
                          format="YYYY-MM-DD"
                          className="w-full"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className="font-serif  text-[14px]"
                      style={{ fontFamily: "poppins" }}
                    >
                      Type
                    </label>

                    <div className="flex gap-4 items-center h-12">
                      <label className="flex items-center space-x-2">
                        <input
                          {...register("role", { required: true })}
                          type="radio"
                          name="role"
                          value="user"
                          checked={selected === "user"}
                          onChange={() => setSelected("user")}
                          className="accent-primary"
                        />
                        <span className="">User</span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          {...register("role", { required: true })}
                          type="radio"
                          name="role"
                          value="doctor"
                          checked={selected === "doctor"}
                          onChange={() => setSelected("doctor")}
                          className="accent-primary"
                        />
                        <span className="">Doctor</span>
                      </label>
                    </div>
                  </div>
                </div>

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
                      {...register("password", { required: true })}
                      className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {/* {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )} */}
                    </button>
                  </div>
                  {/* {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>} */}
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-serif text-[18px] text-[#fff] bg-primary py-[10px] cursor-pointer mt-6 rounded-[8px]"
              >
                Create Account
              </button>
            </form>

            <div className="ml-3 text-sm flex justify-center mt-3">
              <label className="font-medium   font-serif ">
                Do you have an Account
                <Link to="/login">
                  {" "}
                  <span className="  inline-block  text-primary underline hover:cursor-pointer transition duration-200">
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

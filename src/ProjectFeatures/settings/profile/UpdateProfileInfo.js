import { toast } from "react-toastify";
import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import Datepicker from "../../../components/datepicker/Datepicker";
import { useGetProfileQuery } from "../../../features/profile/profileApi";

export default function UpdateProfileInfo({ setShowModalEdit, showModalEdit }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [smsNumber, setSmsNumber] = useState(null);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const { data: profile } = useGetProfileQuery(auth?.role);
  console.log("profile", profile?.data);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const handleSmsNumber = (e) => {
    const newValue = e.target.value;
    setSmsNumber(newValue);
    setValue("smsmobile", newValue);
  };

  // useEffect(() => {
  //   if (selectedAdmin && profile) {
  //     reset({
  //       fulname: selectedAdmin.fulname || "",
  //       ccode: selectedAdmin.ccode || "",
  //       logmobile: selectedAdmin.logmobile || "",
  //       smsmobile: selectedAdmin.smsmobile || "",
  //       ogender: selectedAdmin.ogender || "",
  //       logemail: selectedAdmin.logemail || "",
  //       dob: selectedAdmin.dob || "",
  //       role: selectedAdmin.role || "",
  //     });
  //   }
  // }, [selectedAdmin, profile, reset]);

  // const { mutateAsync } = useMutation({
  //   mutationFn: editAdmin,
  //   onSuccess: (res) => {
  //     queryClient.invalidateQueries(["adminList"]);
  //     toast.success(res.data.message);
  //     setShowModalEdit(false);
  //     reset();
  //   },
  //   onError: (err) => {
  //     toast.error(err?.response?.data?.message || "Update failed");
  //   },
  // });

  const onSubmit = async (data) => {
    console.log("data", data);
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100">
        <div isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl p-6">
              <div className="flex gap-3 justify-between ml-6 border-b pb-4">
                <div className="flex gap-3 ">
                  <Pencil size={24} color="#7B1E19" />
                  <p color="#333" className=" text-xl font-bold">
                    Update User Info
                  </p>
                </div>
                <div
                  onClick={() => setShowModalEdit(false)}
                  className=" text-[#000] cursor-pointer"
                >
                  <X size={32} />
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="space-y-2">
                      <p
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        Full Name
                      </p>
                      <input
                        type="text"
                        {...register("fulname", { required: true })}
                        className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                      />
                    </div>

                    <div className="space-y-2">
                      <p
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        Email
                      </p>
                      <input
                        type="email"
                        {...register("logemail", { required: true })}
                        className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="font-poppins text-[14px] font-medium">
                        Code
                      </p>
                      <input
                        name="ccode"
                        value="88"
                        {...register("ccode", { required: true })}
                        className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md "
                      />
                    </div>

                    <div className="">
                      <div>
                        <p className="font-poppins  text-[14px] font-medium">
                          Mobile Number
                        </p>
                        <input
                          name="logmobile"
                          type="number"
                          autoComplete="logmobile"
                          {...register("logmobile", { required: true })}
                          onChange={handleSmsNumber}
                          className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="hidden">
                    <div>
                      <p className="font-poppins  text-[14px] font-medium">
                        Role
                      </p>
                      <input
                        name="role"
                        type="text"
                        autoComplete="role"
                        {...register("role", { required: true })}
                        className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%] border py-2 pl-2 rounded-md mt-1"
                      />
                    </div>
                  </div>

                  {smsNumber && (
                    <div className="">
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
                    </div>
                  )}

                  <div className="">
                    <p className="font-poppins  text-[14px] font-medium">
                      Select Gender
                    </p>
                    <div className="mt-2">
                      <select
                        value={watch("ogender")}
                        onChange={(val) => {
                          setValue("ogender", val, { shouldValidate: true });
                        }}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full ">
                    <div className="mb-1">
                      <label className="text-[14px] font-poppins font-medium">
                        Date Of Birth
                      </label>
                    </div>
                    <Controller
                      name="dob"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Datepicker
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
                  </div>

                  <div className="">
                    <p className="font-poppins  text-[14px] font-medium">
                      Select Type
                    </p>
                    <div className="mt-2">
                      <select
                        value={watch("ogender")}
                        onChange={(val) => {
                          setValue("ogender", val, { shouldValidate: true });
                        }}
                      >
                        <option value="user">User</option>
                        <option value="doctor">Doctor</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      variant="outlined"
                      fullWidth
                      onClick={() => setShowModalEdit(false)}
                    >
                      Cancel
                    </button>

                    <button fullWidth type="submit" className="bg-primaryBg">
                      Update Admin
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

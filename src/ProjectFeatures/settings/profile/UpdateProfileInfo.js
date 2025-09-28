import { toast } from "react-toastify";
import { Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useCreateProfileInfoMutation,
  useGetProfileQuery,
} from "../../../features/profile/profileApi";
import Datepicker from "../../../components/datepicker/Datepicker";

export default function UpdateProfileInfo({ setShowModalEdit, showModalEdit }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [smsNumber, setSmsNumber] = useState(null);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const { data: profile } = useGetProfileQuery(auth?.role);
  let profileUser = profile?.data;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (profileUser) {
      reset({
        fulname: profileUser.fulname || "",
        logemail: profileUser.logemail || "",
        ccode: profileUser.ccode || "88",
        logmobile: profileUser.logmobile || "",
        role: profileUser.role || "",
        ogender: profileUser.ogender || "",
        dob: profileUser.dob || "",
        smsmobile: profileUser.smsmobile || "",
      });
    }
  }, [profileUser, reset]);

  useEffect(() => {
    if (profileUser) {
      const {
        fulname,
        logemail,
        ccode,
        logmobile,
        role,
        ogender,
        dob,
        smsmobile,
      } = profileUser;
      reset({
        fulname,
        logemail,
        ccode: ccode || "88",
        logmobile,
        role,
        ogender,
        dob,
        smsmobile,
      });
    }
  }, [profileUser, reset]);

  const handleSmsNumber = (e) => {
    const newValue = e.target.value;
    setSmsNumber(newValue);
    setValue("smsmobile", newValue);
  };
  const [createProfileInfo, { isLoading }] = useCreateProfileInfoMutation();

  const onSubmit = async (data) => {
    try {
      const res = await createProfileInfo({
        role: auth?.role,
        id: profileUser?.id,
        data,
      }).unwrap();

      toast.success(res.message || "Profile updated successfully");
      setShowModalEdit(false);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <>
      {showModalEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[70vh] overflow-y-auto shadow-xl p-6">
            <div className="flex gap-3 justify-between ml-6 border-b pb-4">
              <div className="flex gap-3 ">
                <Pencil size={24} color="#7B1E19" />
                <p className="text-xl font-bold">Update User Info</p>
              </div>
              <div
                onClick={() => setShowModalEdit(false)}
                className="text-[#000] cursor-pointer"
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
                    <p className="font-poppins text-[14px] font-medium">Code</p>
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
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <p className="font-poppins  text-[14px] font-medium">
                      Select Gender
                    </p>
                    <div className="mt-2">
                      <select
                        value={watch("ogender")}
                        onChange={(e) =>
                          setValue("ogender", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                        {...register("ogender", { required: true })}
                        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-0"
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
                </div>

                <div className="">
                  <p className="font-poppins  text-[14px] font-medium">
                    Select Type
                  </p>
                  <div className="mt-2">
                    <select
                      value={watch("role")}
                      onChange={(e) =>
                        setValue("role", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      {...register("role", { required: true })}
                      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-0"
                    >
                      <option value="user">User</option>
                      <option value="doctor">doctor</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 ">
                  <button
                    className="bg-primary text-white px-6 py-2 font-poppins rounded-md"
                    variant="outlined"
                    fullWidth
                    onClick={() => setShowModalEdit(false)}
                  >
                    Cancel
                  </button>
                  <button
                    fullWidth
                    type="submit"
                    className="bg-primary text-white  px-6 py-2 font-poppins rounded-md"
                  >
                    Update Admin
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

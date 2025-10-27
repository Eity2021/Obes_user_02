import { useSearchParams } from "react-router-dom";
import {useGetEmailVerifyTokenQuery } from "../../features/emailVerify/emailApi";


export default function VerifyEmail() {

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

const { data: verifyEmail,isLoading,isError,isSuccess,error } = useGetEmailVerifyTokenQuery(token, {
    skip: !token, 
  });

  return (
 <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg p-6 rounded-lg w-[400px] text-center">
        {isLoading && <p className="text-blue-600">Verifying your email...</p>}

        {isSuccess && (
          <p className="text-green-600 font-semibold">
            {verifyEmail?.message || "Your email has been verified ✅"}
          </p>
        )}

        {isError && (
          <p className="text-red-600 font-semibold">
            {error?.data?.message || "Verification failed ❌"}
          </p>
        )}

        {!token && (
          <p className="text-red-600 font-semibold">Token is missing ❌</p>
        )}
      </div>
    </div>
  )
}

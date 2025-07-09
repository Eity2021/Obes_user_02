import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../ProjectFeatures/common/headerSlice";
import Bmi from "../../../ProjectFeatures/bmi";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bmi" }));
  }, []);

  return (
    <>
      <Bmi />
    </>
  );
}

export default InternalPage;

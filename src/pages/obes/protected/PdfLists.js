import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../ProjectFeatures/common/headerSlice";
import Pdf from "../../../ProjectFeatures/pdf";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bmi" }));
  }, []);

  return (
    <>
      <Pdf />
    </>
  );
}

export default InternalPage;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../ProjectFeatures/common/headerSlice";
import Survey from "../../../ProjectFeatures/survey";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Survey" }));
  }, []);

  return (
    <>
      <Survey />
    </>
  );
}

export default InternalPage;

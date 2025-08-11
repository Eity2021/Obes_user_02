import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../ProjectFeatures/common/headerSlice";
import Education from "../../../ProjectFeatures/education";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Education" }));
  }, []);

  return (
    <>
      <Education />
    </>
  );
}

export default InternalPage;

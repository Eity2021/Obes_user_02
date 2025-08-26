import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../ProjectFeatures/common/headerSlice";
import modalSlice from "../ProjectFeatures/common/modalSlice";
import rightDrawerSlice from "../ProjectFeatures/common/rightDrawerSlice";
import authSliceReducer from "../features/auth/authSlice";
import profileSliceReducer from "../features/profile/profileSlice";
import bmiSliceReducer from "../features/bmi/bmiSlice";
import resetSliceReducer from "../features/reset/resetSlice";
import forgetSliceReducer from "../features/forget/forgetSlice";
import videosSliceReducer from "../features/videos/videosSlice";
import answerSliceReducer from "../features/answer/answerSlice";
import questionSliceReducer from "../features/question/questionSlice";
import educationSliceReducer from "../features/education/educationSlice";
import stepsSliceReducer from "../features/steps/stepsSlice";
import dietSliceReducer from "../features/dietChart/dietSlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    profile: profileSliceReducer,
    bmi: bmiSliceReducer,
    reset: resetSliceReducer,
    forget: forgetSliceReducer,
    videos: videosSliceReducer,
    question: questionSliceReducer,
    education: educationSliceReducer,
    answer: answerSliceReducer,
    steps: stepsSliceReducer,
    diet: dietSliceReducer,
    header: headerSlice,
    rightDrawer: rightDrawerSlice,
    modal: modalSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

// export default configureStore({
//     reducer: combinedReducer
// })

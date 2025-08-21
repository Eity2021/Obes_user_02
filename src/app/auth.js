import axios from "axios";

const checkAuth = () => {
  const TOKEN = localStorage.getItem("auth");
  const PUBLIC_ROUTES = [
    "login",
    "forgot-password",
    "register",
    "documentation",
    "email-verify"
  ];

  const isPublicPage = PUBLIC_ROUTES.some((r) =>
    window.location.href.includes(r)
  );

  if (!TOKEN && !isPublicPage) {
    window.location.href = "/login";
    return null;
  }

  if (TOKEN) {
    // ✅ always set token on axios headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;

    // ✅ add interceptors only once
    if (!axios.interceptors.request.handlers.length) {
      axios.interceptors.request.use(
        function (config) {
          document.body.classList.add("loading-indicator");
          return config;
        },
        function (error) {
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        function (response) {
          document.body.classList.remove("loading-indicator");
          return response;
        },
        function (error) {
          document.body.classList.remove("loading-indicator");
          return Promise.reject(error);
        }
      );
    }
  }

  return TOKEN;
};

export default checkAuth;

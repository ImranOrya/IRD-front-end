// import { useTranslation } from "react-i18next";
// import { Link, Outlet, useLocation } from "react-router";

// export default function HeaderSection() {
//   const location = useLocation();
//   const activeTab = location.pathname;
//   const { t } = useTranslation();

//   return (
//     <section>
//       <header className="flex flex-row items-center justify-center text-primary-foreground bg-tertiary w-full h-16 gap-10">
//         <div className="flex items-center mr-auto">
//           <img
//             className="h-10"
//             src="../src/views/site/img/logo.png"
//             alt="logo"
//           />
//           <h1 className="font-bold text-xl text-white ml-4">
//             International Relation Directorate
//           </h1>
//         </div>
//         <Link
//           to="/Main Page"
//           className={`${
//             (activeTab.startsWith("/archives") || activeTab.length == 1) &&
//             "border-b"
//           }`}
//         >
//           {t("Main Page")}
//         </Link>
//         <Link
//           to="/News"
//           className={`${activeTab.startsWith("/news") && "border-b"}`}
//         >
//           {t("News")}
//         </Link>
//         <Link
//           to="/NGO List"
//           className={`${activeTab.startsWith("/ngo list") && "border-b"}`}
//         >
//           {t("NGO List")}
//         </Link>
//         <Link
//           to="/Information"
//           className={`${activeTab.startsWith("/information") && "border-b"}`}
//         >
//           {t("Information")}
//         </Link>
//       </header>

//       <Outlet />
//     </section>
//   );
// }

import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router";

export default function MainPage() {
  const location = useLocation();
  const activeTab = location.pathname;
  const { t } = useTranslation();

  return (
    <section>
      <header className="bg-primary dark:bg-primary/90 py-6 space-y-4 px-4">
        <h1 className="text-[24px] text-primary-foreground font-medium">
          Website and Academic journal System
        </h1>
        <header className="text-primary-foreground space-x-4">
          <Link
            to="/home"
            className={`${
              (activeTab.startsWith("/archives") || activeTab.length == 1) &&
              "border-b"
            }`}
          >
            {t("home")}
          </Link>
          <Link
            to="/about"
            className={`${activeTab.startsWith("/submission") && "border-b"}`}
          >
            {t("about")}
          </Link>
          <Link
            to="/contact"
            className={`${activeTab.startsWith("/submission") && "border-b"}`}
          >
            {t("contact")}
          </Link>
        </header>
      </header>
      <Outlet />
    </section>
  );
}

import { useTranslation } from "react-i18next";

function FooterSection() {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative flex flex-col justify-start bg-slate-700 text-white ltr:text-left rtl:text-right text-2xl-ltr h-60 w-full px-4  rtl:text-2xl-rtl ">
        <div className="mt-20 flex flex-row">
          <div>
            <p>{t("add_moph")} </p>
            <p>{t("email")}: info@moph.gov.af</p>
            <p>{t("phone_number")}: +93(0) 20 230 1374</p>
          </div>
        </div>
        <div className="flex items-center justify-end mt-10">
          <p>{t("powered_by")}</p>
        </div>
        <div className="absolute border border-blue-500 mt-60 w-full p-3 ltr:text-right rtl:text-left right-0 bg-slate-700 text-sm">
          {t("2024_ars")}
        </div>
      </div>
    </>
  );
}

export default FooterSection;

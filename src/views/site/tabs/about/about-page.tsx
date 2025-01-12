import PrimaryButton from "@/components/custom-ui/button/PrimaryButton";
import CustomInput from "@/components/custom-ui/input/CustomInput";

import { t } from "i18next";
import FooterSection from "../../general/footer/footer-section";

import CustomTextarea from "@/components/custom-ui/input/CustomTextarea";

export default function AboutPage() {
  return (
    <>
      <div
        id="map"
        className="relative h-[600px] overflow-hidden bg-cover bg-[50%] bg-no-repeat"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.669941787271!2d69.18888467450978!3d34.53658929200287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16ea791269fcf%3A0xda151ef48dbd8e66!2sMinistry%20of%20Public%20Health!5e0!3m2!1sen!2s!4v1726373967529!5m2!1sen!2s"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div className="container px-6 md:px-12 mb-28">
        <div className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  md:py-16 md:px-12 -mt-[250px] backdrop-blur-[30px] border border-gray-300">
          <h1 className=" text-center font-bold ltr:text-2xl-ltr rtl:text-3xl-rtl rounded-md bg-sky-200 p-4 text-primary ">
            {t("contact_us")}
          </h1>
          <div className="flex flex-row mt-16 ltr:ml-6 justify-between items-center">
            <div className=" flex flex-col items-center  rtl:text-right ltr:text-left">
              <img
                className="size-24  rounded-full"
                src="https://cdn.pixabay.com/photo/2022/08/17/13/16/guy-7392546_640.jpg "
                alt="image"
              />

              <p className="mb-2 font-bold  ">{t("director_stuff")} </p>
              <p className="mb-2 font-bold  text-neutral-500">
                {t("Director")}
              </p>
              <p className="text-sm text-neutral-500">
                {t("name")}: Naweed Sayedi
              </p>
              <p className="text-sm text-neutral-500">
                {t("job")}: Director of IRd
              </p>
              <p className="text-sm text-neutral-500">
                {"contact"}:+93(0)77564323
              </p>
              <p className="text-sm text-neutral-500">
                {t("email")}:Naweedsayedi@gmail.com
              </p>
            </div>
            <div className=" flex flex-col items-center  rtl:text-right ltr:text-left">
              <img
                className="size-24  rounded-full "
                src="https://cdn.pixabay.com/photo/2025/01/04/06/29/ai-generated-9309174_640.png"
                alt="image"
              />
              <p className="mb-2 font-bold ">{t("administrative_stuff")} </p>
              <p className="mb-2 font-bold  text-neutral-500">{t("manager")}</p>
              <p className="text-sm text-neutral-500">
                {t("name")}: Imran Orya
              </p>
              <p className="text-sm text-neutral-500">
                {t("job")}: Maneger of IRD
              </p>
              <p className="text-sm text-neutral-500">
                {t("contact")}:+93(0)77889933
              </p>
              <p className="text-sm text-neutral-500">
                {t("email")}: imranorya@gmail.com
              </p>
            </div>
            <div>
              <p className="mb-2 font-bold rtl:text-3xl-rtl">
                {t("technical_support")}
              </p>
              <div className="relative rounded-xl overflow-auto p-8">
                <div className="flex  -space-x-3 font-mono text-white text-sm font-bold leading-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center  bg-gray-500 shadow-lg ring-2 ring-white z-40 dark:ring-slate-900">
                    <img
                      className="size-14  rounded-full z-30"
                      src="https://cdn.pixabay.com/photo/2024/12/24/18/41/ai-generated-9289134_640.png"
                      alt="image"
                    />
                  </div>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-500 shadow-lg ring-2 ring-white z-30 dark:ring-slate-900">
                    <img
                      className="size-14  rounded-full z-30"
                      src="https://cdn.pixabay.com/photo/2022/03/28/14/37/boy-7097685_640.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center  bg-gray-500 shadow-lg ring-2 ring-white z-20 dark:ring-slate-900">
                    <img
                      className="size-14  rounded-full z-30"
                      src="https://cdn.pixabay.com/photo/2025/01/04/06/29/ai-generated-9309174_640.png"
                      alt="image"
                    />
                  </div>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center  bg-gray-500 shadow-lg ring-2 ring-white z-10 dark:ring-slate-900">
                    <img
                      className="size-14  rounded-full z-30"
                      src="https://cdn.pixabay.com/photo/2022/08/17/13/16/guy-7392546_640.jpg "
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="flex flex-col mt-16 items-center">
            <CustomInput
              lable={t("name")}
              id="name"
              size_="sm"
              placeholder={t("enter_your_name")}
              type="text"
              name="name"
              dir="ltr"
              className="rtl:text-right mb-4 ltr:text-left md:w-96  "
            />

            <CustomInput
              lable={t("email")}
              id="email"
              size_="sm"
              placeholder={t("enter_your_email")}
              type="email"
              name="email"
              className="md:w-96 rtl:text-right mb-4 ltr:text-left "
            />

            <CustomInput
              lable={t("contact")}
              id="contact"
              size_="sm"
              placeholder={t("enter_ur_phno")}
              type="number"
              name="contact"
              className="md:w-96 rtl:text-right mb-4 ltr:text-left"
            />

            <CustomInput
              lable={t("subject")}
              id="subject"
              size_="sm"
              placeholder={t("enter_your_subject")}
              type="text"
              name="subject"
              className="md:w-96 rtl:text-right mb-4 ltr:text-left"
            />
            <div className="flex flex-col">
              <CustomTextarea
                id="measege"
                className="w-[500px]  p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t("enter-ur_messhere...")}
              />
            </div>

            <div className="flex justify-center items-center">
              <PrimaryButton className="w-20 mt-8 uppercase  " type="submit">
                {t("submit")}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
      <FooterSection />
    </>
  );
}

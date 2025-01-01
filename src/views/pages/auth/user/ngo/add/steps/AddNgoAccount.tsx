import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { useContext, useState } from "react";
import { StepperContext } from "@/components/custom-ui/stepper/StepperContext";
import { useTranslation } from "react-i18next";
import PasswordInput from "@/components/custom-ui/input/PasswordInput";
import CustomInput from "@/components/custom-ui/input/CustomInput";

export default function AddNgoAccount() {
  const { userData, setUserData, error } = useContext(StepperContext);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col mt-10 w-full gap-y-3 sm:w-[86%] md:w-[60%] lg:w-[400px] mx-auto">
      <CustomInput
        size_="sm"
        dir="ltr"
        className="rtl:text-end"
        lable={t("contact")}
        placeholder={t("Enter your phone number")}
        defaultValue={userData["phone"]}
        type="text"
        name="phone"
        errorMessage={error.get("phone")}
        onChange={handleChange}
        startContent={
          <Phone className="text-tertiary size-[18px] pointer-events-none" />
        }
      />
      <CustomInput
        size_="sm"
        name="email"
        required={true}
        lable={t("email")}
        requiredHint={`* ${t("Required")}`}
        defaultValue={userData["email"]}
        placeholder={t("Enter your email")}
        type="email"
        errorMessage={error.get("email")}
        onChange={handleChange}
        dir="ltr"
        className="rtl:text-right"
        startContent={
          <Mail className="text-tertiary size-[18px] pointer-events-none" />
        }
      />
      <PasswordInput
        size_="sm"
        name="password"
        lable={t("password")}
        required={true}
        requiredHint={`* ${t("Required")}`}
        defaultValue={userData["password"]}
        onChange={handleChange}
        placeholder={t("enter password")}
        errorMessage={error.get("password")}
        startContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <Eye className="size-[20px] text-primary-icon pointer-events-none" />
            ) : (
              <EyeOff className="size-[20px] text-primary-icon pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
    </div>
  );
}

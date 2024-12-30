import { useTranslation } from "react-i18next";
import { useModelOnRequestHide } from "@/components/custom-ui/model/hook/useModelOnRequestHide";
import CloseButton from "@/components/custom-ui/button/CloseButton";
import Stepper from "@/components/custom-ui/stepper/Stepper";
import CompleteStep from "@/components/custom-ui/stepper/CompleteStep";
import axiosClient from "@/lib/axois-client";
import { toast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction } from "react";
import { setServerError } from "@/validation/validation";
import { Ngo } from "@/database/tables";
import { Check, Database, User as UserIcon } from "lucide-react";
import AddNgoInformation from "./steps/AddNgorInformation";
import AddNgoAccount from "./steps/AddNgoAccount";

export interface AddNgoProps {
  onComplete: (ngo: Ngo) => void;
}
export default function AddNgo(props: AddNgoProps) {
  const { onComplete } = props;
  const { t } = useTranslation();
  const { modelOnRequestHide } = useModelOnRequestHide();
  const beforeStepSuccess = async (
    _userData: any,
    _currentStep: number,
    _setError: Dispatch<SetStateAction<Map<string, string>>>
  ) => true;
  const stepsCompleted = async (
    userData: any,
    setError: Dispatch<SetStateAction<Map<string, string>>>
  ) => {
    let formData = new FormData();
    // 'ngo_type_id' => 'required|integer|exists:ngo_types,id',
    // 'name_en' => 'required|string|unique:ngotrans,name',

    formData.append("email", userData.email);
    formData.append("district_id", userData?.district?.id);
    formData.append("password", userData.password);
    formData.append("area", userData.area);
    formData.append("abbr", userData.abbreviation);
    formData.append("ngo_type_id", userData.type.id);
    formData.append("name_en", userData.name);
    try {
      const response = await axiosClient.post("ngo/store", formData);
      if (response.status == 200) {
        onComplete(response.data.ngo);
        toast({
          toastType: "SUCCESS",
          description: response.data.message,
        });
      }
    } catch (error: any) {
      toast({
        toastType: "ERROR",
        title: t("Error"),
        description: error.response.data.message,
      });
      setServerError(error.response.data.errors, setError);
      console.log(error);
      return false;
    }
    return true;
  };
  const closeModel = () => {
    modelOnRequestHide();
  };

  return (
    <div className="pt-4">
      {/* Header */}
      <div className="flex px-1 py-1 fixed w-full justify-end">
        <CloseButton dismissModel={closeModel} />
      </div>
      {/* Body */}
      <Stepper
        isCardActive={true}
        size="wrap-height"
        className="bg-transparent dark:!bg-transparent"
        progressText={{
          complete: t("Complete"),
          inProgress: t("In Progress"),
          pending: t("Pending"),
          step: t("Step"),
        }}
        loadingText={t("Loading")}
        backText={t("Back")}
        nextText={t("Next")}
        confirmText={t("Confirm")}
        steps={[
          {
            description: t("Personal details"),
            icon: <UserIcon className="size-[16px]" />,
          },
          {
            description: t("Account information"),
            icon: <Database className="size-[16px]" />,
          },
          {
            description: t("Complete"),
            icon: <Check className="size-[16px]" />,
          },
        ]}
        components={[
          {
            component: <AddNgoInformation />,
            validationRules: [
              { name: "name", rules: ["required", "max:128", "min:5"] },
              { name: "abbreviation", rules: ["required"] },
              { name: "type", rules: ["required"] },
              { name: "province", rules: ["required"] },
              { name: "district", rules: ["required"] },
              { name: "area", rules: ["required"] },
            ],
          },
          {
            component: <AddNgoAccount />,
            validationRules: [
              { name: "email", rules: ["required"] },
              { name: "password", rules: ["required", "max:25", "min:8"] },
            ],
          },
          {
            component: (
              <CompleteStep
                successText={t("Congratulation")}
                closeText={t("Close")}
                againText={t("Again")}
                closeModel={closeModel}
                description={t("User account has been created")}
              />
            ),
            validationRules: [],
          },
        ]}
        beforeStepSuccess={beforeStepSuccess}
        stepsCompleted={stepsCompleted}
      />
    </div>
  );
}

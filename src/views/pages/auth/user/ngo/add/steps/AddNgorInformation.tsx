import APICombobox from "@/components/custom-ui/combobox/APICombobox";
import BorderContainer from "@/components/custom-ui/container/BorderContainer";
import CustomInput from "@/components/custom-ui/input/CustomInput";
import { StepperContext } from "@/components/custom-ui/stepper/StepperContext";
import { UserRound } from "lucide-react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function AddNgoInformation() {
  const { t } = useTranslation();
  const { userData, setUserData, error } = useContext(StepperContext);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const districtComponent = userData.province ? (
    <APICombobox
      placeholderText={t("Search item")}
      errorText={t("No item")}
      onSelect={(selection: any) =>
        setUserData({ ...userData, ["district"]: selection })
      }
      lable={t("district")}
      required={true}
      requiredHint={`* ${t("Required")}`}
      selectedItem={userData["district"]?.name}
      placeHolder={`${t("select a")} ${t("district")}`}
      errorMessage={error.get("district")}
      apiUrl={"districts"}
      params={{ provinceId: userData?.province?.id }}
      mode="single"
      key={userData?.province?.id}
    />
  ) : undefined;
  return (
    <div className="flex flex-col mt-10 w-full sm:w-[86%] md:w-[60%] lg:w-[400px] gap-y-6 pb-12 mx-auto">
      <BorderContainer
        title={t("name")}
        required={true}
        parentClassName=" py-4"
        className="grid grid-cols-1 gap-y-3"
      >
        <CustomInput
          required={true}
          requiredHint={`* ${t("Required")}`}
          size_="sm"
          name="name_en"
          defaultValue={userData["name_en"]}
          placeholder={t("name_en")}
          type="text"
          errorMessage={error.get("name_en")}
          onBlur={handleChange}
        />
        <CustomInput
          required={true}
          requiredHint={`* ${t("Required")}`}
          size_="sm"
          name="name_fa"
          defaultValue={userData["name_fa"]}
          placeholder={t("name_fa")}
          type="text"
          errorMessage={error.get("name_fa")}
          onBlur={handleChange}
        />
        <CustomInput
          required={true}
          requiredHint={`* ${t("Required")}`}
          size_="sm"
          name="name_ps"
          defaultValue={userData["name_ps"]}
          placeholder={t("name_ps")}
          type="text"
          errorMessage={error.get("name_ps")}
          onBlur={handleChange}
        />
      </BorderContainer>

      <CustomInput
        required={true}
        requiredHint={`* ${t("Required")}`}
        size_="sm"
        lable={t("abbreviation")}
        name="abbreviation"
        defaultValue={userData["abbreviation"]}
        placeholder={t("abbreviation_desc")}
        type="text"
        errorMessage={error.get("abbreviation")}
        onBlur={handleChange}
        startContent={
          <UserRound className="text-tertiary size-[18px] pointer-events-none" />
        }
      />
      <APICombobox
        placeholderText={t("Search item")}
        errorText={t("No item")}
        onSelect={(selection: any) =>
          setUserData({ ...userData, ["type"]: selection })
        }
        lable={t("type")}
        required={true}
        requiredHint={`* ${t("Required")}`}
        selectedItem={userData["type"]?.name}
        placeHolder={`${t("select a")} ${t("type")}`}
        errorMessage={error.get("type")}
        apiUrl={"ngo/types"}
        mode="single"
      />
      <BorderContainer
        title={t("address")}
        required={true}
        parentClassName="mt-3"
        className="flex flex-col items-start gap-y-3"
      >
        <APICombobox
          placeholderText={t("Search item")}
          errorText={t("No item")}
          onSelect={(selection: any) =>
            setUserData({ ...userData, ["province"]: selection })
          }
          lable={t("province")}
          required={true}
          requiredHint={`* ${t("Required")}`}
          selectedItem={userData["province"]?.name}
          placeHolder={`${t("select a")} ${t("province")}`}
          errorMessage={error.get("province")}
          apiUrl={"provinces"}
          mode="single"
        />
        {districtComponent}
        <CustomInput
          required={true}
          requiredHint={`* ${t("Required")}`}
          size_="sm"
          lable={t("area")}
          name="area"
          defaultValue={userData["area"]}
          placeholder={t("abbreviation_desc")}
          type="text"
          parentClassName="w-full"
          errorMessage={error.get("area")}
          onBlur={handleChange}
        />
      </BorderContainer>
    </div>
  );
}

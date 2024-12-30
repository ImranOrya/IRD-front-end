import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useModelOnRequestHide } from "@/components/custom-ui/model/hook/useModelOnRequestHide";
import { useTranslation } from "react-i18next";
import { FilterItem } from "@/components/custom-ui/filter/FilterItem";
import CustomMultiDatePicker from "@/components/custom-ui/DatePicker/CustomMultiDatePicker";
import { DateObject } from "react-multi-date-picker";
import { NgoFilter, NgoSearch, NgoSort, Order } from "@/lib/types";

export interface NgoFilterDialogProps {
  sortOnComplete: (itemName: NgoSort) => void;
  searchOnComplete: (itemName: NgoSearch) => void;
  orderOnComplete: (itemName: Order) => void;
  dateOnComplete: (selectedDates: DateObject[]) => void;
  filters: NgoFilter;
}
export default function NgoFilterDialog(props: NgoFilterDialogProps) {
  const {
    sortOnComplete,
    searchOnComplete,
    orderOnComplete,
    dateOnComplete,
    filters,
  } = props;
  const { modelOnRequestHide } = useModelOnRequestHide();
  const { t } = useTranslation();
  const handleSort = (itemName: string) => {
    sortOnComplete(itemName as NgoSort);
    modelOnRequestHide();
  };
  const handleSearch = (itemName: string) => {
    searchOnComplete(itemName as NgoSearch);
    modelOnRequestHide();
  };
  const handleOrder = (itemName: string) => {
    orderOnComplete(itemName as Order);
    modelOnRequestHide();
  };
  const handleDate = (selectedDates: DateObject[]) => {
    dateOnComplete(selectedDates);
    if (selectedDates.length == 2) modelOnRequestHide();
  };
  return (
    <Card className="w-fit self-center [backdrop-filter:blur(20px)] bg-white/70 dark:!bg-black/40">
      <CardHeader className="relative text-start">
        <CardTitle className="rtl:text-4xl-rtl ltr:text-lg-ltr text-tertiary">
          {t("Search filters")}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:flex sm:flex-row gap-x-4 pb-12">
        <FilterItem
          selected={filters.sort}
          headerName={t("Sort by")}
          items={[
            {
              name: "id",
              translate: t("id"),
              onClick: handleSort,
            },
            { name: "name", translate: t("name"), onClick: handleSort },
            {
              name: "type",
              translate: t("type"),
              onClick: handleSort,
            },
            {
              name: "date_of_establishment",
              translate: t("date_of_establishment"),
              onClick: handleSort,
            },
            { name: "contact", translate: t("contact"), onClick: handleSort },
            {
              name: "expire_date",
              translate: t("expire_date"),
              onClick: handleSort,
            },
            { name: "status", translate: t("status"), onClick: handleSort },
          ]}
        />
        <section className="min-w-[120px] space-y-2">
          <h1
            className={
              "uppercase text-start font-semibold border-b border-primary/20 pb-2 rtl:text-2xl-rtl ltr:text-lg-ltr text-primary"
            }
          >
            {t("date")}
          </h1>
          <CustomMultiDatePicker
            value={filters.date}
            dateOnComplete={handleDate}
          />
        </section>
        <FilterItem
          selected={filters.search.column}
          headerName={t("search")}
          items={[
            {
              name: "id",
              translate: t("id"),
              onClick: handleSearch,
            },
            {
              name: "registration_no",
              translate: t("registration_no"),
              onClick: handleSearch,
            },
            { name: "name", translate: t("name"), onClick: handleSearch },
            { name: "type", translate: t("type"), onClick: handleSearch },
            { name: "contact", translate: t("contact"), onClick: handleSearch },
          ]}
        />
        <FilterItem
          selected={filters.order}
          headerName={t("Order")}
          items={[
            {
              name: "asc",
              translate: t("asc"),
              onClick: handleOrder,
            },
            {
              name: "desc",
              translate: t("desc"),
              onClick: handleOrder,
            },
          ]}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="rtl:text-2xl-rtl ltr:text-lg-ltr"
          onClick={modelOnRequestHide}
        >
          {t("Cancel")}
        </Button>
      </CardFooter>
    </Card>
  );
}

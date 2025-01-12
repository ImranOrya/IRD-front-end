import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { DateObject } from "react-multi-date-picker";
import { FilterItem } from "@/components/custom-ui/filter/FilterItem";
import { NewsFilter, NewsSearch, NewsSort, Order } from "@/lib/types";

export interface NewsFilterProps {
  sortOnComplete: (itemName: NewsSort) => void;
  searchOnComplete: (itemName: NewsSearch) => void;
  orderOnComplete: (itemName: Order) => void;
  dateOnComplete: (selectedDates: DateObject[]) => void;
  filters: NewsFilter;
}

export default function NewsDropdown(props: NewsFilterProps) {
  const { sortOnComplete, filters } = props;

  const [filterBy, setFilterBy] = useState<string | null>(null);
  const { t } = useTranslation();
  const handleSort = (itemName: string) => {
    sortOnComplete(itemName as NewsSort);
  };

  const defaultGroupText = "rtl:[&>*]:text-lg-rtl ltr:[&>*]:text-xl-ltr";

  const defaultText = "rtl:text-xl-rtl ltr:text-xl-ltr";
  // State to manage card visibility

  return (
    <div className="flex flex-row">
      <section className="px-2 pt-2">
        <div>
          <Select onValueChange={setFilterBy}>
            <SelectTrigger className={`min-w-[180px] ${defaultText}`}>
              <SelectValue placeholder={t("filter")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className={defaultGroupText}>
                <FilterItem
                  selected={filters.sort}
                  headerName={"Filter by"}
                  items={[
                    {
                      name: "title",
                      translate: t("title"),
                      onClick: handleSort,
                    },

                    {
                      name: "date",
                      translate: t("date"),
                      onClick: handleSort,
                    },
                  ]}
                />
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>
    </div>
  );
}

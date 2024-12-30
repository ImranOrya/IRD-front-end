import Shimmer from "@/components/custom-ui/shimmer/Shimmer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useAuthState } from "@/context/AuthContextProvider";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Ngo, UserPermission } from "@/database/tables";
import { CACHE, SectionEnum } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import axiosClient from "@/lib/axois-client";
import TableRowIcon from "@/components/custom-ui/table/TableRowIcon";
import Pagination from "@/components/custom-ui/table/Pagination";
import CachedImage from "@/components/custom-ui/image/CachedImage";
import { toLocaleDate } from "@/lib/utils";
import NastranModel from "@/components/custom-ui/model/NastranModel";
import PrimaryButton from "@/components/custom-ui/button/PrimaryButton";
import { ListFilter, Search } from "lucide-react";
import CustomInput from "@/components/custom-ui/input/CustomInput";
import SecondaryButton from "@/components/custom-ui/button/SecondaryButton";
import NgoFilterDialog from "./ngo-filter-dialog";
import CustomSelect from "@/components/custom-ui/select/CustomSelect";
import { DateObject } from "react-multi-date-picker";
import {
  NgoFilter,
  NgoPaginationData,
  NgoSearch,
  NgoSort,
  Order,
} from "@/lib/types";
import AddNgo from "./add/add-ngo";
import useCacheDB from "@/lib/indexeddb/useCacheDB";

export function NgoTable() {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const { updateComponentCache, getComponentCache } = useCacheDB();

  const [searchParams] = useSearchParams();
  // Accessing individual search filters
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const [filters, setFilters] = useState<NgoFilter>({
    sort: sort == null ? "id" : (sort as NgoSort),
    order: order == null ? "asc" : (order as Order),
    search: {
      column: search == null ? "id" : (search as NgoSearch),
      value: "",
    },
    date: [],
  });
  const loadList = async (count: number, dataFilters: NgoFilter, page = 1) => {
    try {
      if (loading) return;
      setLoading(true);
      // 1. Organize date
      let dates: {
        startDate: string | null;
        endDate: string | null;
      };
      if (filters.date.length === 1) {
        // set start date
        dates = {
          startDate: filters.date[0].toDate().toISOString(),
          endDate: null,
        };
      } else if (filters.date.length === 2) {
        // set dates
        dates = {
          startDate: filters.date[0].toDate().toISOString(),
          endDate: filters.date[1].toDate().toISOString(),
        };
      } else {
        // Set null
        dates = {
          startDate: null,
          endDate: null,
        };
      }
      // 2. Send data
      const response = await axiosClient.get(`ngos/${page}`, {
        params: {
          per_page: count,
          filters: {
            sort: dataFilters.sort,
            order: dataFilters.order,
            search: {
              column: dataFilters.search.column,
              value: dataFilters.search.value,
            },
            date: dates,
          },
        },
      });
      const fetch = response.data.ngos.data as Ngo[];
      const lastPage = response.data.ngos.last_page;
      const totalItems = response.data.ngos.total;
      const perPage = response.data.ngos.per_page;
      const currentPage = response.data.ngos.current_page;
      setNgos({
        filterList: {
          data: fetch,
          lastPage: lastPage,
          totalItems: totalItems,
          perPage: perPage,
          currentPage: currentPage,
        },
        unFilterList: {
          data: fetch,
          lastPage: lastPage,
          totalItems: totalItems,
          perPage: perPage,
          currentPage: currentPage,
        },
      });
    } catch (error: any) {
      toast({
        toastType: t("ERROR"),
        title: t("Error"),
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const initialize = async (dataFilters: NgoFilter) => {
    const count = await getComponentCache(CACHE.NGO_TABLE_PAGINATION_COUNT);
    loadList(count ? count.value : 10, dataFilters);
  };
  useEffect(() => {
    initialize(filters);
  }, [filters.order, filters.sort]);
  const [ngos, setNgos] = useState<{
    filterList: NgoPaginationData;
    unFilterList: NgoPaginationData;
  }>({
    filterList: {
      data: [],
      lastPage: 1,
      totalItems: 0,
      perPage: 0,
      currentPage: 0,
    },
    unFilterList: {
      data: [],
      lastPage: 1,
      totalItems: 0,
      perPage: 0,
      currentPage: 0,
    },
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const [state] = useGlobalState();

  const addItem = (ngo: Ngo) => {
    setNgos((prevState) => ({
      filterList: {
        ...prevState.filterList,
        data: [ngo, ...prevState.filterList.data],
      },
      unFilterList: {
        ...prevState.unFilterList,
        data: [ngo, ...prevState.unFilterList.data],
      },
    }));
  };

  const deleteOnClick = async (ngo: Ngo) => {
    try {
      const userId = ngo.id;
      const response = await axiosClient.delete("user/" + userId);
      if (response.status == 200) {
        const filtered = ngos.unFilterList.data.filter(
          (item: Ngo) => userId != item?.id
        );
        const item = {
          data: filtered,
          lastPage: ngos.unFilterList.lastPage,
          totalItems: ngos.unFilterList.totalItems,
          perPage: ngos.unFilterList.perPage,
          currentPage: ngos.unFilterList.currentPage,
        };
        setNgos({ ...ngos, filterList: item, unFilterList: item });
      }
      toast({
        toastType: "SUCCESS",
        title: t("Success"),
        description: response.data.message,
      });
    } catch (error: any) {
      toast({
        toastType: "ERROR",
        title: t("Error"),
        description: error.response.data.message,
      });
    }
  };
  const skeleton = (
    <TableRow>
      <TableCell>
        <Shimmer className="h-[24px] bg-primary/30 w-full rounded-sm" />
      </TableCell>
      <TableCell>
        <Shimmer className="h-[24px] bg-primary/30 w-full rounded-sm" />
      </TableCell>
      <TableCell>
        <Shimmer className="h-[24px] bg-primary/30 w-full rounded-sm" />
      </TableCell>
      <TableCell>
        <Shimmer className="h-[24px] bg-primary/30 w-full rounded-sm" />
      </TableCell>
      <TableCell>
        <Shimmer className="h-[24px] bg-primary/30 w-full rounded-sm" />
      </TableCell>
      <TableCell>
        <Shimmer className="h-[24px] bg-primary/30 w-full rounded-sm" />
      </TableCell>
      <TableCell>
        <Shimmer className="h-[24px] bg-primary/30 w-full rounded-sm" />
      </TableCell>
    </TableRow>
  );
  const per: UserPermission | undefined = user?.permissions.get(
    SectionEnum.ngo
  );
  const view = per ? per?.view : false;
  const remove = per ? per?.delete : false;
  const edit = per ? per?.edit : false;
  const add = per ? per?.add : false;
  const editOnClick = async (ngo: Ngo) => {
    const ngoId = ngo.id;
    navigate(`/ngos/${ngoId}`);
  };
  const watchOnClick = async (ngo: Ngo) => {
    const ngoId = ngo.id;
    navigate(`/ngos/${ngoId}`);
  };
  return (
    <>
      <div className="flex flex-col sm:items-baseline sm:flex-row rounded-md bg-card gap-2 flex-1 px-2 py-2 mt-4">
        {add && (
          <NastranModel
            size="lg"
            isDismissable={false}
            button={
              <PrimaryButton className="rtl:text-lg-rtl font-semibold ltr:text-md-ltr">
                {t("Add")}
              </PrimaryButton>
            }
            showDialog={async () => true}
          >
            <AddNgo onComplete={addItem} />
          </NastranModel>
        )}

        <CustomInput
          size_="lg"
          placeholder={`${t(filters.search.column)}...`}
          parentClassName="sm:flex-1 col-span-3"
          type="text"
          ref={searchRef}
          startContent={
            <Search className="size-[18px] mx-auto rtl:mr-[4px] text-primary pointer-events-none" />
          }
          endContent={
            <SecondaryButton
              onClick={async () => {
                if (searchRef.current != undefined) {
                  const newfilter = {
                    ...filters,
                    search: {
                      column: filters.search.column,
                      value: searchRef.current.value,
                    },
                  };

                  await initialize(newfilter);
                  setFilters(newfilter);
                }
              }}
              className="w-[72px] absolute rtl:left-[6px] ltr:right-[6px] -top-[7px] h-[32px] rtl:text-sm-rtl ltr:text-md-ltr hover:shadow-sm shadow-lg"
            >
              {t("search")}
            </SecondaryButton>
          }
        />
        <div className="sm:px-4 col-span-3 flex-1 self-start sm:self-baseline flex justify-end items-center">
          <NastranModel
            size="lg"
            isDismissable={false}
            button={
              <SecondaryButton
                className="px-8 rtl:text-md-rtl ltr:text-md-ltr"
                type="button"
              >
                {t("filter")}
                <ListFilter className="text-secondary mx-2 size-[15px]" />
              </SecondaryButton>
            }
            showDialog={async () => true}
          >
            <NgoFilterDialog
              filters={filters}
              sortOnComplete={async (filterName: NgoSort) => {
                if (filterName != filters.sort) {
                  setFilters({
                    ...filters,
                    sort: filterName,
                  });
                  const queryParams = new URLSearchParams();
                  queryParams.set("search", filters.search.column);
                  queryParams.set("sort", filterName);
                  queryParams.set("order", filters.order);
                  navigate(`/ngos?${queryParams.toString()}`);
                  // sortList
                  const item = {
                    data: ngos.filterList.data,
                    lastPage: ngos.unFilterList.lastPage,
                    totalItems: ngos.unFilterList.totalItems,
                    perPage: ngos.unFilterList.perPage,
                    currentPage: ngos.unFilterList.currentPage,
                  };
                  setNgos({
                    ...ngos,
                    filterList: item,
                  });
                }
              }}
              searchOnComplete={async (filterName: NgoSearch) => {
                const search = filters.search;
                setFilters({
                  ...filters,
                  search: { ...search, column: filterName },
                });
              }}
              orderOnComplete={async (filterName: Order) => {
                if (filterName != filters.order) {
                  setFilters({
                    ...filters,
                    order: filterName,
                  });
                  const queryParams = new URLSearchParams();
                  queryParams.set("sort", filters.sort);
                  queryParams.set("order", filterName);
                  navigate(`/ngos?${queryParams.toString()}`, {
                    replace: true,
                  });
                }
              }}
              dateOnComplete={(selectedDates: DateObject[]) => {
                setFilters({
                  ...filters,
                  date: selectedDates,
                });
              }}
            />
          </NastranModel>
        </div>
        <CustomSelect
          paginationKey={CACHE.NGO_TABLE_PAGINATION_COUNT}
          options={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "50", label: "50" },
          ]}
          className="w-fit sm:self-baseline"
          updateCache={(data: any) => updateComponentCache(data)}
          getCache={async () =>
            await getComponentCache(CACHE.NGO_TABLE_PAGINATION_COUNT)
          }
          placeholder={`${t("select")}...`}
          emptyPlaceholder={t("No options found")}
          rangePlaceholder={t("count")}
          onChange={async (value: string) => {
            loadList(parseInt(value), filters);
          }}
        />
      </div>
      <Table className="bg-card rounded-md my-[2px] py-8">
        <TableHeader className="rtl:text-3xl-rtl ltr:text-xl-ltr">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-center px-1 w-[60px]">
              {t("Profile")}
            </TableHead>
            <TableHead className="text-start">{t("id")}</TableHead>
            <TableHead className="text-start">{t("registration_no")}</TableHead>
            <TableHead className="text-start">{t("name")}</TableHead>
            <TableHead className="text-start">{t("type")}</TableHead>
            <TableHead className="text-start">
              {t("establishment_date")}
            </TableHead>
            <TableHead className="text-start w-[60px]">{t("status")}</TableHead>
            <TableHead className="text-start">{t("expire_date")}</TableHead>
            <TableHead className="text-start">{t("contact")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rtl:text-xl-rtl ltr:text-2xl-ltr">
          {loading ? (
            <>
              {skeleton}
              {skeleton}
              {skeleton}
            </>
          ) : (
            ngos.filterList.data.map((item: Ngo) => (
              <TableRowIcon
                read={view}
                remove={remove}
                edit={edit}
                onEdit={editOnClick}
                key={item.name}
                item={item}
                onRemove={deleteOnClick}
                onRead={watchOnClick}
              >
                <TableCell className="px-1 py-0">
                  <CachedImage
                    src={item?.profile}
                    alt="Avatar"
                    iconClassName="size-[18px]"
                    loaderClassName="size-[36px] mx-auto shadow-lg border border-tertiary rounded-full"
                    className="size-[36px] object-center object-cover mx-auto shadow-lg border border-tertiary rounded-full"
                  />
                </TableCell>
                <TableCell className="rtl:text-md-rtl truncate px-1 py-0">
                  {item.id}
                </TableCell>
                <TableCell className="rtl:text-md-rtl truncate px-1 py-0">
                  {item.registration_no}
                </TableCell>
                <TableCell className="rtl:text-md-rtl truncate px-1 py-0">
                  {item.name}
                </TableCell>
                <TableCell className="rtl:text-md-rtl truncate px-1 py-0">
                  {item.type.name}
                </TableCell>
                <TableCell>
                  {toLocaleDate(new Date(item.date_of_establishment), state)}
                </TableCell>
                <TableCell>
                  {item?.status ? (
                    <h1 className="truncate text-center rtl:text-md-rtl ltr:text-lg-ltr bg-green-500 px-1 py-[2px] shadow-md text-primary-foreground font-bold rounded-sm">
                      {t("Active")}
                    </h1>
                  ) : (
                    <h1 className="truncate text-center rtl:text-md-rtl ltr:text-lg-ltr bg-red-400 px-1 py-[2px] shadow-md text-primary-foreground font-bold rounded-sm">
                      {t("Lock")}
                    </h1>
                  )}
                </TableCell>
                <TableCell>
                  {toLocaleDate(new Date(item.expire_date), state)}
                </TableCell>
                <TableCell className="rtl:text-md-rtl truncate px-1 py-0">
                  {item.contact.value}
                </TableCell>
              </TableRowIcon>
            ))
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between rounded-md bg-card flex-1 p-3 items-center">
        <h1 className="rtl:text-lg-rtl ltr:text-md-ltr font-medium">{`${t(
          "page"
        )} ${ngos.unFilterList.currentPage} ${t("of")} ${
          ngos.unFilterList.lastPage
        }`}</h1>
        <Pagination
          lastPage={ngos.unFilterList.lastPage}
          onPageChange={async (page) => {
            try {
              const count = await getComponentCache(
                CACHE.NGO_TABLE_PAGINATION_COUNT
              );
              const response = await axiosClient.get(`users/${page}`, {
                params: {
                  per_page: count ? count.value : 10,
                },
              });
              const fetch = response.data.users.data as Ngo[];

              const item = {
                currentPage: page,
                data: fetch,
                lastPage: ngos.unFilterList.lastPage,
                totalItems: ngos.unFilterList.totalItems,
                perPage: ngos.unFilterList.perPage,
              };
              setNgos({
                filterList: item,
                unFilterList: item,
              });
            } catch (error: any) {
              toast({
                toastType: "ERROR",
                title: t("Error"),
                description: error.response.data.message,
              });
            }
          }}
        />
      </div>
    </>
  );
}

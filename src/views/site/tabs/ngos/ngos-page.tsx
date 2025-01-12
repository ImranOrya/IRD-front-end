import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import SecondaryButton from "@/components/custom-ui/button/SecondaryButton";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosClient from "@/lib/axois-client";
import { useTranslation } from "react-i18next";
import {
  NgoFilter,
  NgoPaginationData,
  NgoSearch,
  NgoSort,
  Order,
} from "@/lib/types";
import { CACHE } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "react-router";
import useCacheDB from "@/lib/indexeddb/useCacheDB";

import { Ngo } from "@/database/tables";

import CustomSelect from "@/components/custom-ui/select/CustomSelect";
import Pagination from "@/components/custom-ui/table/Pagination";

// Define the NGO type
interface Ngos {
  registrationNo: string;
  name: string;
  status: string;
  abbreviation: string;
  dateOfEstablishment: string;
  directorName: string;
  province: string;
  workArea: string;
}

function NgosPage() {
  //

  const { updateComponentCache, getComponentCache } = useCacheDB();

  const [searchParams] = useSearchParams();
  // Accessing individual search filters
  const search1 = searchParams.get("search1");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const [filters, setFilters] = useState<NgoFilter>({
    sort: sort == null ? "id" : (sort as NgoSort),
    order: order == null ? "asc" : (order as Order),
    search: {
      column: search1 == null ? "id" : (search1 as NgoSearch),
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

  const [search, setSearch] = useState<string>("");
  const [filteredNgos, setFilteredNgos] = useState<Ngos[]>([]);

  const ngo: Ngos[] = [
    {
      registrationNo: "2323",
      name: "German Medical Service",
      status: "Active",
      abbreviation: "GMS",
      dateOfEstablishment: "2024/2/13",
      directorName: "Dr. Asadullah Safi",
      province: "Kabul",
      workArea: "Paghman Oryakhil",
    },
    {
      registrationNo: "2324",
      name: "International Health Organization",
      status: "Inactive",
      abbreviation: "IHO",
      dateOfEstablishment: "2021/5/19",
      directorName: "Dr. Fatima Omar",
      province: "Herat",
      workArea: "Chisht-e-Sharif",
    },
  ];

  // Populate `filteredNgos` with all NGOs initially
  useEffect(() => {
    setFilteredNgos(ngo);
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    const results = ngo.filter(
      (ngo) =>
        ngo.name.toLowerCase().includes(search.toLowerCase()) ||
        ngo.abbreviation.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNgos(results);
  };

  return (
    <>
      <div className="flex justify-between sm:items-baseline sm:flex-row rounded-md bg-card gap-2 flex-1 px-2 py-2 mt-4">
        <Input
          type="text"
          placeholder={t("sea_ngo_name")} // Search by NGO Name or Abbreviation
          value={search}
          onChange={handleSearchChange}
          className="max-w-lg  h-14 rtl:text-2xl-rtl ltr:text-xl-ltr font-bold"
        />
        <SecondaryButton
          className="absolute  rtl:mr-96 ltr:ml-96 px-10   mt-2 h-10 rtl:text-2xl-rtl font-bold "
          onClick={handleSearchClick}
        >
          {t("search")}
        </SecondaryButton>

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

      <div className="flex flex-col gap-y-4">
        {/* Table */}
        <Card className="p-0">
          <Table className="min-w-full bg-white border rounded-lg shadow-xl">
            <TableHeader>
              <TableRow className="text-left text-gray-600 rtl:text-2xl-rtl">
                <TableHead className="p-3 border-b rtl:text-right ltr:text-left rtl:font-bold">
                  {t("reg_no")}
                </TableHead>
                <TableHead className="p-3 border-b rtl:text-right ltr:text-left rtl:font-bold">
                  {t("ngo_name")}
                </TableHead>
                <TableHead className="p-3 border-b rtl:text-right ltr:text-left rtl:font-bold">
                  {t("status")}
                </TableHead>
                <TableHead className="p-3 border-b rtl:text-right ltr:text-left rtl:font-bold">
                  {t("abbrebviation")}
                </TableHead>
                <TableHead className="p-3 border-b rtl:text-right ltr:text-left rtl:font-bold">
                  {t("date_of_est")}
                </TableHead>
                <TableHead className="p-3 border-b rtl:text-right ltr:text-left rtl:font-bold">
                  {t("direc_name")}
                </TableHead>
                <TableHead className="p-3 border-b rtl:text-right ltr:text-left rtl:font-bold">
                  {t("province")}
                </TableHead>
                <TableHead className="p-3 border-b rtl:text-right ltr:text-left rtl:font-bold">
                  {t("activi_area")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNgos.length > 0 ? (
                filteredNgos.map((ngo) => (
                  <TableRow key={ngo.registrationNo}>
                    <TableCell className="p-3 border-b rtl:text-right ltr:text-left">
                      {ngo.registrationNo}
                    </TableCell>
                    <TableCell className="p-3 border-b rtl:text-right ltr:text-left">
                      {ngo.name}
                    </TableCell>
                    <TableCell className="p-3 border-b rtl:text-right ltr:text-left">
                      {ngo.status}
                    </TableCell>
                    <TableCell className="p-3 border-b rtl:text-right ltr:text-left">
                      {ngo.abbreviation}
                    </TableCell>
                    <TableCell className="p-3 border-b rtl:text-right ltr:text-left">
                      {ngo.dateOfEstablishment}
                    </TableCell>
                    <TableCell className="p-3 border-b rtl:text-right ltr:text-left">
                      {ngo.directorName}
                    </TableCell>
                    <TableCell className="p-3 border-b rtl:text-right ltr:text-left">
                      {ngo.province}
                    </TableCell>
                    <TableCell className="p-3 border-b rtl:text-right ltr:text-left">
                      {ngo.workArea}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="p-3 border-b text-center" colSpan={8}>
                    {t("No results found")}
                  </TableCell>
                </TableRow>
              )}
              <div className="flex justify-between rounded-md bg-card flex-1 p-3 items-center">
                <h1 className="rtl:text-lg-rtl ltr:text-md-ltr font-medium">{`${t(
                  "page"
                )} ${ngos.unFilterList.currentPage} ${t("of")} ${
                  ngos.unFilterList.lastPage
                }`}</h1>
                <Pagination
                  lastPage={10}
                  onPageChange={async (page: any) => {
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
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}

export default NgosPage;

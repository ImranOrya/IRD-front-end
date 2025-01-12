import SecondaryButton from "@/components/custom-ui/button/SecondaryButton";
import AnimHomeIcon from "@/components/custom-ui/icons/AnimHomeIcon";
import CustomSelect from "@/components/custom-ui/select/CustomSelect";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { t } from "i18next";
import { Link, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import axiosClient from "@/lib/axois-client";
import { useTranslation } from "react-i18next";
import {
  NewsFilter,
  NewsPaginationData,
  NewsSearch,
  NewsSort,
  Order,
} from "@/lib/types";
import { CACHE } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "react-router";
import useCacheDB from "@/lib/indexeddb/useCacheDB";

import { News } from "@/database/tables";

import NewsDropdown from "./newsdropdown";
import { DateObject } from "react-multi-date-picker";
import CustomInput from "@/components/custom-ui/input/CustomInput";
import { Search } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import FooterSection from "../../general/footer/footer-section";
import Pagination from "@/components/custom-ui/table/Pagination";

interface Img {
  id: number;
  image: string;
  title: string;
  footer: string;
  date: string;
  date_title: string;
  moreInfoLink: string;
}

export default function NewsPage() {
  const { updateComponentCache, getComponentCache } = useCacheDB();
  const searchRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  // Accessing individual search filters
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");
  const [filters, setFilters] = useState<NewsFilter>({
    sort: sort == null ? "title" : (sort as NewsSort),
    order: order == null ? "asc" : (order as Order),
    search: {
      column: search == null ? "title" : (search as NewsSearch),
      value: "",
    },
    date: [],
  });
  const loadList = async (count: number, dataFilters: NewsFilter, page = 1) => {
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
      const response = await axiosClient.get(`news/${page}`, {
        params: {
          per_page: count,
          filters: {
            sort: dataFilters.sort,
            search: {
              column: dataFilters.search.column,
              value: dataFilters.search.value,
            },
            date: dates,
          },
        },
      });
      const fetch = response.data.news.data as News[];
      const lastPage = response.data.news.last_page;
      const totalItems = response.data.news.total;
      const perPage = response.data.news.per_page;
      const currentPage = response.data.news.current_page;
      setNews({
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
  const initialize = async (dataFilters: NewsFilter) => {
    const count = await getComponentCache(
      CACHE.GUEST_NEWS_TABLE_PAGINATION_COUNT
    );
    loadList(count ? count.value : 10, dataFilters);
  };
  useEffect(() => {
    initialize(filters);
  }, [filters.sort]);
  const [news, setNews] = useState<{
    filterList: NewsPaginationData;
    unFilterList: NewsPaginationData;
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

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [images, setImages] = useState<Img[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=17ca245082a945f7bc6081b9c1a5832c"
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const mappedImages = data.articles.map(
          (article: any, index: number) => ({
            id: index,
            image: article.urlToImage || "https://via.placeholder.com/300",
            title: article.title || "No Title",
            footer: article.source?.name || "Unknown Source",
            date:
              new Date(article.publishedAt).toLocaleDateString() || "No Date",
            date_title: "Published",
          })
        );
        setImages(mappedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }
  const viewNews = () => {
    navigate("/news/" + 1);
  };
  return (
    <div className=" pt-2 flex flex-col gap-y-[2px] relative select-none  rtl:text-2xl-rtl ltr:text-xl-ltr">
      <Breadcrumb className="bg-card w-fit py-1 ltr:ps-3 ltr:pe-8 rtl:pe-3 rtl:ps-8 rounded-md border">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/dashboard">
              <AnimHomeIcon />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="rtl:rotate-180" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-tertiary">
              {t("news")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-center  sm:items-baseline  rounded-md bg-transparent flex-1 p-4 mt-4">
        <CustomInput
          size_="sm"
          placeholder={`${t(filters.search.column)}...`}
          parentClassName="flex-1"
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
        <NewsDropdown
          filters={filters}
          sortOnComplete={async (filterName: NewsSort) => {
            if (filterName != filters.sort) {
              setFilters({
                ...filters,
                sort: filterName,
              });
              const queryParams = new URLSearchParams();
              queryParams.set("search", filters.search.column);
              queryParams.set("sort", filterName);
              queryParams.set("order", filters.order);
              navigate(`/news?${queryParams.toString()}`);
              // sortList
              const item = {
                data: news.filterList.data,
                lastPage: news.unFilterList.lastPage,
                totalItems: news.unFilterList.totalItems,
                perPage: news.unFilterList.perPage,
                currentPage: news.unFilterList.currentPage,
              };
              setNews({
                ...news,
                filterList: item,
              });
            }
          }}
          searchOnComplete={async (filterName: NewsSearch) => {
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
              navigate(`/news?${queryParams.toString()}`, {
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

        <CustomSelect
          paginationKey={CACHE.GUEST_NEWS_TABLE_PAGINATION_COUNT}
          options={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "50", label: "50" },
          ]}
          className="w-fit sm:self-baseline"
          updateCache={(data: any) => updateComponentCache(data)}
          getCache={async () =>
            await getComponentCache(CACHE.GUEST_NEWS_TABLE_PAGINATION_COUNT)
          }
          placeholder={`${t("select")}...`}
          emptyPlaceholder={t("No options found")}
          rangePlaceholder={t("count")}
          onChange={async (value: string) => {
            loadList(parseInt(value), filters);
          }}
        />
      </div>
      <div
        className="grid gap-8 p-4 mt-28 mb-28 
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 
                    lg:grid-cols-2 
                    xl:grid-cols-3 
                    2xl:grid-cols-4"
      >
        {" "}
        {images.map((img) => (
          <Card key={img.id} className="relative group">
            <CardContent className="p-0 h-[300px]">
              <img
                src={img.image}
                alt={img.title}
                className="min-w-full h-full object-fill rounded"
              />
            </CardContent>
            <CardFooter className="flex flex-col justify-start items-start p-4">
              <h2 className="font-bold text-xl ltr:text-left rtl:text-right mb-2">
                {img.title}
              </h2>
              <p className="ltr:text-left rtl:text-right text-sm text-gray-600">
                {img.footer} | {img.date} {img.date_title}
              </p>
              {/* Link appears when hovering the card */}
              <a
                href={img.moreInfoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex justify-end items-end bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity"
              >
                <button
                  onClick={viewNews}
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
                >
                  More Info
                </button>
              </a>
            </CardFooter>
          </Card>
        ))}{" "}
      </div>{" "}
      <div className=" w-full flex items-center gap-12 rounded-md bg-card  flex-1 p-3 ">
        <h1 className="rtl:text-lg-rtl ltr:text-md-ltr font-medium">{`${t(
          "page"
        )} ${news.unFilterList.currentPage} ${t("of")} ${
          news.unFilterList.lastPage
        }`}</h1>
        <Pagination
          lastPage={10}
          onPageChange={async (page: any) => {
            try {
              const count = await getComponentCache(
                CACHE.GUEST_NEWS_TABLE_PAGINATION_COUNT
              );
              const response = await axiosClient.get(`news/${page}`, {
                params: {
                  per_page: count ? count.value : 10,
                },
              });
              const fetch = response.data.news.data as News[];

              const item = {
                currentPage: page,
                data: fetch,
                lastPage: news.unFilterList.lastPage,
                totalItems: news.unFilterList.totalItems,
                perPage: news.unFilterList.perPage,
              };
              setNews({
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
      <FooterSection />
    </div>
  );
}

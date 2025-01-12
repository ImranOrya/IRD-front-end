import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface DataItem {
  id: string;
  title: string;
  date: string;
  description: string;
  img: string;
}

function NewsInfo() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=17ca245082a945f7bc6081b9c1a5832c"
        );

        const articles = response.data.articles;

        const formattedData = articles.map((article: any) => ({
          id: article.url,
          title: article.title,
          date: article.publishedAt,
          description: article.description,
          img: article.urlToImage || "",
        }));

        setData(formattedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>News Articles</h1>

      <>
        <h2 className=" font-bold ltr:text-4xl-rtl ltr:text-left rtl:text-right text-wrap w-[1000px] mt-14 mb-4 ">
          Taliban Militants Say They Will Target Pakistan Army-Owned Firms
        </h2>
        <Card className="relative group">
          <CardContent className="p-0 w-[1000px] h-[800px]">
            <img
              src="https://www.livemint.com/lm-img/img/2024/12/06/600x338/company_3_1733465099406_1733465108677.png"
              alt="Taliban Militants Say They Will Target Pakistan Army-Owned Firms"
              className="w-full h-[800px] object-fill rounded"
            />
          </CardContent>
        </Card>
        <div className="mb-4">
          <p className="text-center font-semibold  text-4xl-ltr text-gray-600 text-wrap  w-[1000px] ltr:text-left rtl:text-right">
            Published 7/Jun/2025
          </p>
        </div>

        <p className="text-center font-bold text-4xl-ltr text-gray-600 text-wrap  w-[1000px] ltr:text-left rtl:text-right">
          Militants belonging to Tehreek-i-Taliban Pakistan or TTP said they
          will now target local businesses, including listed firms, owned by the
          South Asian nation’s powerful army. The statement by the terrorist
          group loosely affiliated with Afghanistan Taliban on Sunday evening
          comes days after the two nations clashed at the border.
        </p>
        <p className="text-center font-bold text-4xl-ltr text-gray-600 text-wrap  w-[1000px] ltr:text-left rtl:text-right">
          TTP’s target include Fauji Cement Company Ltd., Askari Bank Ltd.,
          Fauji Fertilizer Company Ltd., Fauji Foods Ltd., Askari Cement Ltd.,
          Askari Fuels, National Logistic Cell, Frontier Works Organization,
          Pakistan Ordnance Factory, Fauji Foundation, the Defence Housing
          Authority and all the institutions that have military’s shares in
          them.
        </p>
        <div className="flex flex-col justify-center  items-center">
          <h1 className="text-center font-bold text-4xl-ltr text-gray-600 text-wrap  w-[1000px] ltr:text-left rtl:text-right">
            Uploded By:
          </h1>
          <p>Ahmad Orya</p>
          <p>Director of IRD</p>
          <p>Ahmad@gmail.com</p>
        </div>
      </>
    </div>
  );
}

export default NewsInfo;

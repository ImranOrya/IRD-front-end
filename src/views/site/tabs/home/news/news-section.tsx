import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Img {
  id: number;
  image: string;
  title: string;
  footer: string;
  date: string;
  date_title: string;
}

function NewSection() {
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <h1 className="bg-primary dark:bg-primary/90 h-16 flex items-center justify-center font-bold text-4xl-ltr text-white">
        News
      </h1>
      <div
        className="grid gap-8 p-4 mt-28 mb-28 
                    grid-cols-1 
                    sm:grid-cols-1 
                    md:grid-cols-2 
                    lg:grid-cols-2 
                    xl:grid-cols-3 
                    2xl:grid-cols-4"
      >
        {images.map((img) => (
          <Card key={img.id} className="relative group">
            <CardContent className="p-0  h-[300px]">
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
              <p className="text-center text-sm text-gray-600">
                {img.footer} | {img.date} {img.date_title}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default NewSection;

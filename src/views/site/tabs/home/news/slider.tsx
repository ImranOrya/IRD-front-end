import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Slide {
  id: number;
  image1: string;
  title: string;
  description: string;
  date: string;
}

function SliderSection() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=17ca245082a945f7bc6081b9c1a5832c"
        );

        const formattedSlides: Slide[] = response.data.articles.map(
          (article: any, index: number) => ({
            id: index + 1,
            image1: article.urlToImage || "",
            title: article.title || "No Title",
            description: article.description || "No Description",
          })
        );

        setSlides(formattedSlides);
      } catch (err) {
        setError("Failed to load slides.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full max-w-lg mx-auto py-20">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent className="relative group">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className=" w-full">
              <Card className="relative group">
                <CardContent className="p-0  h-[300px] ">
                  <img
                    src={slide.image1}
                    alt={`Slide ${slide.id} Image`}
                    className="min-w-full h-full object-fill rounded"
                  />
                  <div>
                    {" "}
                    <h3 className="flex flex-col justify-start items-start p-4">
                      {slide.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default SliderSection;

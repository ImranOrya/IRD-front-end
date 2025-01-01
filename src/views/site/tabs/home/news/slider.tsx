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
    <div className="w-full max-w-lg mx-auto">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="w-full">
              <Card>
                <CardContent className="p-4">
                  <img
                    src={slide.image1}
                    alt={`Slide ${slide.id} Image`}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                  />
                  <h3 className="mt-4 text-center text-xl font-semibold">
                    {slide.title}
                  </h3>
                  <p className="mt-2 text-center text-gray-600">
                    {slide.description}
                  </p>
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

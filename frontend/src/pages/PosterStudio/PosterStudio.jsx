import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { toPng } from "html-to-image";

export default function PosterStudio() {
  const [festival, setFestival] = useState("");
  const [offer, setOffer] = useState("");
  const [theme, setTheme] = useState("");

  const [posterImage, setPosterImage] = useState("");
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [cta, setCta] = useState("");

  const [loading, setLoading] = useState(false);
  const [businessProfile, setBusinessProfile] =
    useState(null);

  const posterRef = useRef(null);

  useEffect(() => {
    const savedProfile =
      localStorage.getItem(
        "bizboost-profile"
      );

    if (savedProfile) {
      setBusinessProfile(
        JSON.parse(savedProfile)
      );
    }
  }, []);

  const handleDownload = async () => {
    if (!posterRef.current) return;

    try {
      const dataUrl = await toPng(
        posterRef.current,
        {
          cacheBust: true,
        }
      );

      const link =
        document.createElement("a");

      link.download =
        `${festival}-poster.png`;

      link.href = dataUrl;

      link.click();
    } catch (error) {
      console.error(
        "Download failed:",
        error
      );
    }
  };

  const getTemplateImage = () => {
    const fest =
      festival.toLowerCase();

    if (fest.includes("diwali")) {
      return "diwali.png";
    }

    if (fest.includes("holi")) {
      return "holi.png";
    }

    if (fest.includes("christmas")) {
      return "christmas.png";
    }

    if (fest.includes("new year")) {
      return "newyear.png";
    }

    return "default.png";
  };

  const handleGenerate = async () => {
    if (!festival || !offer || !theme) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response =
        await api.post(
          "/posters/generate",
          {
            festival,
            offer,
            theme,
          }
        );

      setHeadline(
        response.data.headline
      );

      setSubheadline(
        response.data.subheadline
      );

      setCta(
        response.data.cta
      );

      setPosterImage(
        getTemplateImage()
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to generate poster."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">
        Poster Studio
      </h1>

      <div className="space-y-4">
        <Input
          placeholder="Festival (Diwali, Holi, Christmas)"
          value={festival}
          onChange={(e) =>
            setFestival(
              e.target.value
            )
          }
        />

        <Input
          placeholder="Offer"
          value={offer}
          onChange={(e) =>
            setOffer(
              e.target.value
            )
          }
        />

        <Input
          placeholder="Theme (Gold, Luxury, Modern)"
          value={theme}
          onChange={(e) =>
            setTheme(
              e.target.value
            )
          }
        />

        <Button
          onClick={
            handleGenerate
          }
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Poster"}
        </Button>

        {posterImage && (
          <>
            <div
              ref={posterRef}
              className="relative mt-8 max-w-4xl"
            >
              <img
                src={posterImage}
                alt="Poster"
                className="w-full rounded-xl shadow-lg"
              />

              <div className="absolute inset-0 bg-black/40 rounded-xl flex flex-col justify-center items-center text-center p-6">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {
                    businessProfile?.businessName
                  }
                </h2>

                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  {headline}
                </h1>

                <p className="text-xl md:text-3xl text-white mt-4">
                  {subheadline}
                </p>

                <div className="mt-6 text-white space-y-1">
                  <p>
                    📍{" "}
                    {
                      businessProfile?.location
                    }
                  </p>

                  <p>
                    🌐{" "}
                    {
                      businessProfile?.website
                    }
                  </p>

                  <p>
                    📸{" "}
                    {
                      businessProfile?.instagram
                    }
                  </p>
                </div>

                <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold">
                  {cta}
                </button>
              </div>
            </div>

            <button
              onClick={
                handleDownload
              }
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Download Poster
            </button>
          </>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContentStudio() {
  const [contentType, setContentType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] =
    useState("");
  const [businessProfile, setBusinessProfile] =
    useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem(
      "bizboost-profile"
    );

    if (savedProfile) {
      setBusinessProfile(
        JSON.parse(savedProfile)
      );
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      generatedContent
    );

    alert("Content copied to clipboard!");
  };

  const saveToHistory = (content) => {
    const history =
      JSON.parse(
        localStorage.getItem(
          "bizboost-history"
        )
      ) || [];

    const newEntry = {
      id: Date.now(),
      type: contentType,
      content,
      createdAt:
        new Date().toLocaleString(),
    };

    localStorage.setItem(
      "bizboost-history",
      JSON.stringify([
        newEntry,
        ...history,
      ])
    );
  };

  const saveContentToDatabase = async (
  generatedText
) => {
  const payload = {
    content_type: contentType,
    prompt: prompt,
    generated_content: generatedText,
  };

  console.log("PAYLOAD:", payload);

  try {
    const response = await api.post(
      "/content/",
      payload
    );

    console.log(
      "Content saved:",
      response.data
    );

  } catch (error) {

     console.log(
    JSON.stringify(
      error.response?.data,
      null,
      2
    )
  );

    console.error(error);
  }
};

  const handleGenerate = async () => {
    const businessName =
      businessProfile?.businessName ||
      "Your Business";

    const businessType =
      businessProfile?.businessType ||
      "Business";

    const location =
      businessProfile?.location ||
      "Your City";

    if (!prompt.trim()) {
      alert(
        "Please enter promotion details."
      );
      return;
    }

    if (!contentType) {
      alert(
        "Please select a content type."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/ai/generate-content",
        {
          business_name:
            businessName,
          business_type:
            businessType,
          location: location,
          content_type:
            contentType,
          prompt: prompt,
        }
      );

      console.log("AI Response:", response.data);

const generatedText =
  response.data.content ||
  response.data.generated_content ||
  "";

      setGeneratedContent(
        generatedText
      );

      await saveContentToDatabase(
        generatedText
      );

      saveToHistory(generatedText);
    } catch (error) {
      console.error(error);

      alert(
        "Failed to generate content."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        Content Studio
      </h1>

      <div className="space-y-4">
        <Select
          onValueChange={
            setContentType
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Content Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="social">
              Social Media Post
            </SelectItem>

            <SelectItem value="whatsapp">
              WhatsApp Campaign
            </SelectItem>

            <SelectItem value="website">
              Website Content
            </SelectItem>

            <SelectItem value="festival">
              Festival Campaign
            </SelectItem>
          </SelectContent>
        </Select>

        <Textarea
          placeholder="Enter promotion details..."
          value={prompt}
          onChange={(e) =>
            setPrompt(
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
            : "Generate Content"}
        </Button>

        {generatedContent && (
          <div className="border rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">
                Generated Content
              </h3>

              <Button
                size="sm"
                onClick={
                  handleCopy
                }
              >
                Copy
              </Button>
            </div>

            <p className="whitespace-pre-line">
              {generatedContent}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
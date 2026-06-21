import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Profile() {
  const [profile, setProfile] = useState({
    businessName: "",
    businessType: "",
    location: "",
    services: "",
    phone: "",
    website: "",
    instagram: "",
  });
  useEffect(() => {
  const savedProfile = localStorage.getItem("bizboost-profile");

  if (savedProfile) {
    setProfile(JSON.parse(savedProfile));
  }
}, []);

  const handleSave = async () => {
  try {
    await api.post("/profile/", {
      business_name: profile.businessName,
      business_type: profile.businessType,
      location: profile.location,
      services: profile.services,
      phone: profile.phone,
      website: profile.website,
      instagram: profile.instagram,
    });

    localStorage.setItem(
      "bizboost-profile",
      JSON.stringify(profile)
    );

    alert("Profile Saved Successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to save profile.");
  }
};
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Business Profile
      </h1>

      <div className="space-y-5">

        <Input
          placeholder="Business Name"
          value={profile.businessName}
          onChange={(e) =>
            setProfile({
              ...profile,
              businessName: e.target.value,
            })
          }
        />

        <Select
          onValueChange={(value) =>
            setProfile({
              ...profile,
              businessType: value,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Business Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Cafe">Cafe</SelectItem>
            <SelectItem value="Salon">Salon</SelectItem>
            <SelectItem value="Gym">Gym</SelectItem>
            <SelectItem value="Coaching">Coaching</SelectItem>
            <SelectItem value="Agency">Agency</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Location"
          value={profile.location}
          onChange={(e) =>
            setProfile({
              ...profile,
              location: e.target.value,
            })
          }
        />

        <Textarea
          placeholder="Services Offered"
          value={profile.services}
          onChange={(e) =>
            setProfile({
              ...profile,
              services: e.target.value,
            })
          }
        />

        <Input
          placeholder="Phone Number"
          value={profile.phone}
          onChange={(e) =>
            setProfile({
              ...profile,
              phone: e.target.value,
            })
          }
        />

        <Input
          placeholder="Website URL"
          value={profile.website}
          onChange={(e) =>
            setProfile({
              ...profile,
              website: e.target.value,
            })
          }
        />

        <Input
          placeholder="Instagram URL"
          value={profile.instagram}
          onChange={(e) =>
            setProfile({
              ...profile,
              instagram: e.target.value,
            })
          }
        />

        <Button onClick={handleSave}>
          Save Profile
        </Button>

      </div>
    </div>
  );
}
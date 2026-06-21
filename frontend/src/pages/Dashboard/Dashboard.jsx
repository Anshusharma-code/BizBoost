import { useState } from "react";

import Profile from "../Profile/Profile";
import ContentStudio from "../ContentStudio/ContentStudio";
import ReviewInsights from "../ReviewInsights/ReviewInsights";
import History from "../History/History";

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";

import { Card, CardContent } from "@/components/ui/card";
import PosterStudio from "../PosterStudio/PosterStudio";
export default function Dashboard() {
  const [activePage, setActivePage] = useState("overview");
  const handleLogout = () => {
  localStorage.removeItem(
    "bizboost-token"
  );

  localStorage.removeItem(
    "bizboost-user"
  );

  window.location.href = "/login";
};


  const features = [
    {
      title: "Business Profile",
      description: "Set up your business information.",
    },
    {
      title: "Content Studio",
      description: "Generate AI marketing content.",
    },
    {
      title: "Review Insights",
      description: "Analyze customer reviews.",
    },
    {
      title: "History",
      description: "View generated content history.",
    },
      {
    title: "Poster Studio",
    description:
      "Generate branded promotional posters instantly.",
  },
  ];

  return (
    <div className="flex">
      <DashboardSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1">
        <DashboardHeader />

        <main className="p-6">
          {activePage === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">

  <Card>
    <CardContent className="p-6">
      <p className="text-muted-foreground">
        Content Generated
      </p>

      <h3 className="text-3xl font-bold">
        24
      </h3>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <p className="text-muted-foreground">
        Reviews Analyzed
      </p>

      <h3 className="text-3xl font-bold">
        12
      </h3>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <p className="text-muted-foreground">
        Posters Created
      </p>

      <h3 className="text-3xl font-bold">
        8
      </h3>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-6">
      <p className="text-muted-foreground">
        Campaigns
      </p>

      <h3 className="text-3xl font-bold">
        5
      </h3>
    </CardContent>
  </Card>

</div>

            

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <Card
                      key={feature.title}
                      className="
                      cursor-pointer
                      hover:shadow-xl
                      hover:-translate-y-1
                      transition-all
                      duration-300
                           "
                   >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold">
                        {feature.title}
                      </h3>

                      <p className="text-muted-foreground mt-2">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activePage === "profile" && <Profile />}

          {activePage === "content" && (
            <ContentStudio />
          )}

          {activePage === "reviews" && (
            <ReviewInsights />
          )}

          {activePage === "history" && (
            <History />
          )}
          {activePage === "poster" && (
  <PosterStudio />
)}
        </main>
      </div>
    </div>
  );
}
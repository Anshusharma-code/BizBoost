export default function DashboardHeader() {
  const user = JSON.parse(
    localStorage.getItem("bizboost-user")
  );

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-5">

      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.name} 
        </h1>

        <p className="text-muted-foreground mt-1">
          Manage your marketing campaigns,
          content and posters from one place.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="hidden md:block">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
            BizBoost AI
          </span>
        </div>

        <div
          className="
            w-10
            h-10
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
          "
        >
          {user?.name
            ?.charAt(0)
            ?.toUpperCase()}
        </div>

      </div>

    </header>
  );
}
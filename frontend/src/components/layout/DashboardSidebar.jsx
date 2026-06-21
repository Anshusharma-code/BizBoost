import {
  LayoutDashboard,
  Building2,
  FileText,
  BarChart3,
  History,
  ImageIcon
} from "lucide-react";
export default function DashboardSidebar({
  activePage,
  setActivePage,
}) {
  const items = [
    { icon: LayoutDashboard, label: "Overview", value: "overview" },
    { icon: Building2, label: "Business Profile", value: "profile" },
    { icon: FileText, label: "Content Studio", value: "content" },
    { icon: BarChart3, label: "Review Insights", value: "reviews" },
    { icon: History, label: "History", value: "history" },
    {
  icon: ImageIcon,
  label: "Poster Studio",
  value: "poster"
}
  ];
  const handleLogout = () => {
  localStorage.removeItem("bizboost-token");
  localStorage.removeItem("bizboost-user");

  window.location.href = "/login";
};

  return (
    <aside className="
w-64
border-r
min-h-screen
p-5
bg-white
sticky
top-0
">
      <div className="mb-10">
  <h2 className="text-2xl font-bold text-blue-600">
    BizBoost AI
  </h2>

  <p className="text-sm text-muted-foreground">
    Marketing Made Simple
  </p>
</div>
<p className="text-xs uppercase text-muted-foreground mb-3 px-3">
  Workspace
</p>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            onClick={() => setActivePage(item.value)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              activePage === item.value
  ? "bg-blue-50 text-blue-600 font-semibold"
                : "hover:bg-slate-100 transition-all"
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-10">
  <button
    onClick={handleLogout}
    className="
      w-full
      bg-blue-500
      hover:bg-red-600
      text-white
      py-2
      rounded-lg
    "
  >
    Logout
  </button>
</div>
    </aside>
  );
}
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import GitHub from "./components/Github";
import News from "./components/News";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  return (
    <main className="min-h-screen text-white relative">
      {/* Animated Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/city-compressed.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay so text is readable */}
      <div className="fixed inset-0 bg-gray-950/50 -z-10" />

      {/* Header */}
      <header className="px-8 pt-8 pb-2">
        <h1 className="text-4xl font-bold tracking-tight">
          {getGreeting()},{" "}
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Nick
          </span>
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s your dashboard overview
        </p>
      </header>

      {/* Widgets */}
      <div className="p-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Clock />
          <Weather />
          <GitHub />
          <div className="md:col-span-2 lg:col-span-3">
            <News />
          </div>
        </div>
      </div>
    </main>
  );
}

import MyCrews from "@/components/home/MyCrews";
import RecommendedCrews from "@/components/common/RecommendedCrews";
import TodayRunCard from "@/components/home/TodayRunCard";

export default function HomePage() {
  return (
    <>
      <header>
        <h1 className="text-2xl font-bold">오늘 함께 달릴까요?</h1>
        <p className="text-app-subtext mt-3 text-sm">
          크루와 함께하는 러닝 일정을 확인해보세요
        </p>
      </header>
      <TodayRunCard />
      <MyCrews />
      <RecommendedCrews />
    </>
  );
}

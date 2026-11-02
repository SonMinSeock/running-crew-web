/**
 * 피드 작성 UI와 가입한 크루가 없는 경우의 안내 화면을 구성한다.
 */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeedCreateForm from "@/components/feed/FeedCreateForm";
import { CREWS } from "@/data/crews";
import { USER_PROFILE } from "@/data/profile";

export default function FeedCreatePage() {
  const joinedCrews = CREWS.filter((crew) => crew.isJoined);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <section
      aria-labelledby="feed-create-title"
      className="mx-auto max-w-2xl space-y-6"
    >
      <h1 id="feed-create-title" className="text-xl font-bold">
        오늘의 러닝 이야기를 남겨보세요
      </h1>
      {joinedCrews.length === 0 ? (
        <div className="bg-app-card rounded-3xl px-5 py-12 text-center">
          <h2 className="text-lg font-bold">아직 가입한 크루가 없습니다.</h2>
          <p className="text-app-subtext mt-3 text-sm">
            함께 달릴 크루를 찾아보세요.
          </p>
          <Button asChild variant="link" className="text-app-accent mt-4">
            <Link to="/crews">크루 목록으로 이동</Link>
          </Button>
        </div>
      ) : (
        <FeedCreateForm crews={joinedCrews} profile={USER_PROFILE} />
      )}
    </section>
  );
}

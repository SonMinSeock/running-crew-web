/**
 * 러닝 소개와 집결 안내를 표시하고 빈 안내에는 대체 문구를 제공한다.
 */
interface RunDetailGuideProps {
  description: string;
  meetingGuide: string;
}

export default function RunDetailGuide({
  description,
  meetingGuide,
}: RunDetailGuideProps) {
  return (
    <div className="space-y-5">
      {[
        {
          id: "run-description-title",
          title: "러닝 소개",
          content: description,
        },
        { id: "run-meeting-title", title: "집결 안내", content: meetingGuide },
      ].map((guide) => (
        <section
          key={guide.id}
          aria-labelledby={guide.id}
          className="bg-app-card rounded-3xl p-5 md:p-6"
        >
          <h2 id={guide.id} className="font-bold">
            {guide.title}
          </h2>
          <p className="text-app-subtext mt-3 text-sm leading-relaxed break-words whitespace-pre-wrap">
            {guide.content.trim() ? guide.content : "등록된 안내가 없습니다."}
          </p>
        </section>
      ))}
    </div>
  );
}

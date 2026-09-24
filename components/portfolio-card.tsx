import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/lib/data/portfolio";

export function PortfolioCard({
  project,
  href,
}: {
  project: Project;
  href?: string;
}) {
  const content = (
    <>
      <ImagePlaceholder
        label="[Project image]"
        className="mb-3.5 h-[180px] w-full"
      />
      <div className="mb-2 font-sans text-[15px] font-semibold">
        {project.name}
      </div>
      <Tag tone={project.vertical}>{project.tag}</Tag>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}

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
        className="mb-4 aspect-[4/3] w-full transition-opacity duration-300 group-hover:opacity-80"
      />
      <div className="mb-2 font-display text-xl font-semibold tracking-[-0.02em]">
        {project.name}
      </div>
      <Tag tone={project.vertical}>{project.tag}</Tag>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group block">
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}

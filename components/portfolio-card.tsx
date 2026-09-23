import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/lib/data/portfolio";

export function PortfolioCard({ project }: { project: Project }) {
  return (
    <div>
      <ImagePlaceholder
        label="[Project image]"
        className="mb-3.5 h-[180px] w-full"
      />
      <div className="mb-2 font-sans text-[15px] font-semibold">
        {project.name}
      </div>
      <Tag tone={project.vertical}>{project.tag}</Tag>
    </div>
  );
}

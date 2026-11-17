import { component$ } from "@builder.io/qwik";
import type { Project } from "../../lib/catalog";
import { FurnitureDrawing } from "../furniture-drawing/furniture-drawing";

export const ProjectCard = component$<{ project: Project }>(({ project }) => (
  <article class="project-card">
    <a
      href={`/portfolio/#${project.id}`}
      class="drawing-link"
      aria-label={`Scopri ${project.name}, ${project.type.toLowerCase()} dimostrativo`}
    >
      <div class="flex justify-between px-5 pt-5">
        <span class="eyebrow">R / {project.number}</span>
        <span class="text-[10px] uppercase tracking-widest">
          Studio di arredo
        </span>
      </div>
      <FurnitureDrawing
        kind={project.kind}
        label={`Disegno illustrativo del concept ${project.type.toLowerCase()} ${project.name}`}
      />
    </a>
    <div class="flex items-start justify-between gap-4 border-t border-line pt-5">
      <div>
        <p class="eyebrow text-muted">
          {project.type} / {project.wood}
        </p>
        <h3 class="mt-2 font-display text-3xl">
          <a href={`/portfolio/#${project.id}`}>{project.name}</a>
        </h3>
      </div>
      <span class="mt-5 text-xl text-copper" aria-hidden="true">
        ↗
      </span>
    </div>
    <p class="mt-3 text-xs leading-6 text-muted">
      {project.dimensions} · {project.finish}
    </p>
  </article>
));

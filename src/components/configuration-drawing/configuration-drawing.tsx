import { component$ } from "@builder.io/qwik";
import { type Configuration, products } from "../../lib/configurator.js";
import { woods, finishes } from "../../lib/catalog.js";

export const ConfigurationDrawing = component$<{
  configuration: Configuration;
}>(({ configuration: c }) => {
  const scale = Math.min(
    300 / (c.width + c.depth * 0.5),
    220 / (c.height + c.depth * 0.25),
  );
  const w = c.width * scale,
    h = c.height * scale,
    dx = c.depth * scale * 0.5,
    dy = c.depth * scale * 0.25;
  const x = (480 - w - dx) / 2,
    y = (300 - h - dy) / 2 + dy + 10;
  const color = { noce: "#684833", rovere: "#b68c5f", frassino: "#d6c5a4" }[
    c.material
  ];
  const opacity =
    c.finish === "olio-pigmentato"
      ? 0.7
      : c.finish === "olio-naturale"
        ? 0.4
        : 0.23;
  const wood = woods.find((item) => item.id === c.material)!.name;
  const finish = finishes.find((item) => item.id === c.finish)!.name;
  return (
    <svg
      viewBox="0 0 480 350"
      class="furniture-drawing"
      role="img"
      aria-label={`${products[c.product].name} in ${wood}, ${finish}, larghezza ${c.width}, profondità ${c.depth}, altezza ${c.height} centimetri. Schema proporzionale illustrativo.`}
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="round"
    >
      <path
        d={`M${x} ${y}l${w} 0 ${dx} ${-dy} ${-w} 0Z`}
        fill={color}
        fill-opacity={opacity}
      />
      {c.product === "table" ? (
        <g>
          <path d={`M${x} ${y}v8h${w}l${dx} ${-dy}v-8M${x + w} ${y}v8`} />
          <path
            d={`M${x + 6} ${y + 8}v${h - 8}h9v${-h + 8}M${x + w - 15} ${y + 8}v${h - 8}h9v${-h + 8}M${x + w + dx - 9} ${y - dy + 8}v${h - 8}h9v${-h + 8}`}
            fill={color}
            fill-opacity={opacity}
          />
        </g>
      ) : (
        <g>
          <path
            d={`M${x} ${y}v${h}h${w}v${-h}M${x + w} ${y + h}l${dx} ${-dy}v${-h}`}
            fill={color}
            fill-opacity={opacity / 2}
          />
          {c.product === "shelf" ? (
            [1, 2, 3].map((i) => (
              <path key={i} d={`M${x} ${y + (h * i) / 4}h${w}l${dx} ${-dy}`} />
            ))
          ) : (
            <path d={`M${x + w / 2} ${y}v${h}M${x} ${y + 10}h${w}`} />
          )}
        </g>
      )}
      <path
        d={`M${x} ${y + h + 20}h${w}M${x + w + dx + 20} ${y - dy}v${h}`}
        stroke-dasharray="3 5"
        opacity=".5"
      />
      <text
        x={x + w / 2}
        y={y + h + 39}
        text-anchor="middle"
        stroke="none"
        fill="currentColor"
      >
        L {c.width} cm
      </text>
      <text
        x={x + w + dx + 24}
        y={y + h / 2 - dy}
        stroke="none"
        fill="currentColor"
      >
        H {c.height}
      </text>
      <text
        x="240"
        y="335"
        text-anchor="middle"
        stroke="none"
        fill="currentColor"
      >
        P {c.depth} cm · {wood} · {finish}
      </text>
    </svg>
  );
});

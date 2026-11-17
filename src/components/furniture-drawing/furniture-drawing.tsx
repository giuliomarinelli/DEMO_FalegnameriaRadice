import { component$ } from "@builder.io/qwik";
import type { FurnitureKind } from "../../lib/catalog";

export const FurnitureDrawing = component$<{
  kind: FurnitureKind;
  label: string;
}>(({ kind, label }) => (
  <svg
    viewBox="0 0 480 320"
    class="furniture-drawing"
    role="img"
    aria-label={label}
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linejoin="round"
  >
    <path d="M35 270H445M65 40V290" stroke-dasharray="2 7" opacity=".2" />
    {kind === "table" && (
      <g>
        <path
          d="M90 124 310 65 413 113 192 177Z"
          fill="#b68c5f"
          fill-opacity=".24"
        />
        <path d="M90 124v12l102 48 221-59v-12M192 177v7M106 144v94l14 7v-95M196 187v88l15-4v-88M390 133v91l-14 4v-91M299 81l88 41M231 99l91 43M164 117l92 43" />
        <path
          d="M105 260 180 295M210 295l192-52"
          stroke-dasharray="3 4"
          opacity=".6"
        />
        <text x="270" y="291" stroke="none" fill="currentColor">
          L 180
        </text>
        <text x="42" y="202" stroke="none" fill="currentColor">
          H 75
        </text>
        <text x="116" y="290" stroke="none" fill="currentColor">
          P 90
        </text>
      </g>
    )}
    {kind === "shelf" && (
      <g>
        <path
          d="M152 58 304 27 353 52 201 84Z"
          fill="#b68c5f"
          fill-opacity=".18"
        />
        <path d="M152 58v204l49 25 152-32V52M201 84v203M304 27v205l49 23M152 109l49 25 152-32M152 160l49 25 152-32M152 211l49 25 152-32M201 134l103-22 49 25M201 185l103-22 49 25M201 236l103-22 49 25M152 262l152-30" />
        <path
          d="M376 60v195M210 306l141-30"
          stroke-dasharray="3 4"
          opacity=".6"
        />
        <text x="380" y="161" stroke="none" fill="currentColor">
          H 180
        </text>
        <text x="260" y="308" stroke="none" fill="currentColor">
          L 96
        </text>
      </g>
    )}
    {kind === "sideboard" && (
      <g>
        <path
          d="M85 120 319 65 405 107 171 163Z"
          fill="#684833"
          fill-opacity=".2"
        />
        <path d="M85 120v105l86 42 234-56V107M171 163v104M85 225l234-56 86 42M319 65v104M288 135v105M171 175l234-56M186 265v18l14 7v-28M380 217v18l-14 4v-18M100 233v18l14 7v-18" />
        <path
          d="M185 303l210-50M431 114v97"
          stroke-dasharray="3 4"
          opacity=".6"
        />
        <text x="267" y="298" stroke="none" fill="currentColor">
          L 160
        </text>
        <text x="427" y="168" stroke="none" fill="currentColor">
          H 78
        </text>
      </g>
    )}
  </svg>
));

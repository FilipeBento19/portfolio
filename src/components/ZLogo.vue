<script setup>
// zMiister mark, same design as the end of the hero video (reel/src/SiteMotion.tsx):
// the Z draws as wireframe, a cyan line sweeps across and it turns solid; the cycle repeats every 7 s.
const Z = '30,30 210,30 210,70 104,170 210,170 210,210 30,210 30,170 136,70 30,70'
const EDGES = [
  [30, 30, 210, 70], [30, 70, 210, 30], [136, 70, 210, 70], [104, 170, 136, 70],
  [104, 170, 210, 70], [30, 170, 136, 70], [30, 170, 104, 170], [30, 210, 210, 170], [104, 170, 210, 210],
]
const uid = `z${Math.random().toString(36).slice(2, 8)}`
</script>

<template>
  <svg class="z" viewBox="-10 -10 260 260" aria-hidden="true">
    <defs>
      <linearGradient :id="uid" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#aefcff" />
        <stop offset="1" stop-color="#b919ff" />
      </linearGradient>
    </defs>
    <g class="z__solid">
      <polygon :points="Z" transform="translate(16 16)" fill="#500087" />
      <polygon :points="Z" :fill="`url(#${uid})`" />
    </g>
    <g class="z__wire" fill="none" stroke="#aefcff" stroke-width="6" stroke-linejoin="round">
      <polygon :points="Z" pathLength="1" />
      <line v-for="(e, i) in EDGES" :key="i" :x1="e[0]" :y1="e[1]" :x2="e[2]" :y2="e[3]" pathLength="1" opacity=".6" />
    </g>
    <rect class="z__sweep" x="-6" y="-10" width="8" height="260" fill="#aefcff" />
  </svg>
</template>

<style scoped>
.z { display: block; width: 30px; height: 30px; overflow: visible; }
.z__wire > * { stroke-dasharray: 1; animation: z-draw 7s var(--ease-enter) infinite; }
.z__solid { clip-path: inset(0 0 0 0); animation: z-fill 7s var(--ease-enter) infinite; }
.z__sweep { opacity: 0; animation: z-sweep 7s var(--ease-enter) infinite; filter: drop-shadow(0 0 6px #aefcff); }

/* 0–12% draw wire · 12–24% sweep fills the solid · hold · 92–100% fade back to wire */
@keyframes z-draw {
  0% { stroke-dashoffset: 1; opacity: 1; }
  12% { stroke-dashoffset: 0; opacity: 1; }
  26%, 90% { stroke-dashoffset: 0; opacity: .12; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}
@keyframes z-fill {
  0%, 12% { clip-path: inset(0 100% 0 0); }
  24%, 92% { clip-path: inset(0 0 0 0); }
  100% { clip-path: inset(0 0 0 100%); }
}
@keyframes z-sweep {
  0%, 12% { opacity: 1; transform: translateX(0); }
  24% { opacity: 1; transform: translateX(240px); }
  25%, 100% { opacity: 0; transform: translateX(240px); }
}

@media (prefers-reduced-motion: reduce) {
  .z__wire > *, .z__solid, .z__sweep { animation: none; }
  .z__wire { opacity: 0; }
}
</style>

<script setup>
import { nextTick, ref } from 'vue'

// Render breakdown inside a specialty card: textured solid → wireframe → normal map.
// All passes stay mounted (already decoded), so the next one is revealed exactly under the sweeping cyan line.
const props = defineProps({
  models: { type: Array, required: true }, // [{ id, name }] with images in /public/breakdowns/<id>/
  passes: { type: Array, required: true }, // labels for texture, wire, normal
  hint: { type: String, required: true },
  tabsLabel: { type: String, required: true },
})

const files = ['texture', 'wire', 'normal']
const DURATION = 700
const EASE = 'cubic-bezier(0, 0, .2, 1)'
const model = ref(0)
const step = ref(0)
const below = ref(0) // pass shown under the one being revealed
const imgs = ref([])
const line = ref(null)
let running = []

const src = (i) => `breakdowns/${props.models[model.value].id}/${files[i]}.webp`
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

async function next() {
  running.forEach((a) => a.finish())
  below.value = step.value
  step.value = (step.value + 1) % files.length
  if (reduced()) return
  await nextTick()
  const timing = { duration: DURATION, easing: EASE }
  running = [
    imgs.value[step.value].animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], timing),
    line.value.animate([{ left: '0%', opacity: 1 }, { left: '100%', opacity: 1, offset: 0.92 }, { left: '100%', opacity: 0 }], timing),
  ]
}

function pick(i) {
  running.forEach((a) => a.cancel())
  model.value = i
  step.value = below.value = 0
}

const layer = (i) => (i === step.value ? 2 : i === below.value ? 1 : 0)
</script>

<template>
  <div class="bd">
    <button type="button" class="bd__stage" :aria-label="`${models[model].name}: ${passes[step]}. ${hint}`" @click="next">
      <img
        v-for="(f, i) in files"
        :key="`${model}-${f}`"
        :ref="(el) => (imgs[i] = el)"
        class="bd__img"
        :style="{ zIndex: layer(i), visibility: layer(i) ? 'visible' : 'hidden' }"
        :src="src(i)"
        :alt="i === step ? `${models[model].name} — ${passes[i]}` : ''"
        width="1440"
        height="900"
        decoding="sync"
      />
      <span ref="line" class="bd__line" aria-hidden="true" />
      <span class="bd__pass" aria-hidden="true">
        <span v-for="(p, i) in passes" :key="p" class="bd__dot" :class="{ on: i === step }" />
        {{ passes[step] }}
      </span>
      <span class="bd__hint" aria-hidden="true">{{ hint }} <span class="arrow">→</span></span>
    </button>

    <div v-if="models.length > 1" class="bd__chips" role="tablist" :aria-label="tabsLabel">
      <button
        v-for="(m, i) in models"
        :key="m.id"
        type="button"
        role="tab"
        class="bd__chip"
        :aria-selected="i === model"
        @click="pick(i)"
      >
        {{ m.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.bd { position: relative; width: 100%; }
.bd__stage { position: relative; display: block; width: 100%; aspect-ratio: 16 / 10; padding: 0; border: 0; border-radius: 8px; overflow: hidden; background: #000; cursor: pointer; }
.bd__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.bd__line { position: absolute; z-index: 3; top: 0; bottom: 0; left: 0; width: 3px; margin-left: -1.5px; background: var(--cyan); box-shadow: 0 0 22px 5px rgba(174, 252, 255, .7); opacity: 0; pointer-events: none; }

.bd__pass, .bd__hint { position: absolute; z-index: 4; bottom: 10px; display: flex; align-items: center; gap: 6px; padding: 5px 9px; border-radius: 6px; background: rgba(0, 0, 0, .55); color: #fff; font: 500 12px/16px var(--font-ui); }
.bd__pass { left: 10px; }
.bd__hint { right: 10px; color: var(--cyan); gap: 4px; }
.bd__dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255, 255, 255, .35); transition: background-color .3s; }
.bd__dot.on { background: var(--cyan); }
.bd__dot:last-of-type { margin-right: 2px; }
.bd__stage:hover .arrow, .bd__stage:focus-visible .arrow { display: inline-block; animation: arrow-slide var(--hover-in) var(--ease-enter) forwards; }

.bd__chips { position: absolute; z-index: 5; top: 10px; left: 10px; display: flex; gap: 6px; }
.bd__chip { padding: 4px 10px; border: 1px solid rgba(255, 255, 255, .35); border-radius: 6px; background: rgba(0, 0, 0, .45); color: #fff; font: 500 12px/16px var(--font-ui); cursor: pointer; transition: background-color .2s, color .2s; }
.bd__chip:hover { border-color: #fff; }
.bd__chip[aria-selected='true'] { background: #fff; border-color: #fff; color: var(--ink); }

@media (max-width: 640px) { .bd__hint { display: none; } }
</style>

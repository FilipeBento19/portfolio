<script setup>
import { ref, computed, useAttrs, onMounted, onBeforeUnmount } from 'vue'

// href, aria-label, type e eventos vão para o botão; só a classe fica no wrapper
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()
const btnAttrs = computed(() => { const { class: _, ...rest } = attrs; return rest })

// Porte do GooeyCanvas + AnimatedGradientBorder do leonardo.ai.
// No hover, um canvas 2D desenha uma elipse que sobe de baixo e cobre o botão;
// o "progress" vai de 0→1 em 1.2s (entrada) e 1→0 em 1.08s (saída), easing power2.out.
const props = defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary
  tag: { type: String, default: 'button' },
})

// Cores reais do Leonardo (rgb 0–1). alphaFromGoo: fundo transparente, só a elipse aparece.
const COLORS = {
  primary: { fill: [0.224, 1, 0.416], bg: [1, 1, 1], alphaFromGoo: 0 },
  secondary: { fill: [1, 1, 1], bg: [0, 0, 0], alphaFromGoo: 1 },
}
const rgb = ([r, g, b]) => `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`

const canvas = ref(null)
const ring = ref(null)
const active = ref(false)
let progress = 0, tween = null, ringRaf = null, angle = 140
const canHover = matchMedia('(hover: hover)').matches
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

function draw() {
  const el = canvas.value
  const parent = el?.parentElement
  if (!parent || parent.offsetWidth < 1) return
  const dpr = Math.min(2, devicePixelRatio || 1)
  const cw = parent.offsetWidth + 2, ch = parent.offsetHeight + 2
  const W = Math.max(1, Math.floor(cw * dpr)), H = Math.max(1, Math.floor(ch * dpr))
  if (el.width !== W || el.height !== H) { el.width = W; el.height = H; el.style.width = `${cw}px`; el.style.height = `${ch}px` }

  const ctx = el.getContext('2d'), c = COLORS[props.variant], a = progress
  const bump = 4 * a * (1 - a)
  const cy = -0.35 + 0.85 * a
  const size = 0.12 + 1.5 * a
  const squash = 0.5 + 0.5 * (1 - (1 - a) * (1 - a)) + 0.4 * bump
  const rx = (size / (3.2 - a * a * 2.42 - 0.25 * bump)) * W
  const ry = size * squash * H
  if (c.alphaFromGoo > 0.5) ctx.clearRect(0, 0, W, H)
  else { ctx.fillStyle = rgb(c.bg); ctx.fillRect(0, 0, W, H) }
  if (c.alphaFromGoo > 0.5 && a < 0.01) return
  ctx.beginPath()
  ctx.ellipse(0.5 * W, (1 - cy) * H, rx, ry, 0, 0, Math.PI * 2)
  ctx.fillStyle = rgb(c.fill)
  ctx.fill()
}

// Tween mínimo equivalente ao gsap.to(..., { ease: 'power2.out' }) do Leonardo
function animateTo(target) {
  cancelAnimationFrame(tween)
  if (reduced) { progress = target; return draw() }
  const from = progress, dur = target ? 1200 : 1080, start = performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur)
    progress = from + (target - from) * (1 - (1 - t) ** 3)
    draw()
    if (t < 1) tween = requestAnimationFrame(step)
  }
  tween = requestAnimationFrame(step)
}

const enter = () => { if (!canHover) return; active.value = true; animateTo(1) }
const leave = () => { if (!canHover) return; active.value = false; animateTo(0) }

onMounted(() => {
  draw()
  addEventListener('resize', draw)
  if (props.variant === 'secondary' && ring.value && !reduced) {
    const spin = () => {
      angle = (angle + 0.5) % 360
      ring.value.style.setProperty('--angle', `${angle}deg`)
      ringRaf = requestAnimationFrame(spin)
    }
    ringRaf = requestAnimationFrame(spin)
  }
})
onBeforeUnmount(() => {
  cancelAnimationFrame(tween)
  cancelAnimationFrame(ringRaf)
  removeEventListener('resize', draw)
})
</script>

<template>
  <span class="gb" :class="['gb--' + variant, attrs.class]">
    <span v-if="variant === 'secondary'" ref="ring" class="gb__ring" aria-hidden="true" />
    <component :is="tag" v-bind="btnAttrs" class="gb__btn" :class="{ 'is-active': active }" @pointerenter="enter" @pointerleave="leave" @focus="enter" @blur="leave">
      <canvas ref="canvas" class="gb__canvas" aria-hidden="true" />
      <span class="gb__label"><slot /></span>
    </component>
  </span>
</template>

<style scoped>
.gb { position: relative; display: inline-flex; width: fit-content; transition: transform .3s ease-out; }
.gb:active { transform: scale(.95); }
.gb__ring { --angle: 140deg; position: absolute; inset: 0; z-index: 3; padding: 2px; border-radius: 999px; pointer-events: none; background: conic-gradient(from var(--angle) at 50% 50%, rgba(255,255,255,.35) 0deg, rgba(255,255,255,.05) 90deg, rgba(255,255,255,.35) 180deg, rgba(255,255,255,.05) 270deg, rgba(255,255,255,.35) 360deg); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
.gb__btn { position: relative; z-index: 2; display: inline-flex; align-items: center; justify-content: center; gap: 2px; overflow: hidden; padding: 7px 20px; border: 0; border-radius: 999px; background: transparent; font: 500 15px/1.4 var(--font-ui); white-space: nowrap; cursor: pointer; text-decoration: none; }
.gb--primary .gb__btn { background: #fff; color: #000; }
.gb--secondary .gb__btn { color: #fff; }
.gb__canvas { position: absolute; top: -1px; left: -1px; z-index: 0; display: block; width: calc(100% + 2px); height: calc(100% + 2px); border-radius: inherit; pointer-events: none; }
.gb__label { position: relative; z-index: 1; transition: color .4s ease-out .15s; }
.gb__btn.is-active .gb__label { color: #000; }
</style>

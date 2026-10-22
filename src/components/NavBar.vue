<script setup>
import ZLogo from './ZLogo.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { t, lang, setLang } from '../i18n'
import GooeyButton from './GooeyButton.vue'

// Nav reconstruído do leonardo.ai (engenharia reversa dos bundles):
// - header entra com o preset "scaleUpY" (opacidade 0 + escala .85 → 1, 0.8s, atraso 0.15s)
// - camada de vidro aparece quando scrollTop > 50 (fade de 500ms)
// - mega-menu abre no hover, fecha 120ms depois de sair, fade de opacidade 0.8s power2.out
// - itens não focados escurecem para 30% (500ms); título rola para cima no hover (300ms)
// - botões com hover "gooey": uma gota sobe e preenche o botão através de um filtro SVG
const links = [
  { key: 'work', menu: 'work' },
  { key: 'services', menu: 'services' },
  { key: 'process', href: '#processo' },
  { key: 'about', href: '#sobre' },
]

const open = ref(null)
const hovered = ref(null)
const mobileOpen = ref(false)
const scrolled = ref(false)
const header = ref(null)

let closeTimer = null
const cancelClose = () => { clearTimeout(closeTimer); closeTimer = null }
const openMenu = (m) => { cancelClose(); open.value = m || null }
const scheduleClose = () => { cancelClose(); closeTimer = setTimeout(() => { open.value = null; hovered.value = null }, 120) }
const toggle = (m) => (open.value = open.value === m ? null : m)
const closeAll = () => { cancelClose(); open.value = null; mobileOpen.value = false }

const onScroll = () => (scrolled.value = window.scrollY > 50)
const onKey = (e) => e.key === 'Escape' && closeAll()
const onClick = (e) => header.value && !header.value.contains(e.target) && (open.value = null)

onMounted(() => {
  onScroll()
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('keydown', onKey)
  addEventListener('click', onClick)
})
onBeforeUnmount(() => {
  cancelClose()
  removeEventListener('scroll', onScroll)
  removeEventListener('keydown', onKey)
  removeEventListener('click', onClick)
})
</script>

<template>
  <header ref="header" class="hdr" :class="{ 'hdr--glossy': scrolled || mobileOpen }">
    <div class="hdr__inner">
      <div class="hdr__glossy" aria-hidden="true" />
      <div class="hdr__bar">
        <a href="#top" class="hdr__logo" @click="closeAll">Portfolio<ZLogo /></a>

        <nav class="hdr__nav" :aria-label="t('nav.aria')">
          <div
            v-for="l in links" :key="l.key" class="hdr__item"
            @mouseenter="l.menu ? openMenu(l.menu) : null" @mousemove="l.menu && openMenu(l.menu)" @mouseleave="l.menu && scheduleClose()"
          >
            <button v-if="l.menu" type="button" class="hdr__link" :aria-expanded="open === l.menu" @click="toggle(l.menu)">
              {{ t('nav.' + l.key) }}
              <svg class="hdr__chev" :class="{ 'is-open': open === l.menu }" width="12" height="12" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" stroke-width="1.4" /></svg>
            </button>
            <a v-else :href="l.href" class="hdr__link" @click="closeAll">{{ t('nav.' + l.key) }}</a>
          </div>
        </nav>

        <div class="hdr__actions">
          <GooeyButton variant="secondary" type="button" :aria-label="t('nav.langSwitch')" @click="setLang(lang === 'pt' ? 'en' : 'pt')">
            <span :class="{ dim: lang !== 'pt' }">PT</span>/<span :class="{ dim: lang !== 'en' }">EN</span>
          </GooeyButton>
          <GooeyButton class="hdr__hire" tag="a" href="#contato" @click="closeAll">{{ t('nav.hire') }}</GooeyButton>
          <button type="button" class="hdr__burger" :aria-expanded="mobileOpen" :aria-label="mobileOpen ? t('nav.close') : t('nav.menu')" @click="mobileOpen = !mobileOpen">
            <span /><span />
          </button>
        </div>
      </div>

      <Transition name="mob">
        <div v-if="mobileOpen" class="mob">
          <template v-for="l in links" :key="l.key">
            <details v-if="l.menu" class="mob__group">
              <summary>{{ t('nav.' + l.key) }}</summary>
              <template v-for="g in t('nav.groups.' + l.menu)" :key="g.title">
                <a v-for="i in g.items" :key="i.label" :href="i.href" class="mob__sub" @click="closeAll">{{ i.label }}</a>
              </template>
            </details>
            <a v-else :href="l.href" class="mob__link" @click="closeAll">{{ t('nav.' + l.key) }}</a>
          </template>
          <GooeyButton class="mob__cta" tag="a" href="#contato" @click="closeAll">{{ t('nav.hire') }}</GooeyButton>
        </div>
      </Transition>
    </div>

    <Transition name="mega">
      <div v-if="open" class="mega" @mouseenter="cancelClose" @mouseleave="scheduleClose">
        <div class="mega__panel">
          <div v-for="g in t('nav.groups.' + open)" :key="g.title" class="mega__col">
            <span class="mega__heading">{{ g.title }}</span>
            <a
              v-for="i in g.items" :key="i.label" :href="i.href" class="mega__item"
              :style="{ opacity: hovered && hovered !== i.label ? .3 : 1 }"
              @mouseenter="hovered = i.label" @mouseleave="hovered = null" @click="closeAll"
            >
              <span class="mega__roll"><span>{{ i.label }}</span><span aria-hidden="true">{{ i.label }}</span></span>
              <span class="mega__desc">{{ i.desc }}</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>


.hdr { position: fixed; inset: 0 0 auto; z-index: 50; color: #fff; font-family: var(--font-ui); }
.hdr__inner { position: relative; padding: 20px 27px; animation: scale-up-y .8s cubic-bezier(.25, .46, .45, .94) .15s both; }
@keyframes scale-up-y { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }

/* Camada de vidro (GlossySurface). O Leonardo usa preto 10% sobre fundo escuro;
   aqui o fundo do remote é claro, então o tom é mais escuro para o texto branco continuar legível. */
.hdr__glossy { position: absolute; inset: 0; z-index: -1; background: rgba(12, 12, 14, .55); backdrop-filter: blur(8px) saturate(1.4); -webkit-backdrop-filter: blur(8px) saturate(1.4); opacity: 0; transition: opacity .5s; }
.hdr--glossy .hdr__glossy { opacity: 1; }

.hdr__bar { position: relative; display: flex; align-items: center; justify-content: space-between; min-height: 35px; }
.hdr__logo { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-display); font-size: 20px; letter-spacing: -.02em; color: #fff; text-decoration: none; }

.hdr__nav { position: absolute; left: 50%; transform: translateX(-50%); display: flex; gap: 40px; }
.hdr__link { display: inline-flex; align-items: center; gap: 4px; background: none; border: 0; padding: 8px 0; color: #fff; font: 500 14px/1.25 var(--font-ui); cursor: pointer; text-decoration: none; }
.hdr__chev { margin-top: 2px; transition: transform .2s cubic-bezier(.4, 0, .2, 1); }
.hdr__chev.is-open { transform: rotate(-180deg); }

.hdr__actions { display: flex; align-items: center; gap: 12px; }

.dim { opacity: .45; }

.hdr__burger { display: none; width: 36px; height: 36px; border: 0; border-radius: 999px; background: rgba(255,255,255,.12); cursor: pointer; flex-direction: column; justify-content: center; align-items: center; gap: 5px; }
.hdr__burger span { width: 14px; height: 1.5px; background: #fff; transition: transform .25s; }
.hdr__burger[aria-expanded='true'] span:first-child { transform: translateY(3.25px) rotate(45deg); }
.hdr__burger[aria-expanded='true'] span:last-child { transform: translateY(-3.25px) rotate(-45deg); }

.mega { position: fixed; left: 50%; top: 54px; z-index: 60; transform: translateX(-50%); padding-top: 1.5rem; }
.mega__panel { display: flex; gap: 120px; padding: 40px 56px; background: #111; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1); color: rgba(255,255,255,.5); }
.mega__col { display: flex; flex-direction: column; gap: 16px; min-width: 210px; }
.mega__heading { margin-bottom: 8px; color: var(--lilac); font-weight: 500; font-size: 16px; }
.mega__item { display: flex; flex-direction: column; gap: 4px; color: inherit; text-decoration: none; transition: opacity .5s; }
.mega__roll { position: relative; overflow: hidden; color: #fff; font-size: 18px; line-height: 1.3; }
.mega__roll span { display: block; white-space: nowrap; transition: transform .3s cubic-bezier(.4, 0, .2, 1); }
.mega__roll span + span { position: absolute; top: 100%; left: 0; }
.mega__item:hover .mega__roll span, .mega__item:focus-visible .mega__roll span { transform: translateY(-100%); }
.mega__desc { font-size: 14px; }

/* Transition do Leonardo: só opacidade, 0.8s power2.out, igual na entrada e na saída */
.mega-enter-active, .mega-leave-active { transition: opacity .8s cubic-bezier(.215, .61, .355, 1); }
.mega-enter-from, .mega-leave-to { opacity: 0; }

.mob { display: none; }
.mob-enter-active, .mob-leave-active { transition: opacity .3s; }
.mob-enter-from, .mob-leave-to { opacity: 0; }

@media (max-width: 1100px) {
  .hdr__inner { padding: 12px 16px; }
  .hdr__nav, .mega { display: none; }
  .hdr__burger { display: inline-flex; }
  .mob { display: flex; flex-direction: column; gap: 4px; padding: 24px 0 8px; max-height: calc(100dvh - 60px); overflow-y: auto; }
  .mob__link, .mob__group summary { display: block; padding: 12px 0; color: #fff; font-size: 22px; text-decoration: none; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,.08); }
  .mob__sub { display: block; padding: 10px 16px; color: rgba(255,255,255,.65); text-decoration: none; }
  .mob__cta { margin-top: 16px; width: 100%; }
  .mob__cta :deep(.gb__btn) { width: 100%; padding-block: 12px; }
}
@media (max-width: 520px) { .hdr__hire { display: none; } }
@media (prefers-reduced-motion: reduce) {
  .hdr__inner { animation: none; }
  .mega__roll span, .hdr__chev, .mega__item { transition: none; }
  .mega-enter-active, .mega-leave-active { transition: none; }
}
</style>

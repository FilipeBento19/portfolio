<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import BreakdownViewer from './components/BreakdownViewer.vue'
import { t, contact } from './i18n'

const status = ref('idle') // idle | sending | ok | fail

// Models shown in each specialty card's breakdown viewer (images in /public/breakdowns/<id>/).
const breakdowns = {
  roupas: [{ id: 'vampire', name: 'Vampire' }, { id: 'reze', name: 'Reze' }],
  armas: [{ id: 'katana', name: 'Katana' }, { id: 'borus', name: 'Borus' }],
  cabelos: [{ id: 'sukuna', name: 'Sukuna' }, { id: 'hisoka', name: 'Hisoka' }],
}

async function send(e) {
  status.value = 'sending'
  try {
    const res = await fetch(contact.formspree, { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(res.status)
    status.value = 'ok'
    e.target.reset()
  } catch {
    status.value = 'fail'
  }
}
</script>

<template>
  <NavBar />
  <main id="top">
    <!-- Hero: gradiente roxo → ciano do remote, com wordmark gigante -->
    <section class="hero">
      <!-- Camadas ambientes do remote: base desfocada flutuando, onda de crista e brilho ciano -->
      <div class="ambient" aria-hidden="true">
        <div class="ambient__base" />
        <div class="ambient__cyan" />
      </div>
      <div class="wordmark rise" aria-hidden="true">3D Artist</div>
      <div class="hero__copy rise rise--2">
        <h1 class="title-1">{{ t('hero.title') }}</h1>
        <p class="hero__sub">{{ t('hero.sub') }}</p>
        <div class="btns">
          <a href="#servicos" class="btn btn--solid">{{ t('hero.cta1') }} <span class="arrow" aria-hidden="true">→</span></a>
          <a href="#contato" class="btn btn--outline">{{ t('hero.cta2') }}</a>
        </div>
      </div>
      <!-- Vídeo do site em motion (15 s, sem som); gerado pela composição SiteMotion em /reel -->
      <video id="reel" class="reel rise rise--bg" :src="'reel.mp4'" :poster="'reel-poster.jpg'" autoplay muted loop playsinline :aria-label="t('hero.reel')" />
    </section>

    <!-- Frase grande com tiles flutuantes -->
    <section class="statement">
      <div v-tilt class="skew">
        <div class="tiles tiles--top" aria-hidden="true"><span v-for="n in 5" :key="n" class="tile" :class="'tile' + n" /></div>
        <p class="display">{{ t('statement') }}</p>
        <div class="tiles tiles--bottom" aria-hidden="true"><span v-for="n in 5" :key="n" class="tile" :class="'tile' + (6 - n)" /></div>
      </div>
    </section>

    <!-- Serviços + projetos (bento do "Every way to hire and pay") -->
    <section id="servicos" class="section">
      <div class="wrap">
        <header class="head">
          <h2 class="title-2">{{ t('services.title') }}</h2>
          <p>{{ t('services.sub') }}</p>
        </header>
        <div class="bento">
          <article v-for="(s, i) in t('services.items')" :id="s.id" :key="s.id" class="card" :class="{ 'card--wide': i === 0, 'card--wide card--full': i === 2 }">
            <div class="card__body">
              <h3 class="title-4">{{ s.title }}</h3>
              <p>{{ s.text }}</p>
              <ul v-if="s.bullets" class="checks">
                <li v-for="b in s.bullets" :key="b">{{ b }}</li>
              </ul>
              <a href="#contato" class="btn btn--solid btn--sm">{{ t('services.cta') }} <span class="arrow" aria-hidden="true">→</span></a>
            </div>
            <div v-if="breakdowns[s.id]" class="card__media card__media--viewer" :class="'g' + i">
              <BreakdownViewer
                :models="breakdowns[s.id]"
                :passes="t('breakdown.passes')"
                :hint="t('breakdown.hint')"
                :tabs-label="t('breakdown.tabs')"
              />
            </div>
            <div v-else class="card__media" :class="'g' + i">
              <figure v-for="p in s.projects" :key="p" class="shot ph">
                <figcaption>{{ p }}</figcaption>
              </figure>
            </div>
          </article>
        </div>
        <!-- Além das três especialidades: assets e pedidos fora delas -->
        <div class="more">
          <p><strong>{{ t('services.moreTitle') }}</strong> {{ t('services.more') }}</p>
          <a href="#contato" class="btn btn--solid btn--sm">{{ t('services.moreCta') }} <span class="arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <!-- Processo (bloco "A single system of record") -->
    <section id="processo" class="section process">
      <div class="wrap">
        <header class="head">
          <h2 class="title-2">{{ t('process.title') }}</h2>
          <p>{{ t('process.sub') }}</p>
        </header>
        <ol class="steps">
          <li v-for="(s, i) in t('process.steps')" :key="s.title" class="step">
            <span class="step__n">0{{ i + 1 }}</span>
            <h3 class="title-6">{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Números (faixa "Rated the #1") -->
    <section class="stats">
      <div class="wrap stats__in">
        <h2 class="title-4">{{ t('stats.title') }}</h2>
        <dl v-flip>
          <div v-for="s in t('stats.items')" :key="s.label" class="stat">
            <dt class="figure"><span class="face">{{ s.value }}</span><span class="face face--next" aria-hidden="true">{{ s.value }}</span></dt>
            <dd>{{ s.label }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Sobre + experiência + ferramentas -->
    <section id="sobre" class="section about">
      <div class="wrap about__grid">
        <div>
          <h2 class="title-2">{{ t('about.title') }}</h2>
          <p v-for="p in t('about.text')" :key="p" class="lead">{{ p }}</p>
          <h3 class="title-6 sub-h">{{ t('about.expTitle') }}</h3>
          <ul class="exp">
            <li v-for="e in t('about.exp')" :key="e.role + e.time">
              <strong>{{ e.role }}</strong><span>{{ e.place }}</span><time>{{ e.time }}</time>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="title-6 sub-h">{{ t('about.toolsTitle') }}</h3>
          <ul class="tools">
            <li v-for="tool in t('about.tools')" :key="tool.name">
              <img class="tool__icon" :src="'icons/' + tool.icon + '.png'" alt="" width="40" height="40" loading="lazy" />
              <span><strong>{{ tool.name }}</strong><small>{{ tool.use }}</small></span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA final + contato (gradiente lilás → roxo) -->
    <section id="contato" class="cta">
      <div class="wrap cta__grid">
        <div>
          <h2 class="title-2">{{ t('contact.title') }}</h2>
          <p class="lead">{{ t('contact.sub') }}</p>
          <p class="direct">{{ t('contact.details') }}</p>
          <ul class="direct-list">
            <li><a :href="'mailto:' + contact.email">{{ contact.email }}</a></li>
            <li>Discord: <strong>{{ contact.discord }}</strong></li>
            <li><a :href="contact.linkedin" target="_blank" rel="noopener noreferrer">{{ t('contact.linkedin') }}</a></li>
            <li v-for="f in t('contact.facts')" :key="f">{{ f }}</li>
          </ul>
        </div>
        <form class="form" @submit.prevent="send">
          <label>{{ t('contact.name') }}<input name="name" :placeholder="t('contact.namePh')" required maxlength="100" autocomplete="name" /></label>
          <label>{{ t('contact.email') }}<input name="email" type="email" :placeholder="t('contact.emailPh')" required maxlength="200" autocomplete="email" /></label>
          <label>{{ t('contact.message') }}<textarea name="message" rows="5" :placeholder="t('contact.messagePh')" required maxlength="5000" /></label>
          <button class="btn btn--solid" :disabled="status === 'sending'">
            {{ status === 'sending' ? t('contact.sending') : t('contact.send') }}
          </button>
          <p v-if="status === 'ok'" class="form__msg" role="status">{{ t('contact.ok') }}</p>
          <p v-else-if="status === 'fail'" class="form__msg" role="alert">{{ t('contact.fail') }} <a :href="'mailto:' + contact.email">{{ contact.email }}</a>.</p>
        </form>
      </div>
    </section>
  </main>

  <footer class="foot">
    <div class="wrap foot__in">
      <span class="foot__logo">zMiister</span>
      <span>© {{ new Date().getFullYear() }} Filipe · {{ t('footer') }}</span>
    </div>
  </footer>
</template>

import { ref } from 'vue'

// Todo o texto do site fica aqui. Edite PT e EN lado a lado.
// Contatos: email, discord e o formulário do Formspree.
export const contact = {
  email: 'bentofilipe19@gmail.com',
  discord: 'zmiister',
  linkedin: 'https://www.linkedin.com/in/filipe-bento-3b29a92b8/',
  formspree: 'https://formspree.io/f/mwllejea',
}

const messages = {
  pt: {
    meta: { title: 'Filipe — 3D Artist | Roupas, armas, cabelos e assets 3D' },
    nav: {
      aria: 'Principal',
      work: 'Trabalhos', services: 'Serviços', process: 'Processo', about: 'Sobre',
      hire: 'Entrar em contato', menu: 'Abrir menu', close: 'Fechar menu',
      langSwitch: 'Switch to English',
      groups: {
        work: [
          { title: 'Especialidades', items: [
            { label: 'Roupas e malhas', desc: 'Dobras esculpidas e topologia limpa', href: '#roupas' },
            { label: 'Armas brancas', desc: 'Espadas, adagas e lâminas', href: '#armas' },
            { label: 'Cabelos', desc: 'Estilizados, leves para tempo real', href: '#cabelos' },
          ] },
          { title: 'Mídia', items: [
            { label: 'Showreel', desc: 'Os principais trabalhos em vídeo', href: '#reel' },
          ] },
        ],
        services: [
          { title: 'Para estúdios', items: [
            { label: 'Experiência', desc: 'Freelance desde 2020 e formação', href: '#sobre' },
            { label: 'Disponibilidade', desc: 'CLT, PJ e freelance, inclusive remoto', href: '#contato' },
          ] },
          { title: 'Etapas do trabalho', items: [
            { label: 'Modelagem e escultura', desc: 'Blender e ZBrush', href: '#processo' },
            { label: 'Retopologia e UV', desc: 'Malhas limpas e otimizadas', href: '#processo' },
            { label: 'Texturas PBR', desc: 'Substance Painter', href: '#processo' },
          ] },
        ],
      },
    },
    hero: {
      title: 'Do conceito ao modelo 3D finalizado.',
      sub: 'Sou Filipe, artista 3D freelance desde 2020. Modelo, esculpo e texturizo cada peça do blocking ao acabamento, com topologia limpa e texturas PBR.',
      cta1: 'Ver trabalhos', cta2: 'Entrar em contato',
      reel: 'Vídeo mostrando o site do portfólio',
    },
    statement: 'Bonito no render, leve na engine.',
    services: {
      title: 'Trabalhos por especialidade.',
      sub: 'O que eu modelo em cada área e exemplos de projetos.',
      cta: 'Entrar em contato',
      moreTitle: 'Também faço assets 3D.',
      more: 'Props, acessórios, cenários e o que mais o seu projeto precisar.',
      moreCta: 'Conte sua ideia',
      items: [
        { id: 'roupas', title: 'Roupas e malhas', text: 'Roupas para personagens, do blocking à textura final.',
          bullets: ['Dobras e costuras esculpidas no ZBrush', 'Topologia limpa e otimizada', 'UVs organizadas para texturização', 'Texturas PBR no Substance Painter'],
          projects: ['Jaqueta de couro', 'Uniforme medieval', 'Moletom oversized'] },
        { id: 'armas', title: 'Armas brancas', text: 'Espadas, adagas e lâminas com detalhe que se sustenta em close.',
          projects: ['Katana', 'Espada longa', 'Adaga rúnica'] },
        { id: 'cabelos', title: 'Cabelos', text: 'Cabelos estilizados: forma blocada no Blender e textura pintada para tempo real.',
          projects: ['Tranças', 'Cabelo curto', 'Rabo de cavalo'] },
      ],
    },
    breakdown: {
      hint: 'Clique para o próximo passe',
      tabs: 'Escolha um modelo',
      passes: ['Textura', 'Wireframe', 'Normal map'],
    },
    process: {
      title: 'Do briefing à entrega, em quatro etapas.',
      sub: 'Você aprova cada etapa antes da próxima.',
      steps: [
        { title: 'Briefing', text: 'Referências, estilo, engine de destino e orçamento de polígonos.' },
        { title: 'Blocking', text: 'Formas principais no Blender para validar proporção e silhueta.' },
        { title: 'Escultura e retopologia', text: 'Detalhes no ZBrush, retopologia e UVs no Blender.' },
        { title: 'Textura e entrega', text: 'Bake e texturas PBR metal/rough no Substance Painter. Entrega em FBX, OBJ ou GLB, com LODs.' },
      ],
    },
    stats: {
      title: 'Experiência com clientes e projetos 3D.',
      items: [
        { value: '5+', label: 'anos de modelagem 3D' },
        { value: '80+', label: 'clientes atendidos' },
        { value: '4', label: 'especialidades' },
      ],
    },
    about: {
      title: 'Sobre.',
      text: [
        'Sou Filipe, artista 3D. Trabalho como freelancer desde 2020, modelando roupas, armas, cabelos e props para jogos e outros projetos 3D, incluindo o Roblox.',
        'Aprendi de forma autodidata e meu foco é otimização para tempo real: modelos leves que rodam bem na engine sem perder qualidade visual. Já atendi mais de 80 clientes, sempre a partir de um briefing e com prazo definido.',
      ],
      expTitle: 'Experiência e formação',
      exp: [
        { role: 'Artista 3D freelance', place: 'Autônomo · Unity, Unreal e Roblox', time: '2020 — hoje' },
        { role: 'Informática para Internet', place: 'Instituto Federal · em andamento', time: 'Cursando' },
      ],
      toolsTitle: 'Ferramentas',
      tools: [
        { name: 'Blender', icon: 'blender', use: 'Blocking, retopologia e UV' },
        { name: 'ZBrush', icon: 'zbrush', use: 'Escultura e detalhes' },
        { name: 'Substance Painter', icon: 'substance-painter', use: 'Bake e texturas PBR' },
      ],
    },
    contact: {
      title: 'Disponível para vagas e projetos.',
      sub: 'Aberto a vagas CLT, contratos PJ e freelance, inclusive remoto internacional. Respondo em até 2 dias úteis.',
      name: 'Nome', email: 'Email', message: 'Mensagem',
      namePh: 'Ana Souza', emailPh: 'nome@estudio.com', messagePh: 'Conte sobre a vaga ou o projeto: tipo de modelo, engine e prazo.',
      send: 'Enviar mensagem', sending: 'Enviando…',
      ok: 'Mensagem enviada. Respondo em até 2 dias úteis.',
      fail: 'Não foi possível enviar. Tente de novo ou escreva para',
      details: 'Detalhes',
      facts: ['Fuso horário: Brasília (GMT-3)', 'Idiomas: português e inglês'],
      linkedin: 'Ver perfil no LinkedIn',
    },
    footer: 'Todos os modelos são de minha autoria.',
  },
  en: {
    meta: { title: 'Filipe — 3D Artist | Clothing, weapons, hair and 3D assets' },
    nav: {
      aria: 'Main',
      work: 'Work', services: 'Services', process: 'Process', about: 'About',
      hire: 'Get in touch', menu: 'Open menu', close: 'Close menu',
      langSwitch: 'Mudar para português',
      groups: {
        work: [
          { title: 'Specialties', items: [
            { label: 'Clothing', desc: 'Sculpted folds and clean topology', href: '#roupas' },
            { label: 'Bladed weapons', desc: 'Swords, daggers and blades', href: '#armas' },
            { label: 'Hair', desc: 'Stylized and light for real time', href: '#cabelos' },
          ] },
          { title: 'Media', items: [
            { label: 'Showreel', desc: 'Key work in one video', href: '#reel' },
          ] },
        ],
        services: [
          { title: 'For studios', items: [
            { label: 'Experience', desc: 'Freelance since 2020 and education', href: '#sobre' },
            { label: 'Availability', desc: 'Full-time, contract and freelance, remote included', href: '#contato' },
          ] },
          { title: 'Workflow', items: [
            { label: 'Modeling and sculpting', desc: 'Blender and ZBrush', href: '#processo' },
            { label: 'Retopology and UVs', desc: 'Clean, optimized meshes', href: '#processo' },
            { label: 'PBR texturing', desc: 'Substance Painter', href: '#processo' },
          ] },
        ],
      },
    },
    hero: {
      title: 'From concept to finished 3D model.',
      sub: "I'm Filipe, a freelance 3D artist since 2020. I model, sculpt and texture every piece from blocking to final polish, with clean topology and PBR textures.",
      cta1: 'See work', cta2: 'Get in touch',
      reel: 'Video showing the portfolio site',
    },
    statement: 'Looks great in the render, runs light in the engine.',
    services: {
      title: 'Work by specialty.',
      sub: 'What I model in each area, with example projects.',
      cta: 'Get in touch',
      moreTitle: 'I also make 3D assets.',
      more: 'Props, accessories, environments and whatever else your project needs.',
      moreCta: 'Tell me your idea',
      items: [
        { id: 'roupas', title: 'Clothing', text: 'Garments for characters, from blocking to final texture.',
          bullets: ['Folds and seams sculpted in ZBrush', 'Clean, optimized topology', 'UVs organized for texturing', 'PBR textures in Substance Painter'],
          projects: ['Leather jacket', 'Medieval uniform', 'Oversized hoodie'] },
        { id: 'armas', title: 'Bladed weapons', text: 'Swords, daggers and blades with detail that holds up in close-up.',
          projects: ['Katana', 'Longsword', 'Runic dagger'] },
        { id: 'cabelos', title: 'Hair', text: 'Stylized hair: shape blocked out in Blender and textures painted for real time.',
          projects: ['Braids', 'Short hair', 'Ponytail'] },
      ],
    },
    breakdown: {
      hint: 'Click for the next pass',
      tabs: 'Pick a model',
      passes: ['Texture', 'Wireframe', 'Normal map'],
    },
    process: {
      title: 'From brief to delivery in four stages.',
      sub: 'You approve each stage before the next one starts.',
      steps: [
        { title: 'Brief', text: 'References, style, target engine and polygon budget.' },
        { title: 'Blocking', text: 'Primary forms in Blender to lock proportions and silhouette.' },
        { title: 'Sculpt and retopology', text: 'Detail in ZBrush, retopology and UVs in Blender.' },
        { title: 'Texture and delivery', text: 'Baking and PBR metal/rough textures in Substance Painter. Delivered as FBX, OBJ or GLB, with LODs.' },
      ],
    },
    stats: {
      title: 'Experience with 3D clients and projects.',
      items: [
        { value: '5+', label: 'years of 3D modeling' },
        { value: '80+', label: 'clients served' },
        { value: '4', label: 'specialties' },
      ],
    },
    about: {
      title: 'About.',
      text: [
        "I'm Filipe, a 3D artist. I've worked as a freelancer since 2020, modeling clothing, weapons, hair and props for games and other 3D projects, including Roblox.",
        "I'm self-taught and focus on real-time optimization: light models that run well in the engine without losing visual quality. I've worked with more than 80 clients, always from a brief and to a set deadline.",
      ],
      expTitle: 'Experience and education',
      exp: [
        { role: 'Freelance 3D artist', place: 'Self-employed · Unity, Unreal and Roblox', time: '2020 — present' },
        { role: 'Internet Computing', place: 'Federal Institute (IF), Brazil · in progress', time: 'Studying' },
      ],
      toolsTitle: 'Tools',
      tools: [
        { name: 'Blender', icon: 'blender', use: 'Blocking, retopology and UVs' },
        { name: 'ZBrush', icon: 'zbrush', use: 'Sculpting and detail' },
        { name: 'Substance Painter', icon: 'substance-painter', use: 'Baking and PBR textures' },
      ],
    },
    contact: {
      title: 'Available for roles and projects.',
      sub: 'Open to full-time roles, contracts and freelance work, including remote international. I reply within 2 business days.',
      name: 'Name', email: 'Email', message: 'Message',
      namePh: 'Jane Smith', emailPh: 'name@studio.com', messagePh: 'Tell me about the role or project: model type, engine and deadline.',
      send: 'Send message', sending: 'Sending…',
      ok: 'Message sent. I reply within 2 business days.',
      fail: 'Unable to send. Try again or email',
      details: 'Details',
      facts: ['Time zone: Brasília (GMT-3)', 'Languages: Portuguese and English'],
      linkedin: 'View LinkedIn profile',
    },
    footer: 'All models are my own work.',
  },
}

const saved = (() => { try { return localStorage.getItem('lang') } catch { return null } })()
export const lang = ref(saved || (navigator.language?.startsWith('pt') ? 'pt' : 'en'))

export function setLang(l) {
  lang.value = l
  document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en'
  document.title = messages[l].meta.title
  try { localStorage.setItem('lang', l) } catch {}
}
setLang(lang.value)

export const t = (key) => key.split('.').reduce((o, k) => o?.[k], messages[lang.value]) ?? key

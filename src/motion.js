// Comportamentos de movimento copiados da engenharia reversa do remote.com.

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// v-tilt: seção "skew" do remote. A arte inclina em 3D seguindo o mouse
// (rotateX até ±12°, rotateY até ±15°, suavização exponencial 90ms indo / 260ms voltando)
// e encolhe para 0.92 quando menos de 15% está visível.
export const tilt = {
  mounted(el) {
    if (reduced()) return
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= 0.15) el.removeAttribute('data-armed')
      else if (!e.isIntersecting) el.setAttribute('data-armed', '')
    }, { threshold: [0, 0.15] })
    io.observe(el)

    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    let px = null, py = null, tx = 0, ty = 0, cx = 0, cy = 0, last = null, raf = null
    const target = () => {
      const r = el.getBoundingClientRect()
      if (px === null || px < r.left || px > r.right || py < r.top || py > r.bottom || !r.width) { tx = ty = 0; return }
      const nx = Math.min(1, Math.max(-1, ((px - r.left) / r.width) * 2 - 1))
      const ny = Math.min(1, Math.max(-1, ((py - r.top) / r.height) * 2 - 1))
      tx = -12 * ny
      ty = 15 * nx
    }
    const frame = (now) => {
      const dt = last === null ? 0 : now - last
      last = now
      const home = tx === 0 && ty === 0
      const k = 1 - Math.exp(-dt / (home ? 260 : 90))
      cx += (tx - cx) * k
      cy += (ty - cy) * k
      if (home && Math.abs(cx) < 0.01 && Math.abs(cy) < 0.01) cx = cy = 0
      el.style.setProperty('--tilt-x', `${cx.toFixed(3)}deg`)
      el.style.setProperty('--tilt-y', `${cy.toFixed(3)}deg`)
      if (home && cx === 0 && cy === 0) { raf = last = null; return }
      raf = requestAnimationFrame(frame)
    }
    const kick = () => { target(); raf ??= requestAnimationFrame(frame) }
    const move = (e) => { px = e.clientX; py = e.clientY; kick() }
    const out = (e) => { if (!e.relatedTarget) { px = py = null; kick() } }

    if (fine.matches) {
      addEventListener('pointermove', move, { passive: true })
      addEventListener('scroll', kick, { passive: true })
      document.addEventListener('mouseout', out)
    }
    el._tiltCleanup = () => {
      io.disconnect()
      removeEventListener('pointermove', move)
      removeEventListener('scroll', kick)
      document.removeEventListener('mouseout', out)
      if (raf) cancelAnimationFrame(raf)
    }
  },
  unmounted(el) { el._tiltCleanup?.() },
}

// v-flip: faixa de números do remote. Cada número é um cubo 3D que gira 90° em X
// quando 25% da faixa aparece, e volta ao estado inicial quando sai da tela.
export const flip = {
  mounted(el) {
    const set = (v) => el.setAttribute('data-revealed', v)
    if (reduced()) return set('true')
    const depth = () => {
      const h = el.querySelector('.figure')?.offsetHeight
      if (h) el.style.setProperty('--depth', `${h}px`)
    }
    depth()
    set('false')
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.intersectionRatio >= 0.25) set('true')
        else if (!e.isIntersecting) set('false')
      }
    }, { threshold: [0, 0.25] })
    io.observe(el)
    el._flipCleanup = () => io.disconnect()
  },
  unmounted(el) { el._flipCleanup?.() },
}

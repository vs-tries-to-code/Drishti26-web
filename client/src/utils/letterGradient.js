/**
 * Splits the text content of a DOM element into individual character spans,
 * each with the 'text-gold-gradient' class applied, creating a per-letter
 * gradient effect identical to the "Meet The Team" heading in Team.jsx.
 *
 * @param {HTMLElement} el - The DOM element to apply the effect to
 */
export function applyLetterGradient(el) {
  if (!el) return
  const text = el.textContent
  el.textContent = ''
  const fragment = document.createDocumentFragment()
  text.split('').forEach((char) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.className = 'text-gold-gradient'
    fragment.appendChild(span)
  })
  el.appendChild(fragment)
}

import process from "process"

if (typeof global === 'undefined' || typeof global.process === 'undefined') {
  /* Global window */
  window.global = window
  window.process = process
}

import { quadInOut } from 'svelte/easing'

export function pageIn(node, { delay, duration, pageHeight }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
		-webkit-transform: translateY(${(1 - eased) * pageHeight}px) scale(${eased}) translateZ(0);
        -moz-transform: translateY(${(1 - eased) * pageHeight}px) scale(${eased}) translateZ(0);
        -ms-transform: translateY(${(1 - eased) * pageHeight}px) scale(${eased}) translateZ(0);
        transform: translateY(${(1 - eased) * pageHeight}px) translateZ(0);
      `;
    }
  };
}

export function pageOut(node, { delay, duration, scrollY }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
	 	position: absolute;
    	top: 0;
		z-index: -1;
		margin-top: -${scrollY}px;
      `;
    }
  };
}
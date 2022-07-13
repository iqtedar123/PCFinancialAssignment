const breakpoints = [320, 375, 425, 768, 1024, 1440, 2560];

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    [key: string]: any;
  }
  interface SVGAttributes {
    [key: string]: any;
  }
  interface DOMAttributes {
    [key: string]: any;
  }
}

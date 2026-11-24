/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    [key: string]: any;
  }
  interface DOMAttributes {
    [key: string]: any;
  }
  interface SVGAttributes {
    [key: string]: any;
  }
  interface IntrinsicElements {
    [key: string]: any;
  }
  interface DefinedIntrinsicElements {
    [key: string]: any;
  }
  interface InputHTMLAttributes {
    [key: string]: any;
  }
  interface ButtonHTMLAttributes {
    [key: string]: any;
  }
  interface AnchorHTMLAttributes {
    [key: string]: any;
  }
  interface ImgHTMLAttributes {
    [key: string]: any;
  }
  interface LabelHTMLAttributes {
    [key: string]: any;
  }
  interface FormHTMLAttributes {
    [key: string]: any;
  }
  interface SelectHTMLAttributes {
    [key: string]: any;
  }
  interface TextareaHTMLAttributes {
    [key: string]: any;
  }
  interface OptionHTMLAttributes {
    [key: string]: any;
  }
  interface TableHTMLAttributes {
    [key: string]: any;
  }
  interface TdHTMLAttributes {
    [key: string]: any;
  }
  interface ThHTMLAttributes {
    [key: string]: any;
  }
  interface TrHTMLAttributes {
    [key: string]: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
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
}

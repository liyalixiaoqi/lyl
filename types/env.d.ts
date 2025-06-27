/// <reference types="vite/client" />

// Vue 组件类型声明
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 确保 TypeScript 识别 .vue 文件
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $refs: {
      [key: string]: HTMLElement | any
    }
  }
}

// 环境变量类型声明
interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

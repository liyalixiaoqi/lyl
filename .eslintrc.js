module.exports = {
    root: true, // 添加这行，防止 ESLint 查找用户主目录下的配置
    // 使 eslint 支持 node 与 ES6
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    // 引入推荐的语法校验规则
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [],
    /* 
     这里一定要配置对 先使用vue-eslint-parser 再使用@typescript-eslint/parser
     先解析 <template> 标签中的内容 然后再解析 vue <script> 标签中的 TS 代码
     */
    // 选择使用的解析器
    parser: 'vue-eslint-parser',
    // 解析器的详细配置
    parserOptions: {
        // 使用最新版 ES 语法
        ecmaVersion: 'latest',
        // 使用 ESLint TS 解析器
        parser: '@typescript-eslint/parser',
        // 使用 ES 模块化规范
        sourceType: 'module',
    },
    // 使用的插件
    plugins: ['vue', '@typescript-eslint'],
    // 自定义规则
    rules: {},
    // 此配置在eslint配置文件中新增
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // 在最后面新增extends
    ],
};
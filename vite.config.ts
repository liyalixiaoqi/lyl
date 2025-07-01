import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';
import { visualizer } from 'rollup-plugin-visualizer';
import externalGlobals from 'rollup-plugin-external-globals';
import viteCompression from 'vite-plugin-compression';
import brotliCompress from 'rollup-plugin-brotli';
import { createHtmlPlugin } from 'vite-plugin-html';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	// 获取当前工作目录
	const root = process.cwd();
	// 获取环境变量
	const env = loadEnv(mode, root);
	return {
		// 项目根目录
		root,
		// 项目部署的基础路径
		base: '/',
		publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 无需处理的静态资源位置
		assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 需要处理的静态资源位置
		plugins: [
			// Vue模板文件编译插件
			vue(),
			// jsx文件编译插件
			vueJsx(),
			viteMockServe({
				// 如果接口为 /mock/xxx 以 mock 开头就会被拦截响应配置的内容
				mockPath: 'mock', // 数据模拟需要拦截的请求起始 URL
				enable: true // 是否启用
			}),
			ElementPlus({}),
			AutoImport({
				resolvers: [IconsResolver(), ElementPlusResolver()],
				dts: path.resolve(__dirname, './types/auto-imports.d.ts')
			}),
			Components({
				resolvers: [IconsResolver(), ElementPlusResolver()],
				dts: path.resolve(__dirname, './types/components.d.ts'),
				dirs: [path.resolve(__dirname, './src/components/')],
				include: [/\.vue$/, /\.vue\?/]
			}),
			manualChunksPlugin(),
			Icons({
				compiler: 'vue3',
				autoInstall: true
			}),
			createHtmlPlugin({
				minify: true,
				inject: {
					data: {
						moment: '<script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/min/moment.min.js"></script>',
						echarts:
							'<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>',
						xlsx: '<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>',
						jspdf: '<script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>'
					}
				}
			})
		],
		// 运行后本地预览的服务器
		server: {
			// 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
			host: true,
			// 开发环境预览服务器端口
			port: 3000,
			// 启动后是否自动打开浏览器
			open: false,
			// 是否开启CORS跨域
			cors: true,
			// 代理服务器
			// 帮助我们开发时解决跨域问题
			proxy: {
				// 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:3000
				'/api': {
					target: 'http://localhost:3000/',
					// 改变 Host Header
					changeOrigin: true,
					// 发起请求时将 '/api' 替换为 ''
					rewrite: (path) => path.replace(/^\/api/, '')
				},

				'/mock/api': {
					target: 'http://localhost:3000/',
					// 改变 Host Header
					changeOrigin: true,
					// 发起请求时将 '/api' 替换为 ''
					rewrite: (path) => path.replace(/^\/mock\/api/, '')
				}
			}
		},
		// 打包配置
		build: {
			target: 'es2015',
			minify: 'esbuild',
			// 关闭 sorcemap 报错不会映射到源码
			sourcemap: false,
			// 打包大小超出 400kb 提示警告
			chunkSizeWarningLimit: 400,

			rollupOptions: {
				// 打包入口文件 根目录下的 index.html
				// 也就是项目从哪个文件开始打包
				input: {
					index: fileURLToPath(new URL('./index.html', import.meta.url))
				},

				external: ['moment', 'echarts', 'xlsx', 'jspdf'],
				plugins: [
					visualizer({ open: true }),
					externalGlobals({
						moment: 'moment',
						echarts: 'echarts',
						xlsx: 'xlsx',
						jspdf: 'jspdf'
					}),
					// brotliCompress({})
					viteCompression({
						threshold: 1024 * 20,
						algorithm: 'gzip',
						ext: '.gz'
					})
				],
				experimentalLogSideEffects: true,
				// 静态资源分类打包
				output: {
					// format: 'esm',
					manualChunks: function manualChunks(id) {
						if (id.includes('element-plus')) {
							return 'element-plus';
						}
						if (id.includes('node_modules')) {
							return 'vendor';
						}
						// return 'index';
					},
					experimentalMinChunkSize: 20 * 1024,
					// // format: 'esm',
					// chunkFileNames: 'static/js/[name]-[hash].js',
					// entryFileNames: 'static/js/[name]-[hash].js',
					// assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
					chunkFileNames: 'static/js/[name]-[hash:6].js',
					entryFileNames: 'static/js/entry-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
				},
				treeshake: {
					// moduleSideEffects: false,
					preset: 'recommended'
				}
			}
		},
		// 配置别名
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'#': path.resolve(__dirname, './types')
			}
		}
	};
});

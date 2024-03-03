import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 获取当前工作目录
  const root = process.cwd();
  // 获取环境变量
  const env = loadEnv(mode, root);
  return {
    // 项目根目录
    root,
    // 项目部署的基础路径
    base: './',
    publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 无需处理的静态资源位置
    assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 需要处理的静态资源位置
    plugins: [
      // Vue模板文件编译插件
      vue(),
      // jsx文件编译插件
      vueJsx(),
      // 自动导入组件
      AutoImport({
        // 定义需要自动引入的框架
        imports: ['vue', 'vue-router', 'pinia'],
        // 处理eslint
        eslintrc: {
          enabled: true,
        },
        // 自定义组件的解析器
        // resolvers: [],
        // 配置文件生成位置
        dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url)),
      }),
      // 自动注册组件
      Components({
        // 自定义组件的解析器
        resolvers: [IconsResolver({ prefix: 'icon', customCollections: ['custom'] })],
        // 有效的文件扩展名
        extensions: ['vue'],
        // 配置文件生成位置
        dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url)),
        // 指定需要自动导入的组件位置，默认是src/components
        dirs: [fileURLToPath(new URL('./src/components/auto', import.meta.url))],
      }),
      Icons({
        // 编译方式
        compiler: 'vue3',
        autoInstall: true,
        // 指定图标加载器
        customCollections: {
          custom: FileSystemIconLoader('./src/assets/svg'),
        },
      }),
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
          target: 'http://xxx:9000',
          // 改变 Host Header
          changeOrigin: true,
          // 发起请求时将 '/api' 替换为 ''
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // 打包配置
    build: {
      // 关闭 sorcemap 报错不会映射到源码
      sourcemap: false,
      // 打包大小超出 400kb 提示警告
      chunkSizeWarningLimit: 400,
    },
    // 配置别名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});

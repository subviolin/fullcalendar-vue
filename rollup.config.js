import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import packageConfig from './package.json'

/*
Will generate a UMD by default but can be instructed to generate an ES module
by using command line argument overrides.
*/

const BROWSER_GLOBAL = 'FullCalendarVue'
const EXTERNAL_BROWSER_GLOBALS = {
  '@fullcalendar/core': 'FullCalendar'
}
const OUTPUT_SETTINGS = {
  umd: {
    format: 'umd',
    file: 'dist/main.umd.js',
    exports: 'named',
    name: BROWSER_GLOBAL,
    globals: EXTERNAL_BROWSER_GLOBALS,
    banner: buildBanner
  },
  esm: {
    format: 'es',
    file: 'dist/main.esm.js',
    banner: buildBanner
  }
}

export default [
  buildSettings('umd'),
  buildSettings('esm')
]

function buildSettings(format) {
  return {
    input: 'src/wrapper.js',
    output: OUTPUT_SETTINGS[format],
    external: Object.keys(EXTERNAL_BROWSER_GLOBALS),
    plugins: [
      resolve({
        jail: 'src' // any files outside of here are considered external libs
      }),
      babel() // will automatically use babel.config.js
    ]
  }
}

function buildBanner() {
  return '/*\n' +
    packageConfig.title + ' v' + packageConfig.version + '\n' +
    'Docs: ' + packageConfig.docs + '\n' +
    'License: ' + packageConfig.license + '\n' +
    '*/'
}

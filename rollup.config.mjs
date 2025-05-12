
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import polyfill from 'rollup-plugin-polyfill-node';
//import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';

export default {
  input: 'src/express.js',
  output: {
    format: 'commonjs',
    file: 'dist/rpc.cjs'
  },
  plugins: [
//    replace(),
    commonjs(),
//    polyfill(),
    resolve({
      preferBuiltins: true,
      browser: false
    }),
    json(),
    
    terser({
      compress: {
       // drop_console: true,
      },
      format: {
        comments: false
      }
    })
  ]
};
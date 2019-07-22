// TODO MAYCON - Issue aberta - babel-plugin-root-import com problema - ajustar mais tarde
// AJUSTAR JSCONFIG.JSON TAMBÉM
const { injectBabelPlugin } = require('react-app-rewired');

const rootImport = [
  'root-import',
  {
    rootPathPrefix: '~',
    rootPathSuffix: 'src',
  },
];

module.exports = config => injectBabelPlugin(rootImport, config);

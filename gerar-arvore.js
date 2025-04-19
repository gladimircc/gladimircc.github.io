// gerar-arvore.js
const fs = require('fs');
const globby = require('globby');

(async () => {
  const entries = await globby(['**/*', '!**/node_modules/**', '!**/.git/**', '!files.json', '!.github/**']);

  const pastas = new Set();
  const arquivos = [];

  entries.forEach((entry) => {
    if (entry.includes('/')) {
      const parts = entry.split('/');
      pastas.add(parts[0]);
    } else {
      arquivos.push(entry);
    }
  });

  fs.writeFileSync('files.json', JSON.stringify({
    pastas: Array.from(pastas).sort(),
    arquivos: arquivos.sort()
  }, null, 2));

  console.log('✅ Arquivo files.json gerado!');
})();

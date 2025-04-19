// gerar-arvore.js
const fs = require('fs');
const { globby } = require('globby');


(async () => {
  const entries = await globby(['**/*', '!**/node_modules/**', '!**/.git/**', '!files.json', '!.github/**']);

  const pastas = new Set();
  const arquivos = [];

  entries.forEach((entry) => {
    const stat = fs.statSync(entry);

    if (stat.isDirectory()) {
      pastas.add(entry);
    } else if (stat.isFile()) {
      arquivos.push(entry);
    }
  });

  const estrutura = {
    pastas: Array.from(pastas).sort(),
    arquivos: arquivos.sort()
  };

  fs.writeFileSync('files.json', JSON.stringify(estrutura, null, 2));
  console.log('✅ Arquivo files.json gerado com sucesso!');
})();

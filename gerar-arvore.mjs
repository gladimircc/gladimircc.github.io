// gerar-arvore.mjs
import fs from 'node:fs';
import { globby } from 'globby';

const entries = await globby(['**/*', '!**/node_modules/**', '!**/.git/**', '!files.json', '!.github/**', '!gerar-arvore.*', '!package*.json'], {
  onlyFiles: false
});

const estrutura = [];

for (const entry of entries) {
  const stat = fs.statSync(entry);
  estrutura.push({
    name: entry.split('/').pop(),
    path: entry,
    type: stat.isDirectory() ? 'folder' : 'file'
  });
}

fs.writeFileSync('files.json', JSON.stringify(estrutura, null, 2));
console.log('✅ Arquivo files.json gerado com sucesso!');

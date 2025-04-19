// gerar-arvore.mjs
import fs from 'fs';
import { globby } from 'globby';

const entries = await globby(['**/*', '!**/node_modules/**', '!**/.git/**', '!files.json', '!.github/**'], {
  onlyFiles: false
});

const pastas = new Set();
const arquivos = [];

for (const entry of entries) {
  const stat = fs.statSync(entry);

  if (stat.isDirectory()) {
    pastas.add(entry);
  } else if (stat.isFile()) {
    arquivos.push(entry);
  }
}

const estrutura = {
  pastas: Array.from(pastas).sort(),
  arquivos: arquivos.sort()
};

fs.writeFileSync('files.json', JSON.stringify(estrutura, null, 2));
console.log('✅ Arquivo files.json gerado com sucesso!');

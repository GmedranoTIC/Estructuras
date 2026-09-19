import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('[sync-build] Sincronizando artefactos para GitHub Pages...');

// 1. Ensure .nojekyll in dist, docs, root
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');
fs.writeFileSync(path.join(rootDir, 'dist', '.nojekyll'), '');

// 2. Mirror dist to docs
fs.rmSync(path.join(rootDir, 'docs'), { recursive: true, force: true });
copyDirSync(path.join(rootDir, 'dist'), path.join(rootDir, 'docs'));
fs.writeFileSync(path.join(rootDir, 'docs', '.nojekyll'), '');

// 3. Mirror dist/assets to assets/ in root
fs.rmSync(path.join(rootDir, 'assets'), { recursive: true, force: true });
copyDirSync(path.join(rootDir, 'dist', 'assets'), path.join(rootDir, 'assets'));

// 4. Create compatibility aliases in both assets and docs/assets
// (Matches older Vite bundle hash names so any cached or previous links work)
const targetDirs = [
  path.join(rootDir, 'assets'),
  path.join(rootDir, 'docs', 'assets')
];

for (const dir of targetDirs) {
  if (fs.existsSync(path.join(dir, 'app.js'))) {
    fs.copyFileSync(path.join(dir, 'app.js'), path.join(dir, 'index-CwnglBNx.js'));
  }
  if (fs.existsSync(path.join(dir, 'app.css'))) {
    fs.copyFileSync(path.join(dir, 'app.css'), path.join(dir, 'index-BtW3Qb34.css'));
  }
}

// 5. Ensure favicon.ico is in all key locations
if (fs.existsSync(path.join(rootDir, 'favicon.ico'))) {
  const icoSrc = path.join(rootDir, 'favicon.ico');
  const destinations = [
    path.join(rootDir, 'public', 'favicon.ico'),
    path.join(rootDir, 'dist', 'favicon.ico'),
    path.join(rootDir, 'docs', 'favicon.ico'),
    path.join(rootDir, 'assets', 'favicon.ico'),
    path.join(rootDir, 'docs', 'assets', 'favicon.ico')
  ];
  for (const dst of destinations) {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(icoSrc, dst);
  }
}

console.log('[sync-build] Sincronización completada con éxito.');

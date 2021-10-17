import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

import { ngPackagr } from 'ng-packagr';

async function main() {
  await ngPackagr()
    .forProject(join(process.cwd(), 'src/lib/package.json'))
    .build();

    copyFileSync('README.md', join(process.cwd(), 'dist/README.md'));
    copyFileSync('LICENSE', join(process.cwd(), 'dist/LICENSE'));
}

main()
  .then(() => console.log('success'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

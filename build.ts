import { copySync } from 'fs-extra';
import { ngPackagr } from 'ng-packagr';
import { join } from 'path';
import * as del from 'del';

async function main() {
  // cleanup dist
  del.sync(join(process.cwd(), '/dist'));
  del.sync(join(process.cwd(), '/node_modules/angulartics2'));

  await ngPackagr()
    .forProject(join(process.cwd(), 'src/lib/package.json'))
    .build();

  copySync('README.md', join(process.cwd(), 'dist/packages-dist/README.md'));
  copySync('LICENSE', join(process.cwd(), 'dist/packages-dist/LICENSE'));
}

main()
  .then(() => console.log('success'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

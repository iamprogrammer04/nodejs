/* eslint-disable @typescript-eslint/no-require-imports */
import semver from 'semver';
const requiredVersion = '>=22.10.0';

if (!semver.satisfies(process.version, requiredVersion)) {
  console.error(
    `Error: Node.js version ${requiredVersion} is required. You are using ${process.version}.`,
  );
  process.exit(1);
}

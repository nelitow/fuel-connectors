import fs from 'node:fs';
import { getPredicateRoot } from 'fuels';

const TMP_BUILD_PATH = 'tmp';
const VERSIONS_PREDICATE_PATH = 'predicates';

export const getTmpBuildPath = (__dirname: string) =>
  `${__dirname}/${TMP_BUILD_PATH}`;

export const getVersionsPredicatePath = (__dirname: string) =>
  `${__dirname}/${VERSIONS_PREDICATE_PATH}`;

export const addPredicate = async (__dirname: string, prefix: string) => {
  const tmpBuildPath = getTmpBuildPath(__dirname);
  if (!fs.existsSync(tmpBuildPath)) {
    console.info('No new predicate found. Ignoring...');
    return;
  }

  // Import all predicates and resolve the correct one (Evm or Sol prefixes)
  const allPredicates = await import(tmpBuildPath);
  const predicateKey = `${prefix}VerificationPredicateLoader`;
  const { [predicateKey]: predicate } = allPredicates;

  // Get the predicate root
  const version = getPredicateRoot(predicate.bytecode);
  const newPath = `${getVersionsPredicatePath(__dirname)}/${version}`;

  // If the predicate already exists, skip
  if (fs.existsSync(newPath)) {
    console.warn(`Predicate already exists: ${version}`);
    console.warn(
      'Keeping the tmp build, check and remove it if needed..',
      tmpBuildPath,
    );
    // fs.rmSync(tmpBuildPath, { recursive: true, force: true });
    return;
  }

  // Create the predicate directory
  fs.mkdirSync(newPath, { recursive: true });

  const date = new Date();
  const code = [
    '/* Autogenerated file. Do not edit manually. */',
    '',
    `import type { JsonAbi, BytesLike } from 'fuels';`,
    '',
    `export const generationDate = ${date.getTime().toString()};`,
    '// biome-ignore lint: Autogenerated file',
    `export const abi: JsonAbi = ${JSON.stringify(predicate.abi)};`,
    `export const bin: BytesLike = new Uint8Array([${predicate.bytecode}]);`,
  ];

  // Write the predicate
  fs.appendFileSync(`${newPath}/index.ts`, code.join('\n'));

  // Remove the tmp build
  fs.rmSync(tmpBuildPath, { recursive: true, force: true });

  // Log the predicate
  console.info(`Predicate added: ${version}`);
};

export const syncPredicate = async (__dirname: string) => {
  const versionsPredicatePath = getVersionsPredicatePath(__dirname);
  const versionsDictionaryPath = `${versionsPredicatePath}/index.ts`;
  const header =
    "/* Autogenerated file. Do not edit manually. */\n\nimport type { PredicateVersion } from '@fuel-connectors/common';\n";
  fs.writeFileSync(versionsDictionaryPath, header);

  const versions = await Promise.all(
    fs
      .readdirSync(versionsPredicatePath)
      .filter((f) => !f.includes('.ts'))
      .map(async (f) => {
        const { generationDate, abi, bin } = await import(
          `${versionsPredicatePath}/${f}/index.ts`
        );
        return { abi, bin, date: generationDate, version: f };
      }),
  );
  if (versions.length === 0) {
    console.warn('No predicates found.');
    return [];
  }

  const headers = versions.map(
    (v) =>
      `import { abi as abi${v.date}, bin as bin${v.date}, generationDate as generationDate${v.date}} from './${v.version}';`,
  );

  const code = `\n\nexport const PREDICATE_VERSIONS: Record<string, PredicateVersion> = {\n${versions
    .map(
      (v) =>
        `\t'${v.version}':{ predicate: {abi: abi${v.date}, bin: bin${v.date}}, generatedAt: generationDate${v.date} }`,
    )
    .join(',\n')}
};\n`;
  fs.appendFileSync(versionsDictionaryPath, `${headers.join('\n')}${code}`);
  console.info('Dictionary updated.');
  return versions;
};

export const generateVersions = async (
  __dirname: string,
  prefix: 'Evm' | 'Sol',
) => {
  await addPredicate(__dirname, prefix);
  const versions = await syncPredicate(__dirname);
  console.info('Done.');
  return versions;
};

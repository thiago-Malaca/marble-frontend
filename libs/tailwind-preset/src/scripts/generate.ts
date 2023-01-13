import ora from 'ora';
import { writeFile } from 'fs/promises';
import * as R from 'remeda';
import prettier from 'prettier';
import { join } from 'path';
import rimraf from 'rimraf';

type DesignTokens = {
  colors: Record<string, { value: string }>;
  text_styles: Record<
    string,
    {
      value: {
        font: {
          family: string;
          size: number;
          weight: number;
          stretch: number;
        };
        line_height: number;
      };
    }
  >;
  spacing: Record<string, unknown>;
};

const OUT_DIR = 'src/lib';

async function downloadDesignTokens() {
  const spinner = ora('Downloading design tokens...').start();
  let result: DesignTokens;
  try {
    result = await fetch(
      'https://api.zeplin.dev/v1/projects/6386281f1a052582d335e9ff/design_tokens?include_linked_styleguides=true',
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          Authorization: `Bearer ${process.env['PERSONAL_ACCESS_TOKEN']}`,
        }),
      }
    ).then(({ json }) => json());
    spinner.succeed('Design tokens succesfully downloaded');
  } catch (error) {
    spinner.succeed('Failed to download design tokens');
    throw error;
  }
  return result;
}

async function saveFile(fileName: string, data: Record<string, unknown>) {
  await writeFile(
    join(OUT_DIR, fileName),
    prettier.format(JSON.stringify(data), { parser: 'json' })
  );
}

async function buildColors(data: DesignTokens) {
  const spinner = ora('Building colors...').start();
  try {
    const colors = R.pipe(
      Object.entries(data.colors),
      R.map(([color, { value }]) => {
        const [name, shade] = color.split('-');
        return { name, shade, value };
      }),
      R.groupBy(({ name }) => name),
      R.mapValues((values) => {
        if (values.filter(({ shade }) => shade === undefined).length > 0) {
          return values[0].value;
        }
        return R.pipe(
          values,
          R.groupBy(({ shade }) => shade),
          R.mapValues((elem) => elem[0].value)
        );
      })
    );
    await saveFile('colors.json', colors);
    spinner.succeed('colors succesfully built');
  } catch (error) {
    spinner.fail('Failed to build colors');
    throw error;
  }
}

async function buildFontSize(data: DesignTokens) {
  const spinner = ora('Building fontSize...').start();
  try {
    const fontSize = R.pipe(
      data.text_styles,
      R.mapValues(({ value: { font, line_height } }) => {
        return [
          `${font.size}px`,
          { lineHeight: `${line_height}px`, fontWeight: font.weight },
        ];
      })
    );
    await saveFile('fontSize.json', fontSize);
    spinner.succeed('fontSize succesfully built');
  } catch (error) {
    spinner.fail('Failed to build fontSize');
    throw error;
  }
}

async function main() {
  try {
    rimraf.sync(`${OUT_DIR}/*`);

    const data = await downloadDesignTokens();

    await Promise.all([buildColors(data), buildFontSize(data)]);
  } catch (error) {
    console.error('\n', error);
    process.exit(1);
  }
}

main();

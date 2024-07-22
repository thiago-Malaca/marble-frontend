import { getDateFnsLocale } from '@app-builder/services/i18n/i18n-config';
import cronstrue from 'cronstrue';
import { type Options as ConstrueOptions } from 'cronstrue/dist/options';
import { add } from 'date-fns/add';
import { formatDistanceStrict } from 'date-fns/formatDistanceStrict';
import { formatRelative } from 'date-fns/formatRelative';
import { useMemo } from 'react';
import { Temporal } from 'temporal-polyfill';

/**
 * Get the language of the user's browser.
 *
 * This is a workaround for the fact that we only support en, and we want to format dates in the user's language.
 * Since we do not store the user's language preferences, we use the browser's language.
 *
 * This introduce hydration issues for non 'fr-FR' browsers, as the language is not available on the server.
 * We use a hook to ease the migration to a better solution.
 */
export function useFormatLanguage() {
  return useMemo(
    () =>
      typeof navigator === 'undefined'
        ? 'fr-FR'
        : (navigator?.languages[0] ?? 'fr-FR'),
    [],
  );
}

export function formatDateTime(
  createdAt: string | Date,
  { language, ...options }: { language: string } & Intl.DateTimeFormatOptions,
) {
  return Intl.DateTimeFormat(language, {
    dateStyle: 'short',
    timeStyle: 'short',
    ...options,
  }).format(typeof createdAt === 'string' ? new Date(createdAt) : createdAt);
}

export function formatNumber(
  number: number,
  { language, ...options }: { language: string } & Intl.NumberFormatOptions,
) {
  return Intl.NumberFormat(language, options).format(number);
}

export function formatSchedule(
  schedule: string,
  { language, ...options }: { language: string } & ConstrueOptions,
) {
  // Cronstrue only expose locale for lng, without country code
  const locale = language.split('-')[0];

  return cronstrue
    .toString(schedule, {
      verbose: false,
      locale,
      throwExceptionOnParseError: false,
      ...options,
    })
    .toLowerCase();
}

const date = new Date();
export function formatDuration(duration: string, language: string) {
  return formatDistanceStrict(
    add(date, Temporal.Duration.from(duration)),
    date,
    {
      addSuffix: true,
      locale: getDateFnsLocale(language),
    },
  );
}

export function formatDateRelative(
  date: string | Date,
  options: { language: string },
) {
  return formatRelative(
    typeof date === 'string' ? new Date(date) : date,
    new Date(),
    {
      locale: getDateFnsLocale(options.language),
    },
  );
}

import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['es', 'en'];

export default getRequestConfig(async ({locale}) => {
  const finalLocale = locale || 'es';
  if (!locales.includes(finalLocale as any)) notFound();

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});

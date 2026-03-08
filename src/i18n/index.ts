/**
 * Extension 侧 i18n 模块
 *
 * 负责 Extension 自身的 t() 调用（toast、弹窗、错误提示）。
 * Webview 侧独立打包资源，不依赖此模块推送字典。
 */

import zhCN from './zh-CN.json';
import enUS from './en-US.json';
import { DEFAULT_LOCALE } from './types';
import type { LocaleCode } from './types';

export type { LocaleCode } from './types';
export { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './types';

const resources: Record<LocaleCode, Record<string, string>> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

let currentLocale: LocaleCode = DEFAULT_LOCALE;

export function setLocale(locale: LocaleCode): void {
  currentLocale = locale;
}

export function getLocale(): LocaleCode {
  return currentLocale;
}

export function t(key: string, vars?: Record<string, string | number>): string {
  let text = resources[currentLocale]?.[key] ?? resources['en-US']?.[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}

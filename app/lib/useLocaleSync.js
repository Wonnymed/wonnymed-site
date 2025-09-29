"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { COOKIE_MAX_AGE_SECONDS, RTL_LOCALES } from "./locale";

function escapeForRegex(value = "") {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readCookieValue(name) {
  if (typeof document === "undefined") {
    return null;
  }

  const pattern = new RegExp(`(?:^|; )${escapeForRegex(name)}=([^;]*)`);
  const match = document.cookie.match(pattern);

  if (!match || match.length < 2) {
    return null;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function useLocaleSync({
  supportedLocales,
  defaultLocale,
  cookieName,
  initialLocale,
  rtlLocales = RTL_LOCALES,
  queryParam = "lang",
}) {
  const supportedSet = useMemo(() => {
    return new Set((supportedLocales || []).map((code) => code.toLowerCase()));
  }, [supportedLocales]);

  const rtlSet = useMemo(() => {
    return new Set((rtlLocales || []).map((code) => code.toLowerCase()));
  }, [rtlLocales]);

  const initialNormalized = useMemo(() => {
    if (typeof initialLocale === "string") {
      const candidate = initialLocale.toLowerCase();
      if (supportedSet.has(candidate)) {
        return candidate;
      }
    }
    return defaultLocale;
  }, [defaultLocale, initialLocale, supportedSet]);

  const [locale, setLocaleState] = useState(initialNormalized);
  const userNavigationRef = useRef(false);

  const normalize = useCallback(
    (value) => {
      if (typeof value === "string") {
        const lowered = value.toLowerCase();
        if (supportedSet.has(lowered)) {
          return lowered;
        }
      }
      return defaultLocale;
    },
    [defaultLocale, supportedSet]
  );

  const readLocaleFromUrl = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const url = new URL(window.location.href);
      const param = url.searchParams.get(queryParam);
      if (typeof param === "string") {
        const lowered = param.toLowerCase();
        if (supportedSet.has(lowered)) {
          return lowered;
        }
      }
    } catch {
      // Ignore URL parsing errors
    }

    return null;
  }, [queryParam, supportedSet]);

  const setLocaleInternal = useCallback(
    (nextLocale, userInitiated) => {
      setLocaleState((current) => {
        const normalized = normalize(nextLocale);
        if (current === normalized) {
          userNavigationRef.current = false;
          return current;
        }
        userNavigationRef.current = Boolean(userInitiated);
        return normalized;
      });
    },
    [normalize]
  );

  const selectLocale = useCallback(
    (nextLocale) => {
      setLocaleInternal(nextLocale, true);
    },
    [setLocaleInternal]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const fromUrl = readLocaleFromUrl();
    if (fromUrl) {
      setLocaleInternal(fromUrl, false);
      return;
    }

    const fromCookie = readCookieValue(cookieName);
    if (fromCookie) {
      setLocaleInternal(fromCookie, false);
      return;
    }

    setLocaleInternal(defaultLocale, false);
  }, [cookieName, defaultLocale, readLocaleFromUrl, setLocaleInternal]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handlePopState = () => {
      const fromUrl = readLocaleFromUrl();
      if (fromUrl) {
        setLocaleInternal(fromUrl, false);
      } else {
        setLocaleInternal(defaultLocale, false);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [defaultLocale, readLocaleFromUrl, setLocaleInternal]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.lang = locale;
    document.documentElement.dir = rtlSet.has(locale) ? "rtl" : "ltr";
  }, [locale, rtlSet]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.cookie = `${cookieName}=${encodeURIComponent(locale)};path=/;max-age=${COOKIE_MAX_AGE_SECONDS};SameSite=Lax`;
  }, [cookieName, locale]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const url = new URL(window.location.href);
      if (locale === defaultLocale) {
        url.searchParams.delete(queryParam);
      } else {
        url.searchParams.set(queryParam, locale);
      }

      const nextUrl = url.toString();
      if (nextUrl === window.location.href) {
        userNavigationRef.current = false;
        return;
      }

      const method = userNavigationRef.current ? "pushState" : "replaceState";
      window.history[method]({}, "", nextUrl);
      userNavigationRef.current = false;
    } catch {
      // Ignore URL update issues
    }
  }, [defaultLocale, locale, queryParam]);

  return {
    locale,
    selectLocale,
    setLocale: (nextLocale) => setLocaleInternal(nextLocale, false),
  };
}

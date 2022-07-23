import React, { PropsWithChildren } from 'react';
import useSWR, {
  Fetcher,
  Key,
  SWRConfig,
  SWRConfiguration,
  useSWRConfig,
} from 'swr';
import { FullConfiguration } from 'swr/dist/types';

let __SWRConfig: FullConfiguration | undefined = undefined;
export const mutateAllKeys = () => {
  if (__SWRConfig) {
    const { cache, mutate } = __SWRConfig;
    Array.from((cache as Map<string, any>).keys()).forEach((key) => {
      mutate(key);
    });
  }
};

// @plasmicapp/query is optimized for SSR, so we do not revalidate
// automatically upon hydration; as if the data is immutable.
function getPlasmicDefaultSWROptions(): SWRConfiguration {
  return {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };
}

/**
 * Fetches data asynchronously. This data should be considered immutable for the
 * session -- there is no way to invalidate or re-fetch this data.
 *
 * @param key a unique key for this data fetch; if data already exists under this
 *   key, that data is returned immediately.
 * @param fetcher an async function that resolves to the fetched data.
 * @returns an object with either a "data" key with the fetched data if the fetch
 *   was successful, or an "error" key with the thrown Error if the fetch failed.
 */
export function usePlasmicQueryData<T>(
  key: Key,
  fetcher: Fetcher<T>
): { data?: T; error?: Error; isLoading?: boolean } {
  const prepassCtx = React.useContext(PrepassContext);

  const opts = getPlasmicDefaultSWROptions();
  if (prepassCtx) {
    // If we're doing prepass, then we are always in suspense mode, because
    // react-ssr-prepass only works with suspense-throwing data fetching.
    opts.suspense = true;
  }

  const config = useSWRConfig();
  React.useEffect(() => {
    __SWRConfig = config;
  }, [config]);

  const resp = useSWR(key, fetcher, opts);
  if (resp.data) {
    return { data: resp.data };
  } else if (resp.error) {
    return { error: resp.error };
  } else {
    return { isLoading: true };
  }
}

/**
 * Fetches data asynchronously using SWR Hook (https://swr.vercel.app/)
 *
 * @param key a unique key for this data fetch; if data already exists under this
 *   key, that data is returned immediately.
 * @param fetcher an async function that resolves to the fetched data.
 * @param options (optional) an object of options for this hook (https://swr.vercel.app/docs/options).
 * @returns an object with either a "data" key with the fetched data if the fetch
 *   was successful, or an "error" key with the thrown Error if the fetch failed.
 */
export function useMutablePlasmicQueryData<T, E>(
  key: Key,
  fetcher: Fetcher<T>,
  options?: SWRConfiguration<T, E>
) {
  const prepassCtx = React.useContext(PrepassContext);

  const opts = {
    ...getPlasmicDefaultSWROptions(),
    ...options,
  };
  if (prepassCtx) {
    opts.suspense = true;
  }

  const config = useSWRConfig();
  React.useEffect(() => {
    __SWRConfig = config;
  }, [config]);

  return useSWR(key, fetcher, opts);
}

export function PlasmicQueryDataProvider(props: {
  suspense?: boolean;
  children: React.ReactNode;
  prefetchedCache?: Record<string, any>;
}) {
  const { children, suspense, prefetchedCache } = props;
  const prepass = React.useContext(PrepassContext);
  if (prepass) {
    // If we're in prepass, then there's already a wrappign SWRConfig;
    // don't interfere with it.
    return <>{children}</>;
  } else {
    return (
      <SWRConfig
        value={{
          fallback: prefetchedCache ?? {},
          suspense,
        }}
      >
        {children}
      </SWRConfig>
    );
  }
}

const PrepassContext = React.createContext<boolean>(false);

export function PlasmicPrepassContext(
  props: PropsWithChildren<{
    cache: Map<string, any>;
  }>
) {
  const { cache, children } = props;
  return (
    <PrepassContext.Provider value={true}>
      <SWRConfig
        value={{
          provider: () => cache,
          suspense: true,
          fallback: {},
        }}
      >
        {children}
      </SWRConfig>
    </PrepassContext.Provider>
  );
}

import { PlasmicPrepassContext } from "@plasmicapp/query";
import prepass from "@plasmicapp/react-ssr-prepass";
import React from "react";

/**
 * Performs a prepass over Plasmic content, kicking off the necessary
 * data fetches, and populating the fetched data into a cache.  This
 * cache can be passed as prefetchedQueryData into PlasmicRootProvider.
 *
 * To limit rendering errors that can occur when you do this, we recommend
 * that you pass in _only_ the PlasmicComponents that you are planning to use
 * as the argument.  For example:
 *
 *   const cache = await extractPlasmicQueryData(
 *     <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
 *       <PlasmicComponent component="Home" componentProps={{
 *         // Specify the component prop overrides you are planning to use
 *         // to render the page, as they may change what data is fetched.
 *         ...
 *       }} />
 *       <PlasmicComponent component="NavBar" componentProps={{
 *         ...
 *       }} />
 *       ...
 *     </PlasmicRootProvider>
 *   );
 *
 * If your PlasmicComponent will be wrapping components that require special
 * context set up, you should also wrap the element above with those context
 * providers.
 *
 * You should avoid passing in elements that are not related to Plasmic, as any
 * rendering errors from those elements during the prepass may result in data
 * not being populated in the cache.
 *
 * @param element a React element containing instances of PlasmicComponent.
 *   Will attempt to satisfy all data needs from usePlasmicDataQuery()
 *   in this element tree.
 * @returns an object mapping query key to fetched data
 */
export async function extractPlasmicQueryData(
  element: React.ReactElement
): Promise<Record<string, any>> {
  const cache = new Map<string, any>();
  try {
    await plasmicPrepass(
      <PlasmicPrepassContext cache={cache}>{element}</PlasmicPrepassContext>
    );
  } catch (err) {
    console.warn(`PLASMIC: Error encountered while pre-rendering`, err);
  }

  // Ignore SWR cache keys and query taggeds with $csq$ that indicate a query that
  // the value is exected to be only loaded in client-side and not possible to
  // extract from server-side.
  const queryCache = Object.fromEntries(
    Array.from(cache.entries()).filter(
      ([key, val]) =>
        !key.startsWith("$swr$") &&
        !key.startsWith("$csq$") &&
        val !== undefined
    )
  );

  try {
    return JSON.parse(
      JSON.stringify(queryCache, (_key, value) =>
        value !== undefined ? value : null
      )
    );
  } catch {
    return queryCache;
  }
}

/**
 * Runs react-ssr-prepass on `element`, while isolating rendering errors
 * as much as possible for each PlasmicComponent instance.
 */
export async function plasmicPrepass(element: React.ReactElement) {
  await prepass(buildPlasmicPrepassElement(element));
}

/**
 * Returns a clone of the element tree, where componentProps of PlasmicComponent
 * has been processed such that any React elements found are wrapped in
 * an error boundary. Makes it possible to isolate rendering errors while still
 * finishing as much data fetched as possible.
 */
function buildPlasmicPrepassElement(element: React.ReactElement) {
  return <GenericErrorBoundary>{element}</GenericErrorBoundary>;
}

class GenericErrorBoundary extends React.Component<{
  children: React.ReactNode;
}> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
  }

  componentDidCatch(error: any) {
    console.log(`Plasmic: Encountered error while prepass rendering:`, error);
  }

  render() {
    return <>{this.props.children}</>;
  }
}

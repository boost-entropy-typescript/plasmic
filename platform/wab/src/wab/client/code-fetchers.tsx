import {
  Fetcher,
  FetcherMeta,
  FetcherRegistration,
} from "@plasmicapp/host/dist/fetcher";
import memoizeOne from "memoize-one";
import { ensure, tuple, uncheckedCast } from "../common";

export type FetcherMap = Map<string, { impl: Fetcher; meta: FetcherMeta }>;

export class CodeFetchersRegistry {
  constructor(private win: Window) {}

  getRegisteredCodeFetchers(): FetcherRegistration[] {
    return ensure(
      uncheckedCast<any>(this.win).__PlasmicFetcherRegistry,
      "Plasmic Fetchers Registry not found"
    );
  }

  getRegisteredCodeFetchersMap: () => FetcherMap = memoizeOne(
    () =>
      new Map(
        this.getRegisteredCodeFetchers().map(({ fetcher, meta }) =>
          tuple(meta.name, { impl: fetcher, meta })
        )
      )
  );
}

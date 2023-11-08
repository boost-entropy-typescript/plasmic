import { mergeSane } from "../../common";
import { DEVFLAGS } from "../../devflags";
import { DbMgr } from "./DbMgr";

export async function getDevFlagsMergedWithOverrides(
  mgr: DbMgr
): Promise<typeof DEVFLAGS> {
  const overrides = await mgr.tryGetDevFlagOverrides();
  const merged = mergeSane({}, DEVFLAGS, JSON.parse(overrides?.data ?? "{}"));
  return merged;
}

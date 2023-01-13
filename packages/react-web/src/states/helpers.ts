import get from "dlv";
import { useEffect, useLayoutEffect } from "react";
import { $State } from "./types";

export function generateStateOnChangeProp(
  $state: $State,
  stateName: string,
  dataReps: number[]
): (val: any, path: (string | number)[]) => void {
  return (val, path) => set($state, [stateName, ...dataReps, ...path], val);
}

/**
 * This function generate the state value prop for repeated states
 * Example:
 *   - parent[][].counter[].count
 * We need to pass `parent[index1][index2].counter to the child component
 */
export function generateStateValueProp(
  $state: $State,
  path: (string | number)[] // ["parent", 0, 1, "counter"]
) {
  return get($state, path);
}

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function shallowEqual<T>(a1: T[], a2: T[]) {
  if (a1.length !== a2.length) {
    return false;
  }
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}

export function isNum(value: string | number | symbol): value is number {
  return typeof value === "symbol" ? false : !isNaN(+value);
}

type StringGen = string | (() => string);
export function assert<T>(
  cond: T,
  msg: StringGen = "Assertion failed"
): asserts cond {
  if (!cond) {
    // We always generate an non empty message so that it doesn't get swallowed
    // by the async library.
    msg = (typeof msg === "string" ? msg : msg()) || "Assertion failed";
    debugger;
    throw new Error(msg);
  }
}

/**
 * Forked from https://github.com/lukeed/dset
 * Changes: fixed setting a deep value to a proxy object
 */
export function set(obj: any, keys: any, val: any) {
  keys = keys.split ? keys.split(".") : keys;
  var i = 0,
    l = keys.length,
    t = obj,
    x,
    k;
  while (i < l) {
    k = keys[i++];
    if (k === "__proto__" || k === "constructor" || k === "prototype") break;
    const newValue =
      i === l
        ? val
        : typeof (x = t[k]) === typeof keys
        ? x
        : keys[i] * 0 !== 0 || !!~("" + keys[i]).indexOf(".")
        ? {}
        : [];
    assignValue(t, k, newValue);
    t = t[k];
  }
}

/**
 * Forked from lodash
 */
function baseAssignValue(object: any, key: any, value: any) {
  if (key == "__proto__") {
    Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      value: value,
      writable: true,
    });
  } else {
    object[key] = value;
  }
}

function eq(value: any, other: any) {
  return value === other || (value !== value && other !== other);
}

function assignValue(object: any, key: any, value: any) {
  const objValue = object[key];
  if (
    !(
      Object.prototype.hasOwnProperty.call(object, key) && eq(objValue, value)
    ) ||
    (value === undefined && !(key in object))
  ) {
    baseAssignValue(object, key, value);
  }
}

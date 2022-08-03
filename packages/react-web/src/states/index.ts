/* eslint-disable @typescript-eslint/no-use-before-define */
import get from "dlv";
import { dset as set } from "dset";
import React from "react";

export interface $State {
  [key: string]: any;
}

export interface $StateSpec<T> {
  // path of the state, like `count` or `list.selectedIndex`
  path: string;
  // if initial value is defined by a js expression
  initFunc?: ($props: Record<string, any>, $state: $State) => T;
  // if initial value is a hard-coded value
  initVal?: T;
  // Whether this state is private, readonly, or writable in
  // this component
  type: "private" | "readonly" | "writable";

  // If writable, there should be a valueProp that maps props[valueProp]
  // to the value of the state
  valueProp?: string;

  // If writable or readonly, there should be an onChangeProp where
  // props[onChangeProp] is invoked whenever the value changes
  onChangeProp?: string;
}

const UNINITIALIZED = Symbol("plasmic.unitialized");

interface Internal$StateSpec<T> {
  path: string[]; // ["counter", "[]", "count"]
  pathStr: string; // "counter[].count"
  initFunc?: ($props: Record<string, any>, $state: $State) => T;
  initVal?: T;
  valueProp?: string;
  onChangeProp?: string;
  isRepeated: boolean;
}

interface Internal$StateInstance<T> {
  path: (string | number)[]; // ["counter", 0, "count"]
  spec: Internal$StateSpec<T>;
}

interface Internal$State {
  stateValues: Record<string, any>;
  initStateValues: Record<string, any>;
  // from path with an initFunc, to the state paths that it uses
  // in the initFunc
  initStateDeps: Record<string, string[]>;
  states: Record<string, Internal$StateInstance<any>>;
}

function shallowEqual<T>(a1: T[], a2: T[]) {
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

const isNum = (value: string | number | symbol) =>
  typeof value === "symbol" ? false : !isNaN(+value);

function mkProxy(
  specs: Internal$StateSpec<any>[],
  maybeHandlers?: (state: Internal$StateInstance<any>) => ProxyHandler<any>
): Record<string, any> {
  const handlers =
    maybeHandlers ??
    ((): ProxyHandler<any> => ({
      get: (target, property) => {
        return target[property];
      },
      set: (target, property, value) => {
        return (target[property] = value) || true;
      },
    }));

  const rec = (currPath: (string | number)[]) => {
    const nextParts = Object.fromEntries(
      specs
        .filter((spec) =>
          shallowEqual(
            currPath.map((p) => (isNum(p) ? "[]" : p)),
            spec.path.slice(0, currPath.length)
          )
        )
        .map((spec) => {
          const nextPart = spec.path[currPath.length];
          if (spec.path.length === currPath.length + 1) {
            return [nextPart, { isLast: true, spec }];
          } else {
            return [nextPart, { isLast: false, spec }];
          }
        })
    );
    return new Proxy("[]" in nextParts ? ([] as any) : ({} as any), {
      get: (target, property, receiver) => {
        if ("[]" in nextParts && isNum(property as string)) {
          if (!(property in target)) {
            target[property] = rec([...currPath, +(property as string)]);
          }
        } else if (property in nextParts) {
          if (nextParts[property as string].isLast) {
            return handlers?.({
              path: [...currPath, property as string],
              spec: nextParts[property as string].spec,
            }).get?.(target, property, receiver);
          } else if (!(property in target)) {
            target[property] = rec([...currPath, property as string]);
          }
        }
        return target[property];
      },
      set: (target, property, value, receiver) => {
        if (!(property in target) && property in nextParts) {
          if (nextParts[property as string].isLast) {
            return (
              handlers({
                path: [...currPath, property as string],
                spec: nextParts[property as string].spec,
              }).set?.(target, property, value, receiver) ?? false
            );
          } else {
            throw new Error("You can't set a value in the middle of the path");
          }
        } else {
          target[property] = value;
          return true;
        }
      },
    });
  };

  return rec([]);
}

function cloneProxy(
  specs: Internal$StateSpec<any>[],
  states: Record<string, Internal$StateInstance<any>>,
  obj: Record<string, any>
) {
  const newObj = mkProxy(specs);
  Object.values(states).forEach(({ path }) => {
    set(newObj, path, get(obj, path));
  });
  return newObj;
}

function saveState<T>(
  state: Internal$StateInstance<T>,
  states: Record<string, Internal$StateInstance<T>>
) {
  states[JSON.stringify(state.path)] = state;
}

function hasState(
  state: Internal$StateInstance<any>,
  states: Record<string, Internal$StateInstance<any>>
) {
  return JSON.stringify(state.path) in states;
}

const transformPathStringToObj = (str: string) => {
  // "c[][]" -> ["c", "[]", "[]"]
  const splitStatePathPart = (state: string): string[] =>
    state.endsWith("[]")
      ? [...splitStatePathPart(state.slice(0, -2)), "[]"]
      : [state];
  return str.split(".").flatMap(splitStatePathPart);
};

function useVanillaDollarState(
  _specs: $StateSpec<any>[],
  props: Record<string, any>
) {
  const specs: Internal$StateSpec<any>[] = _specs.map(
    ({ path: pathStr, ...spec }) => ({
      ...spec,
      pathStr,
      path: transformPathStringToObj(pathStr),
      isRepeated: pathStr.split(".").some((part) => part.endsWith("[]")),
    })
  );

  const [$$state, set$$State] = React.useState<Internal$State>(() => {
    const stateValues: Record<string, any> = mkProxy(specs);
    const initStates: Record<string, Internal$StateInstance<any>> = {};

    for (const spec of specs) {
      if (spec.valueProp || spec.isRepeated) {
        continue;
      } else if (spec.initFunc) {
        set(stateValues, spec.path, UNINITIALIZED);
      } else {
        set(stateValues, spec.path, spec.initVal ?? undefined);
      }
      saveState({ path: spec.path, spec }, initStates);
    }
    const deps = fillUninitializedStateValues(
      specs,
      props,
      stateValues,
      initStates
    );
    return {
      stateValues,
      initStateDeps: deps,
      initStateValues: cloneProxy(specs, initStates, stateValues),
      states: initStates,
    };
  });

  const $state: $State = mkProxy(specs, (state) => ({
    get(_target, _property) {
      if (state.spec.valueProp) {
        if (!state.spec.isRepeated) {
          return props[state.spec.valueProp];
        } else {
          return get(props[state.spec.valueProp], state.path.slice(1));
        }
      }
      if (!hasState(state, $$state.states)) {
        saveState(state, $$state.states);
        set(
          $$state.stateValues,
          state.path,
          state.spec.initFunc ? UNINITIALIZED : state.spec.initVal ?? undefined
        );
        const deps = state.spec.initFunc
          ? fillUninitializedStateValues(
              specs,
              props,
              $$state.stateValues,
              $$state.states
            )
          : {};
        set(
          $$state.initStateValues,
          state.path,
          get($$state.stateValues, state.path)
        );
        set$$State((prev) => ({
          initStateValues: cloneProxy(specs, prev.states, prev.stateValues),
          stateValues: cloneProxy(specs, prev.states, prev.initStateValues),
          initStateDeps: { ...prev.initStateDeps, ...deps },
          states: { ...prev.states },
        }));
      }
      return get($$state.stateValues, state.path);
    },
    set(_target, _property, newValue) {
      saveState(state, $$state.states);
      if (newValue !== get($$state.stateValues, state.path)) {
        set($$state.stateValues, state.path, newValue);
        for (const [key, deps] of Object.entries($$state.initStateDeps)) {
          if (deps.includes(JSON.stringify(state.path))) {
            set($$state.stateValues, JSON.parse(key), UNINITIALIZED);
          }
        }
        const newDeps = fillUninitializedStateValues(
          specs,
          props,
          $$state.stateValues,
          $$state.states
        );
        set$$State((prev) => ({
          initStateValues: { ...prev.initStateValues },
          stateValues: cloneProxy(specs, prev.states, prev.stateValues),
          initStateDeps: { ...prev.initStateDeps, ...newDeps },
          states: { ...prev.states },
        }));
        if (state.spec.onChangeProp) {
          props[state.spec.onChangeProp]?.(newValue, state.path);
        }
      }
      return true;
    },
  }));
  // For each spec with an initFunc, evaluate it and see if
  // the init value has changed. If so, reset its state.
  let newStateValues: Record<string, any> | undefined = undefined;
  const resetSpecs: Internal$StateInstance<any>[] = [];
  for (const { path, spec } of Object.values($$state.states)) {
    if (spec.initFunc) {
      const newInit = spec.initFunc(props, $state);
      if (newInit !== get($$state.initStateValues, path)) {
        console.log(
          `init changed for ${JSON.stringify(path)} from ${get(
            $$state.initStateValues,
            path
          )} to ${newInit}; resetting state`
        );
        resetSpecs.push({ path, spec });
        if (!newStateValues) {
          newStateValues = cloneProxy(
            specs,
            $$state.states,
            $$state.stateValues
          );
        }
        set(newStateValues, path, UNINITIALIZED);
      }
    }
  }
  React.useLayoutEffect(() => {
    if (newStateValues !== undefined) {
      const newDeps = fillUninitializedStateValues(
        specs,
        props,
        newStateValues,
        $$state.states
      );
      set$$State((prev) => {
        const initStateValues = cloneProxy(
          specs,
          prev.states,
          prev.initStateValues
        );
        resetSpecs.forEach(({ path }) => {
          set(initStateValues, path, get(newStateValues!, path));
        });
        return {
          stateValues: cloneProxy(specs, prev.states, newStateValues!),
          initStateDeps: { ...prev.initStateDeps, ...newDeps },
          initStateValues,
          states: { ...prev.states },
        };
      });
      for (const { path, spec } of resetSpecs) {
        if (spec.onChangeProp) {
          console.log(
            `Firing onChange for reset init value: ${spec.path}`,
            get(newStateValues, path)
          );
          props[spec.onChangeProp]?.(get(newStateValues, path));
        }
      }
    }
  }, [newStateValues, props, resetSpecs, specs]);

  return $state;
}

function fillUninitializedStateValues(
  specs: Internal$StateSpec<any>[],
  props: Record<string, any>,
  stateValues: Record<string, any>,
  states: Record<string, Internal$StateInstance<any>>
) {
  const stateAccessStack: Set<string>[] = [new Set()];
  const initFuncDeps: Record<string, string[]> = {};
  const $state: $State = mkProxy(specs, (state) => ({
    get(_target, _property) {
      if (state.spec.valueProp) {
        if (!state.spec.isRepeated) {
          return props[state.spec.valueProp];
        } else {
          return get(props[state.spec.valueProp], state.path.slice(1));
        }
      }
      let value = get(stateValues, state.path);
      if (value === UNINITIALIZED) {
        // This value has a init expression; need to be evaluated.
        value = tracked(state);
        set(stateValues, state.path, value);
      }
      // Record that this field had just been accessed; for
      // trackInit() to know what fields were used to compute
      // the init value
      stateAccessStack[stateAccessStack.length - 1].add(
        JSON.stringify(state.path)
      );
      return value;
    },
    set() {
      throw new Error(`Cannot update state values during initialization`);
    },
  }));
  function tracked<T>(state: Internal$StateInstance<T>) {
    stateAccessStack.push(new Set());
    const res = state.spec.initFunc!(props, $state);
    const deps = stateAccessStack.pop()!;
    initFuncDeps[JSON.stringify(state.path)] = [...deps.values()];
    return res;
  }
  for (const { path } of Object.values(states)) {
    if (get(stateValues, path) === UNINITIALIZED) {
      get($state, path);
    }
  }
  return initFuncDeps;
}

export default useVanillaDollarState;

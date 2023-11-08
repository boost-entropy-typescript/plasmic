import React from "react";
import { ensure, ensureTruthy, hackyCast } from "../../common";
import type { HostFrameCtx } from "./host-frame-ctx";
import type { TopFrameCtx } from "./top-frame-ctx";

type FrameCtx = TopFrameCtx | HostFrameCtx | undefined;

const FrameCtxContext = React.createContext<FrameCtx>(undefined);

export function providesFrameCtx(value: FrameCtx, key?: string) {
  return function (children: React.ReactNode) {
    const existingFrameCtx = React.useContext(FrameCtxContext);
    ensureTruthy(!existingFrameCtx, "FrameCtx already provided");
    return (
      <FrameCtxContext.Provider value={value} key={key}>
        {children}
      </FrameCtxContext.Provider>
    );
  };
}

export function useFrameCtx<TFrameCtx extends FrameCtx>(): TFrameCtx {
  const frameCtx = React.useContext(FrameCtxContext);
  return hackyCast(ensure(frameCtx, "FrameCtx not provided"));
}

export function useFrameCtxMaybe<TFrameCtx extends FrameCtx>():
  | TFrameCtx
  | undefined {
  return hackyCast(React.useContext(FrameCtxContext));
}

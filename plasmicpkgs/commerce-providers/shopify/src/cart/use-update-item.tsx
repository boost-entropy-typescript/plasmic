/*
  Forked from https://github.com/vercel/commerce/tree/main/packages/shopify/src
  Changes: None
*/
import type {
  HookFetcherContext,
  MutationHookContext,
} from "@plasmicpkgs/commerce";
import {
  useUpdateItem,
  UseUpdateItem,
  ValidationError,
} from "@plasmicpkgs/commerce";
import debounce from "debounce";
import { useCallback } from "react";

import { Mutation, MutationCheckoutLineItemsUpdateArgs } from "../schema";
import type { LineItem, UpdateItemHook } from "../types/cart";
import {
  checkoutLineItemUpdateMutation,
  checkoutToCart,
  getCheckoutId,
} from "../utils";
import useCart from "./use-cart";
import { handler as removeItemHandler } from "./use-remove-item";

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook["actionInput"]>
  : UpdateItemHook["actionInput"];

export default useUpdateItem as UseUpdateItem<typeof handler>;

export const handler = {
  fetchOptions: {
    query: checkoutLineItemUpdateMutation,
  },
  async fetcher({
    input: { itemId, item },
    options,
    fetch,
  }: HookFetcherContext<UpdateItemHook>) {
    if (Number.isInteger(item.quantity)) {
      // Also allow the update hook to remove an item if the quantity is lower than 1
      if (item.quantity! < 1) {
        return removeItemHandler.fetcher({
          options: removeItemHandler.fetchOptions,
          input: { itemId },
          fetch,
        });
      }
    } else if (item.quantity) {
      throw new ValidationError({
        message: "The item quantity has to be a valid integer",
      });
    }
    const { checkoutLineItemsUpdate } = await fetch<
      Mutation,
      MutationCheckoutLineItemsUpdateArgs
    >({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItems: [
          {
            id: itemId,
            quantity: item.quantity,
          },
        ],
      },
    });

    return checkoutToCart(checkoutLineItemsUpdate);
  },
  useHook:
    ({ fetch }: MutationHookContext<UpdateItemHook>) =>
    <T extends LineItem | undefined = undefined>(
      ctx: {
        item?: T;
        wait?: number;
      } = {}
    ) => {
      const { item } = ctx;
      const { mutate } = useCart() as any;

      return useCallback(
        debounce(async (input: UpdateItemActionInput<T>) => {
          const itemId = input.id ?? item?.id;
          if (!itemId || input.quantity == null) {
            throw new ValidationError({
              message: "Invalid input used for this operation",
            });
          }

          const data = await fetch({
            input: {
              item: {
                quantity: input.quantity,
              },
              itemId,
            },
          });
          await mutate(data, false);
          return data;
        }, ctx.wait ?? 500),
        [fetch, mutate]
      );
    },
};

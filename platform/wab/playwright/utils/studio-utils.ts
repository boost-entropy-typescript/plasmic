import { FrameLocator, Page, expect } from "@playwright/test";

export interface ExpectedFormItem {
  label: string;
  name: string;
  type: string;
  value?: any;
}

export async function getComponentUuid(
  page: Page,
  componentName: string
): Promise<string | null> {
  return page.evaluate((name: string) => {
    const win = window as any;
    if (win.dbg && win.dbg.studioCtx) {
      const component = win.dbg.studioCtx.site.components.find(
        (c: any) => c.name === name
      );
      return component?.uuid;
    }
    return null;
  }, componentName);
}

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export async function checkFormValues(
  expectedFormItems: ExpectedFormItem[],
  root: FrameLocator
) {
  for (const item of clone(expectedFormItems)) {
    if (item.type !== "Checkbox") {
      const labelByText = root.locator(`text=${item.label}`).first();
      await expect(labelByText).toBeVisible({ timeout: 15000 });
    }
    if (item.value) {
      const valueStr = String(item.value);

      if (item.type === "Text Area") {
        const textarea = root.locator(`textarea[name="${item.name}"]`);
        await expect(textarea).toHaveValue(valueStr);
      } else if (item.type === "Select") {
        // Handle Select type
      } else if (item.type === "Checkbox") {
        const checkbox = root.locator(
          `input[type="checkbox"][name="${item.name}"]`
        );
        await expect(checkbox).toBeChecked();
      } else if (item.type === "Radio Group") {
        await expect(
          root.locator(`input[type="radio"][value="${item.value}"]`)
        ).toBeChecked();
      } else if (item.type === "DatePicker") {
        // Handle DatePicker type
      } else {
        const input = root.locator(`input[name="${item.name}"]`);
        await expect(input).toHaveValue(valueStr);
      }
    }
  }
}

export async function updateFormValuesInLiveMode(
  newValues: {
    inputs?: Record<string, any>;
    selects?: Record<string, any>;
    radios?: Record<string, any>;
  },
  root: FrameLocator,
  _page?: any
) {
  const { inputs = {}, selects: _selects = {}, radios = {} } = newValues;

  for (const key in inputs) {
    let input = root.locator(`input[name="${key}"]`);
    const inputCount = await input.count();

    if (inputCount === 0) {
      input = root.locator(`textarea[name="${key}"]`);
    }

    await input.waitFor({ timeout: 1000 });

    let valueToType = inputs[key];
    if (
      typeof valueToType === "string" &&
      valueToType.startsWith("{selectall}{del}")
    ) {
      valueToType = valueToType.replace("{selectall}{del}", "");
      await input.click();
      await input.press("Control+a");
      await input.press("Delete");
    } else {
      await input.clear();
    }

    await input.fill(valueToType);
  }

  for (const key in radios) {
    await root.locator(`input[type="radio"][value="${radios[key]}"]`).click();
  }
}

export function getFormValue(expectedFormItems: ExpectedFormItem[]): string {
  const values = Object.fromEntries(
    expectedFormItems
      .filter((formItem) => formItem.value != null)
      .map((formItem) => [formItem.name, formItem.value])
  );
  return JSON.stringify(values, Object.keys(values).sort());
}

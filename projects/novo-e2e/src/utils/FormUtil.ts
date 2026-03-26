import { asyncForEach, failureMessage } from './AutomationHelpers';
import { retry } from './RetryUtil';
import {
  automationId,
  checkBox,
  clearPickerButton,
  control,
  controlInput,
  ControlType,
  elements,
  frame,
  keyboardKeys,
  radioButton,
  selectInput,
  selectOption,
  switchControl,
  textAreaControl,
  tile,
} from './SelectorUtil';
import { sleep } from './SleepUtil';
import { getElement, getElementCount } from './GetElementUtil';
import {
  getAttribute,
  getElementText,
  isPresent,
} from './ElementPropertiesUtil';
import {
  clearInputAndSendKeys,
  click,
  clickIfPresent,
  sendKeys,
  sendKeysWithoutElement,
} from './ElementActionUtil';
import {
  wait,
  waitForElementAbsenceOrXSeconds,
  waitForElementToBeClickable,
} from './WaitUtil';

export type AllowedKey = string | number | boolean;
export type FormValue = AllowedKey | AllowedKey[] | { [key: string]: AllowedKey | AllowedKey[] };
export type FieldNamesToFormValues = { [key: string]: FormValue };
export type FormValues = FieldNamesToFormValues | FieldNamesToFormValues[];

export async function setFormValues(values: FormValues, appendText = false): Promise<void> {
  const formArray: FieldNamesToFormValues[] = Array.isArray(values) ? values : [values];
  await asyncForEach(formArray, async (form, index) => {
    return await asyncForEach(Object.keys(form), async (fieldName) => {
      const value = form[fieldName];
      // Support one-level deep nesting of objects - send over addresses as: 'secondaryAddress.city'
      if (isObject(value)) {
        return await asyncForEach(Object.keys(value), async (nestedField) => {
          return await setFormValue(`${fieldName}.${nestedField}`, value[nestedField], appendText, index);
        });
      }
      return await setFormValue(fieldName, value, appendText, index);
    });
  });

  // Introduce a small wait time after filling out all form values, just long enough to prepare novo for saving the form.
  await sleep(500);
}

async function setFormValue(fieldName: string, value: AllowedKey | AllowedKey[], appendText = false, index = 0): Promise<void> {
  const valueArray: AllowedKey[] = Array.isArray(value) ? value : [value];
  // Determine the element-specific index of the control on the screen in order to pass the index along to the specific set method
  const controlTypes = [];
  for (let i = 0; i <= index; i++) {
    const controlType = await getControlType(fieldName, i);
    controlTypes.push(controlType);
  }
  const currentControlType = controlTypes.pop();
  const controlSpecificTypes = controlTypes.filter((controlType) => controlType === currentControlType);
  const elementSpecificIndex = controlSpecificTypes.length;
  switch (currentControlType) {
    case ControlType.date:
    case ControlType.dateTime:
    case ControlType.picker:
    case ControlType.time:
      await asyncForEach(valueArray, async (key, i) => {
        await setPickerValue(fieldName, key, elementSpecificIndex, i === 0 && !appendText, currentControlType);
      });
      break;
    case ControlType.checkbox:
      await click(checkBox(fieldName));
      break;
    case ControlType.radio:
      await click(radioButton(fieldName, valueArray[0], false), elementSpecificIndex);
      break;
    case ControlType.select:
      await asyncForEach(valueArray, async (key) => {
        await setSelectValue(fieldName, key, elementSpecificIndex);
        await sendKeysWithoutElement(keyboardKeys.escape);
      });
      break;
    case ControlType.switch:
      const switchState = await getAttribute(switchControl(fieldName), 'aria-checked');
      if (valueArray[0].toString() !== switchState) {
        await click(`${switchControl(fieldName)} div.novo-switch-container`);
      }
      break;
    case ControlType.textarea:
      await sendFormValueKeys(textAreaControl(fieldName), value, appendText, elementSpecificIndex);
      break;
    case ControlType.tiles:
      await click(tile(fieldName, valueArray[0]), elementSpecificIndex);
      break;
    case ControlType.chipList:
      const keyArrayForTextInput = appendText ? valueArray : [keyboardKeys.clear, ...valueArray];
      const revisedKeyArray = keyArrayForTextInput.flatMap((entry, i) => {
        if (i === 0 && !appendText) {
          return entry;
        }
        return [entry, keyboardKeys.enter];
      });
      await sendKeysWithKeyboardKeys(controlInput(fieldName), revisedKeyArray, elementSpecificIndex);
      break;
    default:
      // Default for all fields that accept text entry
      await sendFormValueKeys(controlInput(fieldName), value, appendText, elementSpecificIndex);
      break;
  }

  // Introduce a small wait time after filling out form value, just long enough for field interactions
  // to fire, which happen after a 300 millisecond timeout.
  await sleep(300);
}

async function sendFormValueKeys(selector: string, keyValues: AllowedKey | AllowedKey[], appendText: boolean, index): Promise<void> {
  if (Array.isArray(keyValues)) {
    const keysFromAllowedKey: string[] = keyValues.map((keyValue) => {
      return keyValue.toString();
    });
    const keysToSend: string[] = appendText ? keysFromAllowedKey : [keyboardKeys.clear, ...keysFromAllowedKey];
    await sendKeysWithKeyboardKeys(selector, keysToSend, index);
  } else {
    if (appendText) {
      await sendKeys(selector, keyValues.toString(), index);
    } else {
      await clearInputAndSendKeys(selector, keyValues.toString(), index);
    }
  }
}

export async function sendKeysWithKeyboardKeys(selector: string, value: AllowedKey | AllowedKey[], index: number = 0): Promise<void> {
  const keysToSend: any[] = Array.isArray(value) ? value : [value];
  const convKeysToSend = keysToSend.map((key) => {
    return key.toString();
  });
  const elem = await getElement(selector, index);
  await browser.action('pointer').move({origin: elem}).down().up().perform();
  await browser.keys(convKeysToSend);
}

export async function getControlType(fieldName: string, index: number = 0): Promise<ControlType> {
  return retry(
    async () => {
      // If the field is an address block, then get the type of that field
      const el: WebdriverIO.Element = (await isPresent(control(fieldName), index))
        ? await getElement(control(fieldName), index)
        : await getElement(control(fieldName.split('.')[0]), index);

      // Allow for overrides coming from novo when necessary
      const override = (await el.getAttribute('data-control-type-override')) as ControlType;
      return override || ((await el.getAttribute('data-control-type')) as ControlType);
    },
    async () => {
      failureMessage(`Cannot locate the ${fieldName} form control`);
    },
  );
}

export async function setPickerValue(fieldName: string, value: string = '', index = 0, clearFirst = true, controlType?: ControlType): Promise<void> {
  // Explicit null value (provided by caller) will leave the field empty without any text entry
  if (value === null) {
    await clickIfPresent(clearPickerButton(fieldName), index);
    await getElement(controlInput(fieldName));
    return;
  }

  await enterPickerIfValueNotNull(clearFirst, fieldName, value, index);
  const pickerOptionWasPresentAndClicked =
    await clickIfPresent(`${frame.overlay} ${automationId(value)}`);

  if (!pickerOptionWasPresentAndClicked) {
    if (controlType === ControlType.picker) {
      // Handle occasional case where picker does not show results the first time a value is entered
      await reenterPickerValueIfNoOptions(fieldName, value, index);

      try {
        await waitForSpecificOptionToBeFirst(value);
        await click(`${frame.overlay} ${elements.picker.item}`);
      } catch (errorFromWaitingForSpecificOption) {
        // If specific picker option is not in results after timeout, proceed with the first option
        console.warn(errorFromWaitingForSpecificOption);
        await click(`${frame.overlay} ${elements.picker.item}`);
      }
    }

    // Hit enter if picker dropdown overlay is still present
    await waitForElementAbsenceOrXSeconds(frame.overlay, 13000);
    if (await isPresent(frame.overlay)) {
      await sendKeysWithoutElement(keyboardKeys.enter);
    }
  }

  // Attempt to close the picker dropdown overlay if it's still open
  if (await isPresent(frame.overlay)) {
    await sendKeysWithoutElement(keyboardKeys.escape);
  }
}

async function waitForSpecificOptionToBeFirst(value: string): Promise<void> {
  await wait(async () => {
    console.info(`Waiting for ${value} to be the first option in the picker`);
    const firstOptionText: string =
      await getElementText(`${frame.overlay} ${elements.picker.item} ${elements.picker.itemTitle},.list-item`);
    const pickerOptionsCount: number = await getElementCount(`${frame.overlay} ${elements.picker.item}`);
    if (firstOptionText.includes(value) || pickerOptionsCount === 1) {
      return true;
    }
  }, 15000, `The picker item for ${value} was never in the dropdown, picking first option`);
}

export async function enterPickerIfValueNotNull(clearFirst: boolean, fieldName: string, value: string, index: number): Promise<void> {
  if (clearFirst) {
    await clearInputAndSendKeys(controlInput(fieldName), value, index);
  } else {
    await sendKeys(controlInput(fieldName), value, index);
  }

  await sleep();
  await waitForElementAbsenceOrXSeconds(`${frame.overlay} ${frame.loading}`, 8000);
}

export async function setSelectValue(fieldName: string, value: string | number = '', index = 0): Promise<void> {
  return retry(async () => {
    await click(selectInput(fieldName, false), index);
    await click(selectOption(value));
  }, async () => {
    failureMessage(`Cannot set ${fieldName} select value: '${value}'`);
  });
}

async function reenterPickerValueIfNoOptions(fieldName: string, value: string, index: number): Promise<void> {
  await retry(async () => {
    await waitForElementToBeClickable(`${frame.overlay} ${elements.picker.item}`, 30000);
  }, async () => {
    await clickIfPresent(clearPickerButton(fieldName), index);
    await clearInputAndSendKeys(controlInput(fieldName), value, index);
  }, 2);
}

export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

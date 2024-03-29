import { isBool, isObject } from '@cc-heart/utils'

/**
 * Adds one or more class names to the class list of the given element.
 *
 * @param el - The element to which the class names will be added.
 * @param classNames - The class names to be added.
 */
export function addClassName(el: Element, ...classNames: string[]): void {
  el.classList.add(...classNames)
}

/**
 * Removes one or more class names from the class list of the given element.
 *
 * @param el - The element from which the class name will be removed.
 * @param classNames - The class names to be removed.
 */
export function removeClassName(el: Element, ...classNames: string[]): void {
  el.classList.remove(...classNames)
}

/**
 * @description add element style attribute for example:
 * addStyles(document.body, { color: 'ff0' })
 * @param { Element } el
 * @param el
 * @param styles
 */
export function addStyles(el: HTMLElement, styles: Record<string, unknown>) {
  Object.assign(el.style, styles)
}

/**
 * @description remove element style attribute
 * @param { Element } el
 * @param { String | String[] } styles
 **/
export function removeStyles(el: HTMLElement, styles: string | string[]): void {
  if (typeof styles === 'string') {
    Reflect.set(el.style, styles, '')
  } else {
    styles.forEach((key) => {
      Reflect.set(el.style, key, '')
    })
  }
}

/**
 * @description get element style attribute value
 * @param { Element } el
 * @param { String | null } styles
 * @returns { String | null }
 */
export function getStyles(el: HTMLElement, styles: string): string | null {
  if (!el || !styles) return null
  if (styles === 'float') {
    styles = 'cssFloat'
  }
  return Reflect.get(el.style, styles)
}

/**
 * Generates a string of class names from the provided arguments.
 *
 * @param {...(string | boolean | number | string[] | Record<string, any>)[]} params - The arguments can be a mix of strings, numbers, booleans, arrays of strings, or objects.
 * Strings, numbers, and truthy booleans are added directly to the class names.
 * Arrays are flattened and their string elements are added to the class names.
 * Objects are treated as {className: condition} pairs; class names with truthy conditions are added.
 *
 * @returns {string} A string of class names separated by spaces.
 */
export function classNames(
  ...params: (string | boolean | number | string[] | Record<string, any>)[]
) {
  return params
    .reduce<string[]>((acc, cur) => {
      if (Array.isArray(cur)) {
        return [...acc, ...cur.filter(Boolean)]
      }

      if (isObject(cur)) {
        return [
          ...acc,
          ...Object.entries(cur)
            .filter(([, value]) => value)
            .map(([key]) => key),
        ]
      }

      if (isBool(cur) && !cur) return acc

      return [...acc, cur]
    }, [])
    .join(' ')
}

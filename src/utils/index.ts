import clsx, {ClassValue as CV} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...args: CV[]) {
  return twMerge(clsx(args));
}

export function resolveClassName(
  baseClassName: string,
  addtlClassName?: string[] | string,
) {
  return cn(
    baseClassName,
    Array.isArray(addtlClassName) ? addtlClassName.join(' ') : addtlClassName,
  );
}

export {type ClassValue} from 'clsx';

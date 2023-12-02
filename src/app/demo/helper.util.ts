import {Option} from "../models/option.interface";

export function getDummyOptions(count: number): Option[] {
  return Array.from({length: count}).map((_, index) => ({id: index + 1, name: `Option ${index + 1}`}));
}

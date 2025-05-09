import { AbstractControl } from '@angular/forms';

export function getFieldValue(fGroup: AbstractControl, cName: string): string {
  return fGroup.get(cName)?.value?.name ?? fGroup.get(cName)?.value ?? '';
}

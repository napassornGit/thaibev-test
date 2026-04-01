import { FormControl, FormGroup } from "@angular/forms";

export interface IPersonInfo {
    id: string;
    name: string;
    lastName: string;
    address: string;
    birthDate: string;
    birthDateText: string;
    age: number;
}

export type PersonFormGroup = FormGroup<{
    id: FormControl<string>;
    name: FormControl<string>;
    lastName: FormControl<string>;
    address: FormControl<string>;
    birthDate: FormControl<Date>;
    age: FormControl<string>;
}>;
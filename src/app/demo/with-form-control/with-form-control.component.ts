import {Component} from '@angular/core';
import {SelectComponent} from "../../components/select/select.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {getDummyOptions} from "../helper.util";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'ghg-with-form-control',
  standalone: true,
  imports: [
    SelectComponent,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './with-form-control.component.html',
  styleUrl: './with-form-control.component.scss'
})
export class WithFormControlComponent {
  items = getDummyOptions(1000);
  select: FormControl<number | null> = new FormControl(3);
}

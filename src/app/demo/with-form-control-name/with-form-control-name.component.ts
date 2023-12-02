import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {SelectComponent} from "../../components/select/select.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {getDummyOptions} from "../helper.util";

@Component({
  selector: 'ghg-with-form-control-name',
  standalone: true,
  imports: [
    JsonPipe,
    SelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './with-form-control-name.component.html',
  styleUrl: './with-form-control-name.component.scss'
})
export class WithFormControlNameComponent {
  items = getDummyOptions(4);

  form = new FormGroup({
    select: new FormControl()
  })
}

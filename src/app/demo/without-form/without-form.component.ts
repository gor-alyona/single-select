import { Component } from '@angular/core';
import {getDummyOptions} from "../helper.util";
import {JsonPipe} from "@angular/common";
import {SelectComponent} from "../../components/select/select.component";

@Component({
  selector: 'ghg-without-form',
  standalone: true,
  imports: [
    JsonPipe,
    SelectComponent
  ],
  templateUrl: './without-form.component.html',
  styleUrl: './without-form.component.scss'
})
export class WithoutFormComponent {
  items = getDummyOptions(400);
  value: number | null = 5;
}

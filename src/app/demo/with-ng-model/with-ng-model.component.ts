import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {SelectComponent} from "../../components/select/select.component";
import {getDummyOptions} from "../helper.util";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'ghg-with-ng-model',
  standalone: true,
  imports: [
    JsonPipe,
    SelectComponent,
    FormsModule
  ],
  templateUrl: './with-ng-model.component.html',
  styleUrl: './with-ng-model.component.scss'
})
export class WithNgModelComponent {
  items = getDummyOptions(400);
  value = 10;
  visibleItemsCount = 5;
}

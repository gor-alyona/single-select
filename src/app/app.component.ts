import {Component} from '@angular/core';
import {NgComponentOutlet, NgFor} from '@angular/common';
import {WithFormControlComponent} from "./demo/with-form-control/with-form-control.component";
import {trackByTitle} from "./utils/helper.util";
import {VISIBLE_ITEMS_COUNT} from "./tokens/tokens";
import {WithFormControlNameComponent} from "./demo/with-form-control-name/with-form-control-name.component";
import {WithNgModelComponent} from "./demo/with-ng-model/with-ng-model.component";
import {WithoutFormComponent} from "./demo/without-form/without-form.component";

@Component({
  selector: 'ghg-root',
  standalone: true,
  imports: [NgComponentOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {provide: VISIBLE_ITEMS_COUNT, useValue: 7}
  ]
})
export class AppComponent {
  readonly trackByTitle = trackByTitle;
  demos = [
    {
      title: 'With form control',
      component: WithFormControlComponent
    },
    {
      title: 'With form control name',
      component: WithFormControlNameComponent
    },
    {
      title: 'With ng model',
      component: WithNgModelComponent
    },
    {
      title: 'Without form',
      component: WithoutFormComponent
    }
  ]
}

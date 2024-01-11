import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ConfigurationService } from '../../../services';
import { StepperComponent } from '../stepper/stepper.component';

@Component({
  selector: 'app-configurator-layout',
  standalone: true,
  imports: [RouterOutlet, StepperComponent],
  templateUrl: './configurator-layout.component.html',
  styleUrls: ['./configurator-layout.component.scss']
})
export class ConfiguratorLayoutComponent {

  constructor(private readonly configuratorService: ConfigurationService) { }

  get modelSelection() {
    return this.configuratorService.modelSubject.value;
  }

  get modelImage() {
    return `https://interstate21.com/tesla-app/images/${this.modelSelection?.model.code}/${this.modelSelection?.colorCode}.jpg`;
  }

}

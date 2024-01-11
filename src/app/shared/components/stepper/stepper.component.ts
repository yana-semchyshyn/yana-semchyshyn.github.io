import { Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfigurationService } from '../../../services';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, OnDestroy {

  configsStepDisabled = true;
  summaryStepDisabled = true;

  private subscription$ = new Subscription();

  constructor(private readonly configuratorService: ConfigurationService) { }

  ngOnInit() {
    this.subscription$.add(
      this.configuratorService.modelSubject.subscribe(model => this.configsStepDisabled = !model)
    )

    this.subscription$.add(
      this.configuratorService.configsSubject.subscribe(configs => this.summaryStepDisabled = !configs)
    )
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}

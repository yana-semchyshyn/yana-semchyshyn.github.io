import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

import { ConfigsSelectionModel, ModelSelectionModel } from '../../models';
import { ConfigurationService } from '../../services';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  readonly additionalPackagePrice = 1000;

  modelSelection!: ModelSelectionModel;
  configsSelection!: ConfigsSelectionModel;

  get selectedColor() {
    return this.modelSelection?.model?.colors?.find(item => item?.code === this.modelSelection?.colorCode);
  }

  constructor(
    private readonly router: Router,
    private readonly configurationService: ConfigurationService
  ) { }

  ngOnInit() {
    const model = this.configurationService.modelSubject.value;
    const configs = this.configurationService.configsSubject.value;

    if (model) {
      this.modelSelection = model;
    } else {
      this.router.navigateByUrl('/design/model-selection');
    }

    if (configs) {
      this.configsSelection = configs;
    }
  }

  getTotalPrice() {
    let total = this.configsSelection.config.price;

    if (this.selectedColor?.price) {
      total += this.selectedColor.price;
    }

    if (this.configsSelection.towHitch) {
      total += this.additionalPackagePrice;
    }

    if (this.configsSelection.yoke) {
      total += this.additionalPackagePrice;
    }

    return total;
  }

}

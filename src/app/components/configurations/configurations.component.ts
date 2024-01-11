import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConfigsSelectionModel, ModelOptionModel } from '../../models';
import { ConfigurationService } from '../../services';

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {

  optionsObserver!: Promise<ModelOptionModel>;
  options!: ModelOptionModel;

  configId: number | null = null;
  includeTow = false;
  includeYoke = false;

  get selectedConfig() {
    return this.options.configs?.find(item => item.id === this.configId);
  }

  constructor(
    private readonly router: Router,
    private readonly configurationService: ConfigurationService
  ) { }

  ngOnInit() {
    const selectedModel = this.configurationService.modelSubject.value;
    const modelCode = selectedModel?.model.code;

    if (modelCode) {
      this.configurationService.getModelOptions(modelCode).then(options => this.options = options);
    } else {
      this.router.navigateByUrl('design/model-selection');
    }

    this.setSelectedOptions();
  }

  saveSelection() {
    if (!this.selectedConfig) {
      return;
    }

    const selection = {
      config: this.selectedConfig,
      towHitch: this.includeTow,
      yoke: this.includeYoke
    } as ConfigsSelectionModel;

    this.configurationService.configsSubject.next(selection);
  }

  private setSelectedOptions() {
    const selection = this.configurationService.configsSubject.value;

    if (selection) {
      this.configId = selection.config.id;
      this.includeTow = selection.towHitch;
      this.includeYoke = selection.yoke;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TeslaModelModel, ModelSelectionModel } from '../../models';
import { ConfigurationService } from '../../services';

@Component({
  selector: 'app-model-selection',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './model-selection.component.html',
  styleUrls: ['./model-selection.component.scss']
})
export class ModelSelectionComponent implements OnInit {

  modelsObserver!: Promise<TeslaModelModel[]>;
  models!: TeslaModelModel[];

  modelCode: string | null = null;
  colorCode: string | null = null;

  get selectedModel() {
    return this.models?.find(item => item.code === this.modelCode);
  }

  constructor(private readonly configurationService: ConfigurationService) { }

  ngOnInit() {
    this.modelsObserver = this.configurationService.getModels();
    this.modelsObserver.then(models => this.models = models);

    this.setSelectedOptions();
  }

  modelSelected() {
    this.colorCode = this.selectedModel ? this.selectedModel?.colors[0]?.code : null;
    this.saveSelection();

    if (this.configurationService.configsSubject.value) {
      this.configurationService.configsSubject.next(null);
    }
  }

  saveSelection() {
    const selection = {
      model: this.selectedModel,
      colorCode: this.colorCode
    } as ModelSelectionModel;

    this.configurationService.modelSubject.next(selection);
  }

  private setSelectedOptions() {
    const selection = this.configurationService.modelSubject.value;

    if (selection) {
      this.modelCode = selection.model.code;
      this.colorCode = selection.colorCode;
    }
  }

}

import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { TeslaModelModel, ModelSelectionModel, ModelOptionModel, ConfigsSelectionModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {

  modelSubject = new BehaviorSubject<ModelSelectionModel | null>(null);
  configsSubject = new BehaviorSubject<ConfigsSelectionModel | null>(null);

  constructor() { }

  async getModels(): Promise<TeslaModelModel[]> {
    const models = await fetch("/models");
    return models.json();
  }

  async getModelOptions(code: string): Promise<ModelOptionModel> {
    const options = await fetch(`/options/${code}`);
    return options.json();
  }

}

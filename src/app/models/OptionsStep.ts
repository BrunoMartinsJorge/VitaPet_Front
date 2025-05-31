export class OptionStepModel {
  label: string;
  icon: string;
  active: boolean;
  constructor(label: string, icon: string, active: boolean) {
    this.label = label;
    this.icon = icon;
    this.active = active;
  }
}

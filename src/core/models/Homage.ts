import { HomageData, HomageType } from '@types/index';

/**
 * Model de Homenagem
 * Representa uma homenagem completa
 */
export class Homage implements HomageData {
  id: string;
  type: HomageType;
  templateId: string;
  fields: Map<string, any>;
  createdAt: Date;
  updatedAt: Date;
  premium: boolean;

  constructor(
    type: HomageType,
    templateId: string,
    premium: boolean = false
  ) {
    this.id = `homage_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.type = type;
    this.templateId = templateId;
    this.fields = new Map();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.premium = premium;
  }

  /**
   * Define valor de um campo
   */
  setField(fieldId: string, value: any): void {
    this.fields.set(fieldId, value);
    this.updatedAt = new Date();
  }

  /**
   * Retorna valor de um campo
   */
  getField(fieldId: string): any {
    return this.fields.get(fieldId);
  }

  /**
   * Retorna se a homenagem está completa
   */
  isComplete(): boolean {
    return this.fields.size > 0;
  }

  /**
   * Serializa para JSON
   */
  toJSON(): Record<string, any> {
    return {
      id: this.id,
      type: this.type,
      templateId: this.templateId,
      fields: Object.fromEntries(this.fields),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      premium: this.premium,
    };
  }
}

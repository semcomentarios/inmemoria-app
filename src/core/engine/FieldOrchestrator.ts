import { FieldDefinition, FieldValue, ValidationResult } from '@types/index';

/**
 * FieldOrchestrator
 * Gerencia campos dinâmicos, dependências e cálculos automáticos
 * Permite alterações cirúrgicas fáceis na estrutura de campos
 */
export class FieldOrchestrator {
  private fields: Map<string, FieldDefinition> = new Map();
  private values: Map<string, any> = new Map();
  private dependencies: Map<string, string[]> = new Map();
  private calculatedFields: Map<string, (values: Map<string, any>) => any> = new Map();
  private listeners: Set<(id: string, value: any) => void> = new Set();

  /**
   * Registra um campo novo
   */
  registerField(definition: FieldDefinition): void {
    this.fields.set(definition.id, definition);
    
    if (definition.dependsOn) {
      this.dependencies.set(definition.id, definition.dependsOn);
    }
  }

  /**
   * Atualiza valor de um campo e dispara cálculos dependentes
   */
  updateField(fieldId: string, value: any): void {
    this.values.set(fieldId, value);
    this.triggerDependents(fieldId);
    this.notifyListeners(fieldId, value);
  }

  /**
   * Registra um campo calculado (ex: idade automática)
   */
  registerCalculatedField(
    fieldId: string,
    calculator: (values: Map<string, any>) => any
  ): void {
    this.calculatedFields.set(fieldId, calculator);
  }

  /**
   * Triggers dependents quando um campo muda
   */
  private triggerDependents(fieldId: string): void {
    // Encontra todos os campos que dependem deste
    this.dependencies.forEach((deps, targetFieldId) => {
      if (deps.includes(fieldId)) {
        const calculator = this.calculatedFields.get(targetFieldId);
        if (calculator) {
          const newValue = calculator(this.values);
          this.values.set(targetFieldId, newValue);
          this.notifyListeners(targetFieldId, newValue);
        }
      }
    });
  }

  /**
   * Valida todos os campos ou um específico
   */
  validate(fieldId?: string): ValidationResult {
    const errors: Record<string, string> = {};
    const fieldsToValidate = fieldId
      ? [this.fields.get(fieldId)]
      : Array.from(this.fields.values());

    fieldsToValidate.forEach((field) => {
      if (!field) return;

      if (field.required && !this.values.get(field.id)) {
        errors[field.id] = `${field.label} é obrigatório`;
      }

      if (field.validation) {
        const value = this.values.get(field.id);
        if (value && !field.validation(value)) {
          errors[field.id] = `${field.label} é inválido`;
        }
      }
    });

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Retorna todos os valores dos campos
   */
  getAllValues(): Map<string, any> {
    return new Map(this.values);
  }

  /**
   * Retorna valor de um campo específico
   */
  getFieldValue(fieldId: string): any {
    return this.values.get(fieldId);
  }

  /**
   * Limpa todos os campos
   */
  clear(): void {
    this.values.clear();
  }

  /**
   * Subscribe para mudanças de campo
   */
  subscribe(listener: (fieldId: string, value: any) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(fieldId: string, value: any): void {
    this.listeners.forEach((listener) => {
      listener(fieldId, value);
    });
  }
}

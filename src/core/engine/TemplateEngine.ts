import { Template, HomageData, LayoutType, HomageType } from '@types/index';

/**
 * TemplateEngine
 * Gerencia templates, validação de campos por template
 * Permite trocar templates sem perder dados
 */
export class TemplateEngine {
  private templates: Map<string, Template> = new Map();

  /**
   * Registra um template
   */
  registerTemplate(template: Template): void {
    this.templates.set(template.id, template);
  }

  /**
   * Retorna template por ID
   */
  getTemplate(templateId: string): Template | undefined {
    return this.templates.get(templateId);
  }

  /**
   * Retorna todos os templates de um tipo específico
   */
  getTemplatesByType(type: HomageType): Template[] {
    return Array.from(this.templates.values()).filter((t) => t.type === type);
  }

  /**
   * Retorna templates por layout
   */
  getTemplatesByLayout(layout: LayoutType): Template[] {
    return Array.from(this.templates.values()).filter((t) => t.layout === layout);
  }

  /**
   * Valida se dados são compatíveis com template
   */
  validateDataForTemplate(template: Template, data: HomageData): boolean {
    const requiredFields = template.fields.filter((f) => f.required);
    
    return requiredFields.every((field) => {
      const value = data.fields.get(field.id);
      return value !== undefined && value !== null && value !== '';
    });
  }

  /**
   * Detecta campos que serão perdidos ao trocar template
   */
  detectFieldMismatches(
    currentTemplate: Template,
    newTemplate: Template
  ): { lost: string[]; gained: string[] } {
    const currentFieldIds = new Set(currentTemplate.fields.map((f) => f.id));
    const newFieldIds = new Set(newTemplate.fields.map((f) => f.id));

    const lost = Array.from(currentFieldIds).filter((id) => !newFieldIds.has(id));
    const gained = Array.from(newFieldIds).filter((id) => !currentFieldIds.has(id));

    return { lost, gained };
  }

  /**
   * Mapeia dados de um template para outro (compatíveis)
   */
  mapDataBetweenTemplates(
    data: HomageData,
    currentTemplate: Template,
    newTemplate: Template
  ): HomageData {
    const newData = new Map(data.fields);
    const { lost } = this.detectFieldMismatches(currentTemplate, newTemplate);

    // Remove campos que não existem no novo template
    lost.forEach((fieldId) => {
      newData.delete(fieldId);
    });

    return {
      ...data,
      templateId: newTemplate.id,
      fields: newData,
      updatedAt: new Date(),
    };
  }
}

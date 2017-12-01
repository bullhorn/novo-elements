/**
 * Basic Utility for common Entity functions
 */
export declare class EntityUtils {
    static readonly ENTITY_TYPES: string[];
    static readonly PERSON_SUBTYPES: string[];
    static readonly ENTITY_SHORT_NAMES: any;
    static readonly ENTITY_LONG_NAMES: any;
    static readonly ENTITY_LUCENE_QUERY_NAMES: any;
    static readonly ENTITY_LUCENE_QUERY_NAMES_PLURAL: any;
    static readonly NOTE_LUCENE_QUERY_NAMES: any;
    static readonly ENTITY_ICONS: any;
    static readonly ENTITY_ICONS_FROM_PATH: any;
    static getShortName(name: string): string;
    static getLuceneName(name: string): string;
    static getNoteLuceneName(name: string): string;
    static getLongName(name: string): string;
    static getIcon(longName: string): string;
    static getNameForResult(result: any): string;
    static getEntityLabel(item: any, entity: string): string;
    static getEntityThemeColor(entity: string): string;
    static getAssociationName(entityType: string): string;
    static formatSubject(entity: string, id: any, title: string): string;
}

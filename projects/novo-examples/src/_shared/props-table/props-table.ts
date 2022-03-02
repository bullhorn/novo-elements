// NG2
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

interface PropType {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

interface PropTypeDeclaration {
  name?: string;
  type: string;
  types: { type: string; value: string }[];
  elementType?: { name: string; type: string };
}
interface PropertyDeclartion {
  name: string;
  kindString: string;
  decorators: any[];
  type: PropTypeDeclaration;
  defaultValue: string;
  comment: {
    shortText: string;
    tags?: { tag: string; text: string }[];
  };
  getSignature?: Omit<PropertyDeclartion, 'getSignature'>;
}

@Component({
  selector: 'props-table',
  templateUrl: './props-table.html',
  styleUrls: ['./props-table.scss'],
  host: { class: 'props-table' },
  encapsulation: ViewEncapsulation.None,
})
export class PropsTableComponent implements OnInit {
  @Input()
  component: string;

  @Input()
  kinds: string[] = ['Input'];

  props: PropType[] = [];

  ngOnInit() {
    fetch('/assets/documentation.json')
      .then((response) => response.json())
      .then((documentation) => {
        const comp = documentation.children.find((it) => it.name === this.component);
        // Get properties for now, could add methods
        const props: PropertyDeclartion[] = comp.children.filter((p) => p.kindString === 'Property' || p.kindString === 'Accessor');
        const inputs = props.filter((p) => (p.decorators || []).filter((d) => d.name === 'Input').length);
        this.props = inputs.map((p) => {
          switch (p.kindString) {
            case 'Accessor':
              return {
                name: p.name,
                type: this.getType(p.getSignature[0]),
                defaultValue: this.getDefaultValue(p.getSignature[0]),
                description: p.comment ? p.comment.shortText : 'No Description',
              };
            default:
              return {
                name: p.name,
                type: this.getType(p),
                defaultValue: this.getDefaultValue(p),
                description: p.comment ? p.comment.shortText : 'No Description',
              };
          }
        });
      });
  }

  getDefaultValue(p: PropertyDeclartion) {
    if (p.comment?.tags) {
      const hasDefault = p.comment.tags.find((t) => t.tag === 'default');
      if (hasDefault) {
        return hasDefault.text.trim();
      }
    }
    return p.defaultValue || 'none';
  }

  getType(p: PropertyDeclartion) {
    if (p.type?.type === 'array') {
      return `${p.type.elementType.name} []`;
    }

    if (p.type?.type === 'union') {
      return `One of [ ${p.type.types.map((t) => t.value).join(', ')} ]`;
    }
    return p.type.name;
  }
}

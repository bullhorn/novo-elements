// NG2
import { Component, Input, OnInit } from '@angular/core';

let nextUniqueId = 0;
@Component({
  selector: 'novo-hint',
  templateUrl: './hint.html',
  styleUrls: ['./hint.scss'],
  host: {
    class: 'novo-hint',
    '[class.novo-field-hint-end]': 'align === "end"',
    '[attr.id]': 'id',
    // Remove align attribute to prevent it from interfering with layout.
    '[attr.align]': 'null',
  },
})
export class NovoHintElement implements OnInit {
  /** Whether to align the hint label at the start or end of the line. */
  @Input() align: 'start' | 'end' = 'start';

  /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
  @Input() id: string = `novo-hint-${nextUniqueId++}`;

  ngOnInit(): any {}
}

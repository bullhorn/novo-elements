// NG2
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'novo-label',
  templateUrl: './label.html',
  styleUrls: ['./label.scss'],
})
export class NovoLabelElement implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): any {}
}

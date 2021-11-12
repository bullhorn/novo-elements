// NG2
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'novo-avatar',
  styleUrls: ['./Avatar.scss'],
  template: '<img *ngIf="src" [src]="src"/>',
})
export class NovoAvatarElement implements OnInit {
  @Input() source: any;
  @Input() label: string;
  @Input() theme: string;
  @Input() image: string;

  @Input()
  size: string = 'medium';

  @Input()
  shape: string = 'round';

  @Input()
  color: string;

  @HostBinding('class')
  get hb_classBinding() {
    return [`avatar-size-${this.size}`, `avatar-shape-${this.shape}`, `avatar-color-${this.color}`];
  }

  @HostBinding('style.backgroundImage')
  get background(): string {
    if (!this.image && !this.source.profileImage) return;
    return `url(${this.image || this.source.profileImage})`;
  }

  src: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): any {
    let src: any;
    if ((this.source && this.source !== '') || this.label) {
      if (this.source.profileImage) {
        // this.src = this.source.profileImage;
        return;
      } else if (this.source.logo) {
        src = this.source.logo;
      } else {
        const first: any =
          this.label || this.source.firstName
            ? this.source.firstName.charAt(0)
            : this.source.name
            ? this.source.name.charAt(0)
            : this.source.username
            ? this.source.username.charAt(0)
            : '';
        const last: any = this.source.lastName ? this.source.lastName.charAt(0) : '';

        // Defining Colors
        const colors: any = [
          '#1abc9c',
          '#16a085',
          '#f1c40f',
          '#f39c12',
          '#2ecc71',
          '#27ae60',
          '#e67e22',
          '#d35400',
          '#3498db',
          '#2980b9',
          '#e74c3c',
          '#c0392b',
          '#9b59b6',
          '#8e44ad',
          '#bdc3c7',
          '#34495e',
          '#2c3e50',
          '#95a5a6',
          '#7f8c8d',
          '#ec87bf',
          '#d870ad',
          '#f69785',
          '#9ba37e',
          '#b49255',
          '#b49255',
          '#a94136',
        ];
        const lighterColors: any = [
          '#15D6B0',
          '#16A069',
          '#F1D60F',
          '#F3AC12',
          '#2ED85B',
          '#28BC7F',
          '#E66322',
          '#D3002B',
          '#6534DB',
          '#29B2B9',
          '#E73C63',
          '#DB6D31',
          '#CB48B5',
          '#6944AD',
          '#38536D',
          '#3D6473',
          '#394A6C',
          '#92BCB7',
          '#7D99A2',
          '#F14F76',
          '#CB5CDA',
          '#FFB475',
          '#B9CE6E',
          '#DDAA4F',
          '#CD6F45',
          '#B9354A',
        ];
        const settings: any = {
          // Default settings
          textColor: '#ffffff',
          height: 100,
          width: 100,
          fontSize: 50,
          fontWeight: 400,
          fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
        };

        // making the text object
        const colorIndex: any = Math.floor((first.charCodeAt(0) - 65) % colors.length);

        const cobj: any = document.createElement('text');
        cobj.setAttribute('text-anchor', 'middle');
        cobj.setAttribute('x', '50%');
        cobj.setAttribute('y', '50%');
        cobj.setAttribute('dy', '0.35em');
        cobj.setAttribute('pointer-events', 'auto');
        cobj.setAttribute('fill', settings.textColor);
        cobj.setAttribute('font-family', settings.fontFamily);
        cobj.style.fontWeight = settings.fontWeight;
        cobj.style.fontSize = `${settings.fontSize}px`;

        const ltrs: any = document.createTextNode(this.label || first + last);
        cobj.appendChild(ltrs);

        const svg: any = document.createElement('svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('pointer-events', 'none');
        svg.setAttribute('width', settings.width);
        svg.setAttribute('height', settings.height);

        // this.setPrefixedValue(svg, 'background', colors[colorIndex]);
        this.setPrefixedValue(svg, 'background', `linear-gradient(-45deg, ${colors[colorIndex]} 0%, ${lighterColors[colorIndex]} 100%)`);

        svg.style.width = `${settings.width}px`;
        svg.style.height = `${settings.height}px`;
        svg.appendChild(cobj);

        const top: any = document.createElement('div');
        top.appendChild(svg);

        const svgHtml: any = window.btoa(unescape(encodeURIComponent(top.innerHTML)));
        src = `data:image/svg+xml;base64, ${svgHtml}`;
      }
      this.src = this.sanitizer.bypassSecurityTrustUrl(src);
    }
  }

  setPrefixedValue(elm: any, prop: any, value: any): any {
    const prefixes: any = ['-moz-', '-webkit-', '-o-', '-ms-', '-khtml-'];

    // Clear
    elm.style[prop] = '';
    const starting: any = elm.style[prop];

    // Try raw first
    try {
      elm.style[prop] = value;
      if (elm.style[prop] !== starting) {
        return;
      }
    } catch (e) {
      // no op
    }

    // Try prefixes
    for (let i = 0; i < prefixes.length; ++i) {
      const v = prefixes[i] + value;
      try {
        elm.style[prop] = v;
        if (elm.style[prop] !== starting) {
          return;
        }
      } catch (e2) {
        // no op
      }
    }
  }

  private _isValidURL(str: string) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  }
}

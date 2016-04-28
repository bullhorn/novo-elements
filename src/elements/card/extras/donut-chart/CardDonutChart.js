import { Component, ElementRef } from 'angular2/core';

@Component({
    selector: 'novo-card-chart-donut',
    inputs: [
        'value',
        'label',
        'color'
    ],
    template: `
        <aside id="chart-percent-{{ uid }}">
            <!-- COLORED FILL -->
            <svg viewBox="-10 -10 220 220">
                <g fill="none" stroke-width="20" transform="translate(100,100)">
                    <path class="fill" d="M 0,-100 A 100,100 0 0,1 86.6,-50" />
                    <path class="fill" d="M 86.6,-50 A 100,100 0 0,1 86.6,50" />
                    <path class="fill" d="M 86.6,50 A 100,100 0 0,1 0,100" />
                    <path class="fill" d="M 0,100 A 100,100 0 0,1 -86.6,50" />
                    <path class="fill" d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" />
                    <path class="fill" d="M -86.6,-50 A 100,100 0 0,1 0,-100" />
                </g>
            </svg>
            <!-- GREY BEZEL -->
            <svg viewBox="-10 -10 220 220">
                <path id="chart-fill-{{uid}}" d="M200,100 C200,44.771525 155.228475,0 100,0 C44.771525,0 0,44.771525 0,100 C0,155.228475 44.771525,200 100,200 C155.228475,200 200,155.228475 200,100 Z"></path>
            </svg>
        </aside>
    `
})
export class CardDonutChart {
    constructor(element:ElementRef) {
        this.element = element;
        // Geometric number that represents 100% of the chart area
        this.chartFillMax = 629;
        // Unique ID for instance
        this.uid = Math.round(Math.random() * 1000);
        // Prevent Collision
        this.isChartDrawing = false;
    }

    ngOnChanges() {
        if (!this.isChartDrawing) {
            this.drawChart();
        }
    }

    ngOnInit() {
        if (!this.isChartDrawing) {
            this.drawChart();
        }
        this.color = this.color || '#662255';
    }

    drawChart() {
        this.isChartDrawing = true;
        setTimeout(() => {
            let chartContainer = this.element.nativeElement.querySelector(`#chart-percent-${this.uid}`);
            let fillElements = this.element.nativeElement.querySelectorAll('.fill');
            for (let i = 0; i < fillElements.length; i++) {
                fillElements[i].setAttribute('stroke', this.color);
            }
            // Set fill amount
            this.element.nativeElement.querySelector(`#chart-fill-${this.uid}`).setAttribute('stroke-dashoffset', (this.chartFillMax * this.value).toString());
            // Set Text Color
            chartContainer.style.color = this.color;
            // Set percentage for chart
            chartContainer.setAttribute('data-percent', `${(Math.round(this.value * 100)).toString()}%`);
            // Set Label
            chartContainer.setAttribute('data-name', this.label);
            this.isChartDrawing = false;
        });
    }
}

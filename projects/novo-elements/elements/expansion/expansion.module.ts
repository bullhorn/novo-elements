import { CdkAccordionModule } from '@angular/cdk/accordion';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NovoAccordion } from './accordion';
import { NovoExpansionPanel, NovoExpansionPanelActionRow } from './expansion-panel';
import { NovoExpansionPanelContent } from './expansion-panel-content';
import { NovoExpansionPanelDescription, NovoExpansionPanelHeader, NovoExpansionPanelTitle } from './expansion-panel-header';

@NgModule({
  imports: [CommonModule, CdkAccordionModule, PortalModule],
  exports: [
    NovoAccordion,
    NovoExpansionPanel,
    NovoExpansionPanelActionRow,
    NovoExpansionPanelHeader,
    NovoExpansionPanelTitle,
    NovoExpansionPanelDescription,
    NovoExpansionPanelContent,
  ],
  declarations: [
    NovoAccordion,
    NovoExpansionPanel,
    NovoExpansionPanelActionRow,
    NovoExpansionPanelHeader,
    NovoExpansionPanelTitle,
    NovoExpansionPanelDescription,
    NovoExpansionPanelContent,
  ],
})
export class NovoExpansionModule {}

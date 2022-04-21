import { Component } from '@angular/core';

/**
 * @title Tooltip Sizes Example
 */
@Component({
  selector: 'tooltip-sizes-example',
  templateUrl: 'tooltip-sizes-example.html',
  styleUrls: ['tooltip-sizes-example.css'],
})
export class TooltipSizesExample {
  public mediumTooltip: string = `Lorem Ipsum\n\n is simply dummy text of the printing and typesetting industry.`;
  public largeTooltip: string = `Lorem Ipsum\n\n is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
  public extraLargeTooltip: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat nisi at elit molestie, eget dapibus erat mattis. Sed nec est sit amet dolor hendrerit placerat quis vitae sapien. Nulla non consectetur lorem, nec ultricies lacus. Ut maximus eget tortor a bibendum. Vivamus vel mollis magna. Nullam sit amet urna a elit sollicitudin ultrices. Donec scelerisque dolor vel lacus blandit aliquam. Morbi tellus nunc, interdum eget laoreet vitae, tristique a odio. Maecenas ligula nisl, volutpat id augue vel, sollicitudin bibendum massa. Aenean dapibus quam nec ante volutpat, id tincidunt mauris malesuada. Aliquam vitae consectetur justo.

    Nunc vel felis in quam iaculis vulputate eu non erat. Phasellus vel purus eget est elementum tempus a non mauris. Mauris cursus convallis enim, non malesuada felis suscipit vel. Maecenas nec hendrerit erat. Morbi vehicula condimentum mi non gravida. Aenean varius risus arcu. Sed blandit ipsum sit amet tincidunt convallis. Praesent consectetur elementum nisi, sit amet placerat diam commodo at. Vivamus aliquet sagittis libero, id efficitur nisl varius eget. Aenean tempor augue a erat tincidunt hendrerit. Cras et dictum nisl. Sed pulvinar leo quis urna malesuada tincidunt. Sed enim tortor, semper egestas orci pellentesque, scelerisque egestas eros. Aliquam in ex sit amet tortor fringilla convallis.

    Nam ac nulla accumsan, tristique orci tincidunt, condimentum nunc. Fusce eget neque dolor. Vestibulum volutpat, libero non maximus maximus, libero ante semper tellus, et commodo lectus mi nec orci. Donec pretium pharetra cursus. Nam a egestas augue. Sed et condimentum lectus. Sed vel justo semper, convallis ante id, tincidunt nisi. Aliquam non lorem commodo, laoreet diam nec, feugiat dolor.

    Aliquam orci diam, vestibulum et odio id, molestie interdum diam. Donec et molestie mi. Suspendisse potenti. Nam sit amet faucibus nulla. In tincidunt pharetra turpis, fringilla convallis dui scelerisque vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce eget tellus sem. Donec ac maximus massa.

    Aliquam vehicula ligula justo, faucibus semper lorem sodales eu. Fusce nec augue quis diam iaculis dapibus. Cras consectetur eros ut nunc cursus, non laoreet dolor rhoncus. In luctus risus sed nunc feugiat, in imperdiet velit euismod. Curabitur sed nunc dapibus, convallis tortor sit amet, interdum sapien. Donec auctor mauris est, ac molestie diam sagittis id. Curabitur pretium metus et ante tincidunt convallis. Aenean quis mollis nulla.`;
}

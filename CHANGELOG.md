<a name="0.2.4"></a>
## [0.2.4](https://github.com/bullhorn/novo-elements/compare/v0.2.3...v0.2.4) (2016-08-03)


### Features

* **Table:** changed Date filtering to allow multiple or single selection ([#135](https://github.com/bullhorn/novo-elements/issues/135)) ([517d45f](https://github.com/bullhorn/novo-elements/commit/517d45f))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/bullhorn/novo-elements/compare/v0.2.2...v0.2.3) (2016-08-03)


### Bug Fixes

* **table:** Fixing table selection mode for when the page size changes. ([366e410](https://github.com/bullhorn/novo-elements/commit/366e410))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/bullhorn/novo-elements/compare/v0.2.1...v0.2.2) (2016-08-03)


### Features

* **table:** Removing selection when sort/filter change ([0994367](https://github.com/bullhorn/novo-elements/commit/0994367))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/bullhorn/novo-elements/compare/v0.1.28...v0.2.1) (2016-08-02)


### Features

* **table:** Moving pagination into table, adding custom header/actions and custom themes to table, fixing things around selection ([4ccbd22](https://github.com/bullhorn/novo-elements/commit/4ccbd22))


### BREAKING CHANGES

* table: The new version of table has pagination already in place, so to migrate to the new table you will simple remove your instance of `novo-pagination` and use the one provided

For example:

BEFORE:

```
<novo-pagination></novo-pagination>
<novo-table></novo-table>
```

AFTER:

```
<novo-table></novo-table>
```

Also, any custom header or custom actions that your table already implemented along side the `novo-pagination` element, those will move into the `novo-table-header` and `novo-table-actions` components inside the table. See below for more information on those.

In order to turn off pagination you will simply pass `paging: false` in the config object you provide with the table. The rest of the config object that is passed into the table did not change at all!

For docs on how to use the custom headers/actions please refer to [TABLE README](https://github.com/bullhorn/novo-elements/blob/master/src/elements/table/README.md)



<a name="0.1.28"></a>
## [0.1.28](https://github.com/bullhorn/novo-elements/compare/v0.1.27...v0.1.28) (2016-08-02)



<a name="0.1.27"></a>
## [0.1.27](https://github.com/bullhorn/novo-elements/compare/v0.1.26...v0.1.27) (2016-08-02)


### Bug Fixes

* **tipwell:** Fixing anonymous instances of TipWells ([c19b5db](https://github.com/bullhorn/novo-elements/commit/c19b5db))



<a name="0.1.26"></a>
## [0.1.26](https://github.com/bullhorn/novo-elements/compare/v0.1.25...v0.1.26) (2016-08-02)


### Features

* **TipWell:** adding new TipWell feature for displaying a tip dialog in-line ([#129](https://github.com/bullhorn/novo-elements/issues/129)) ([d20c207](https://github.com/bullhorn/novo-elements/commit/d20c207))



<a name="0.1.25"></a>
## [0.1.25](https://github.com/bullhorn/novo-elements/compare/v0.1.24...v0.1.25) (2016-08-01)


### Features

* **Tooltips:** Enhanced positioning ([#127](https://github.com/bullhorn/novo-elements/issues/127)) ([cd3b3dc](https://github.com/bullhorn/novo-elements/commit/cd3b3dc))



<a name="0.1.24"></a>
## [0.1.24](https://github.com/bullhorn/novo-elements/compare/v0.1.23...v0.1.24) (2016-07-28)


### Bug Fixes

* **form:** Fix NPE when using a manual form field ([9ecbdfd](https://github.com/bullhorn/novo-elements/commit/9ecbdfd))



<a name="0.1.23"></a>
## [0.1.23](https://github.com/bullhorn/novo-elements/compare/v0.1.22...v0.1.23) (2016-07-28)


### Bug Fixes

* **task:** Adding task as entity color ([cbf1c84](https://github.com/bullhorn/novo-elements/commit/cbf1c84))



<a name="0.1.22"></a>
## [0.1.22](https://github.com/bullhorn/novo-elements/compare/v0.1.21...v0.1.22) (2016-07-28)


### Features

* **slider:** Adding a slider component ([1e181ed](https://github.com/bullhorn/novo-elements/commit/1e181ed))



<a name="0.1.21"></a>
## [0.1.21](https://github.com/bullhorn/novo-elements/compare/v0.1.20...v0.1.21) (2016-07-27)


### Bug Fixes

* **table:** Fixing overflow ([62b5eba](https://github.com/bullhorn/novo-elements/commit/62b5eba))



<a name="0.1.20"></a>
## [0.1.20](https://github.com/bullhorn/novo-elements/compare/v0.1.19...v0.1.20) (2016-07-27)


### Features

* **colors:** Adds Neutral Color ([8903a41](https://github.com/bullhorn/novo-elements/commit/8903a41))



<a name="0.1.19"></a>
## [0.1.19](https://github.com/bullhorn/novo-elements/compare/v0.1.18...v0.1.19) (2016-07-26)



<a name="0.1.18"></a>
## [0.1.18](https://github.com/bullhorn/novo-elements/compare/v0.1.17...v0.1.18) (2016-07-26)


### Features

* **modal:** Adds Custom Notification Modals ([f3ef112](https://github.com/bullhorn/novo-elements/commit/f3ef112))



<a name="0.1.17"></a>
## [0.1.17](https://github.com/bullhorn/novo-elements/compare/v0.1.16...v0.1.17) (2016-07-25)


### Features

* **table:** Only showing the clear button when there is a filter, otherwise hiding it ([#117](https://github.com/bullhorn/novo-elements/issues/117)) ([3e6436e](https://github.com/bullhorn/novo-elements/commit/3e6436e))



<a name="0.1.16"></a>
## [0.1.16](https://github.com/bullhorn/novo-elements/compare/v0.1.15...v0.1.16) (2016-07-21)


### Bug Fixes

* **tiles:** fix for no defaults ([#114](https://github.com/bullhorn/novo-elements/issues/114)) ([de4a37b](https://github.com/bullhorn/novo-elements/commit/de4a37b)), closes [#114](https://github.com/bullhorn/novo-elements/issues/114)



<a name="0.1.15"></a>
## [0.1.15](https://github.com/bullhorn/novo-elements/compare/v0.1.14...v0.1.15) (2016-07-19)



<a name="0.1.14"></a>
## [0.1.14](https://github.com/bullhorn/novo-elements/compare/v0.1.13...v0.1.14) (2016-07-18)



<a name="0.1.13"></a>
## [0.1.13](https://github.com/bullhorn/novo-elements/compare/v0.1.12...v0.1.13) (2016-07-14)


### Features

* **entitycolor:** adding notes entity color ([#104](https://github.com/bullhorn/novo-elements/issues/104)) ([b2c35c6](https://github.com/bullhorn/novo-elements/commit/b2c35c6))
* **forms:** Updates Forms to allow vertical layout ([#106](https://github.com/bullhorn/novo-elements/issues/106)) ([9fe6cb9](https://github.com/bullhorn/novo-elements/commit/9fe6cb9))



<a name="0.1.12"></a>
## [0.1.12](https://github.com/bullhorn/novo-elements/compare/v0.1.11...v0.1.12) (2016-07-13)


### Bug Fixes

* **chips:** change extra margin/padding on bottom ([#101](https://github.com/bullhorn/novo-elements/issues/101)) ([35b64be](https://github.com/bullhorn/novo-elements/commit/35b64be))


### Features

* **form:** form output to subscribe to changes ([#102](https://github.com/bullhorn/novo-elements/issues/102)) ([6dc3c56](https://github.com/bullhorn/novo-elements/commit/6dc3c56))



<a name="0.1.11"></a>
## [0.1.11](https://github.com/bullhorn/novo-elements/compare/v0.1.10...v0.1.11) (2016-07-07)


### Bug Fixes

* **forms & select:** Style updates ([2351215](https://github.com/bullhorn/novo-elements/commit/2351215))
* **loading:** cross-browser fixes for loading animations: chrome, firefox, safari, iOS ([a4668de](https://github.com/bullhorn/novo-elements/commit/a4668de))


### Features

* **tiles:** Tiles input and some logic refactoring ([5d14629](https://github.com/bullhorn/novo-elements/commit/5d14629))



<a name="0.1.10"></a>
## [0.1.10](https://github.com/bullhorn/novo-elements/compare/v0.1.9...v0.1.10) (2016-07-06)


### Features

* **form:** Adding tiles input ([5f98a80](https://github.com/bullhorn/novo-elements/commit/5f98a80))



<a name="0.1.9"></a>
## [0.1.9](https://github.com/bullhorn/novo-elements/compare/v0.1.8...v0.1.9) (2016-07-01)


### Bug Fixes

* **button:** Fixing the disabled attr for buttons ([5f7aebd](https://github.com/bullhorn/novo-elements/commit/5f7aebd))



<a name="0.1.8"></a>
## [0.1.8](https://github.com/bullhorn/novo-elements/compare/v0.1.7...v0.1.8) (2016-06-30)



<a name="0.1.7"></a>
## [0.1.7](https://github.com/bullhorn/novo-elements/compare/v0.1.6...v0.1.7) (2016-06-30)


### Bug Fixes

* **button:** Fixing the disabled attr for buttons ([b72b895](https://github.com/bullhorn/novo-elements/commit/b72b895))



<a name="0.1.6"></a>
## [0.1.6](https://github.com/bullhorn/novo-elements/compare/v0.1.4...v0.1.6) (2016-06-30)


### Features

* **radio:** Adding a label input to the radio ([5b6f72c](https://github.com/bullhorn/novo-elements/commit/5b6f72c))
* **tiles:** Adding a tile component ([a904a87](https://github.com/bullhorn/novo-elements/commit/a904a87))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/bullhorn/novo-elements/compare/v0.1.3...v0.1.4) (2016-06-29)



<a name="0.1.3"></a>
## [0.1.3](https://github.com/bullhorn/novo-elements/compare/v0.1.2...v0.1.3) (2016-06-29)


### Features

* **radio:** Adding a radio group element ([9209f0a](https://github.com/bullhorn/novo-elements/commit/9209f0a))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/bullhorn/novo-elements/compare/v0.1.1...v0.1.2) (2016-06-28)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/bullhorn/novo-elements/compare/v0.0.24...v0.1.1) (2016-06-22)



<a name="0.0.24"></a>
## [0.0.24](https://github.com/bullhorn/novo-elements/compare/v0.0.23...v0.0.24) (2016-06-22)


### Features

* **form:** Adding hidden flag to form fields ([0c79a45](https://github.com/bullhorn/novo-elements/commit/0c79a45))



<a name="0.0.23"></a>
## [0.0.23](https://github.com/bullhorn/novo-elements/compare/v0.0.22...v0.0.23) (2016-06-21)


### Features

* **checkbox:** Adding a disabled property to the checkbox input ([3c6669a](https://github.com/bullhorn/novo-elements/commit/3c6669a))



<a name="0.0.22"></a>
## [0.0.22](https://github.com/bullhorn/novo-elements/compare/v0.0.21...v0.0.22) (2016-06-20)


### Features

* **table,tooltip:** Adding in a custom class for the rows of the Table and not showing the tooltip if there is no content ([3809c72](https://github.com/bullhorn/novo-elements/commit/3809c72))



<a name="0.0.21"></a>
## [0.0.21](https://github.com/bullhorn/novo-elements/compare/v0.0.20...v0.0.21) (2016-06-16)



<a name="0.0.20"></a>
## [0.0.20](https://github.com/bullhorn/novo-elements/compare/v0.0.19...v0.0.20) (2016-06-15)



<a name="0.0.19"></a>
## [0.0.19](https://github.com/bullhorn/novo-elements/compare/v0.0.18...v0.0.19) (2016-06-07)



<a name="0.0.18"></a>
## [0.0.18](https://github.com/bullhorn/novo-elements/compare/v0.0.17...v0.0.18) (2016-06-07)



<a name="0.0.17"></a>
## [0.0.17](https://github.com/bullhorn/novo-elements/compare/v0.0.16...v0.0.17) (2016-06-02)


### Bug Fixes

* **cards:** Adding missing overflow for cards ([ee1948e](https://github.com/bullhorn/novo-elements/commit/ee1948e))



<a name="0.0.16"></a>
## [0.0.16](https://github.com/bullhorn/novo-elements/compare/v0.0.15...v0.0.16) (2016-06-01)


### Features

* **labels:** Externalizing all labels with a LabelService, closes [#56](https://github.com/bullhorn/novo-elements/issues/56) ([ee2ad08](https://github.com/bullhorn/novo-elements/commit/ee2ad08)), closes [#56](https://github.com/bullhorn/novo-elements/issues/56)



<a name="0.0.15"></a>
## [0.0.15](https://github.com/bullhorn/novo-elements/compare/v0.0.14...v0.0.15) (2016-05-31)



<a name="0.0.14"></a>
## [0.0.14](https://github.com/bullhorn/novo-elements/compare/v0.0.13...v0.0.14) (2016-05-31)



<a name="0.0.13"></a>
## [0.0.13](https://github.com/bullhorn/novo-elements/compare/v0.0.12...v0.0.13) (2016-05-26)


### Bug Fixes

* **button:** Adding disabled attribute as input/host property, closes [#61](https://github.com/bullhorn/novo-elements/issues/61) ([b5e1d26](https://github.com/bullhorn/novo-elements/commit/b5e1d26)), closes [#61](https://github.com/bullhorn/novo-elements/issues/61)
* **countries:** Fixing address input for counties and resetting the validation on the AddressInput when selected a new country ([e5abd7e](https://github.com/bullhorn/novo-elements/commit/e5abd7e))



<a name="0.0.12"></a>
## [0.0.12](https://github.com/bullhorn/novo-elements/compare/v0.0.11...v0.0.12) (2016-05-25)


### Features

* **forms, quicknote:** Implementing Forms and FormExtras with a QuickNote component, closes [#7](https://github.com/bullhorn/novo-elements/issues/7) and closes [#8](https://github.com/bullhorn/novo-elements/issues/8) ([a035c7c](https://github.com/bullhorn/novo-elements/commit/a035c7c)), closes [#7](https://github.com/bullhorn/novo-elements/issues/7) [#8](https://github.com/bullhorn/novo-elements/issues/8)



<a name="0.0.11"></a>
## [0.0.11](https://github.com/bullhorn/novo-elements/compare/v0.0.10...v0.0.11) (2016-05-24)


### Bug Fixes

* **Modal/Tooltip:** Fixing references to Modal and Tooltip ([25fd5e8](https://github.com/bullhorn/novo-elements/commit/25fd5e8))
* **TableCell:** Fixing rendering for cells ([103a058](https://github.com/bullhorn/novo-elements/commit/103a058))


### Features

* **chips:** Implementing Chips component, closes [#6](https://github.com/bullhorn/novo-elements/issues/6) ([cd0e281](https://github.com/bullhorn/novo-elements/commit/cd0e281)), closes [#6](https://github.com/bullhorn/novo-elements/issues/6)



<a name="0.0.10"></a>
## [0.0.10](https://github.com/bullhorn/novo-elements/compare/v0.0.9...v0.0.10) (2016-05-19)


### Bug Fixes

* **exports:** Fixing some missing exports and updating deprecated code ([dc48107](https://github.com/bullhorn/novo-elements/commit/dc48107))



<a name="0.0.9"></a>
## [0.0.9](https://github.com/bullhorn/novo-elements/compare/v0.0.8...v0.0.9) (2016-05-19)


### Bug Fixes

* **exports:** Fixing some exports and properties of elements that were missing ([645a8e1](https://github.com/bullhorn/novo-elements/commit/645a8e1))
* **exports:** Fixing some exports and properties of elements that were missing ([65c07a1](https://github.com/bullhorn/novo-elements/commit/65c07a1))
* **toast:** fixed z index bug, added all toast types to demo, closes [#51](https://github.com/bullhorn/novo-elements/issues/51) ([55876dd](https://github.com/bullhorn/novo-elements/commit/55876dd)), closes [#51](https://github.com/bullhorn/novo-elements/issues/51)


### Features

* **dragula:** adds dragula element and docs, closes [#5](https://github.com/bullhorn/novo-elements/issues/5) ([16c0c78](https://github.com/bullhorn/novo-elements/commit/16c0c78)), closes [#5](https://github.com/bullhorn/novo-elements/issues/5)



<a name="0.0.8"></a>
## [0.0.8](https://github.com/bullhorn/novo-elements/compare/v0.0.7...v0.0.8) (2016-05-17)


### Features

* **modal:** Adding a Modal, closes [#13](https://github.com/bullhorn/novo-elements/issues/13) ([a9f3331](https://github.com/bullhorn/novo-elements/commit/a9f3331)), closes [#13](https://github.com/bullhorn/novo-elements/issues/13)
* **picker:** Adding picker, closes [#14](https://github.com/bullhorn/novo-elements/issues/14) ([97a0842](https://github.com/bullhorn/novo-elements/commit/97a0842)), closes [#14](https://github.com/bullhorn/novo-elements/issues/14)



<a name="0.0.7"></a>
## [0.0.7](https://github.com/bullhorn/novo-elements/compare/v0.0.6...v0.0.7) (2016-05-11)


### Bug Fixes

* **headers:** Fixes SCSS to give section.primary appropriate background color, closes [#41](https://github.com/bullhorn/novo-elements/issues/41)([a36058a](https://github.com/bullhorn/novo-elements/commit/a36058a)), closes [#41](https://github.com/bullhorn/novo-elements/issues/41)


### Features

* **calendar:** Implementing DatePicker and TimePicker, closes [#2](https://github.com/bullhorn/novo-elements/issues/2)([dd44a17](https://github.com/bullhorn/novo-elements/commit/dd44a17)), closes [#2](https://github.com/bullhorn/novo-elements/issues/2)
* **table:** Adds table element and documentation, closes [#17](https://github.com/bullhorn/novo-elements/issues/17)([c096a60](https://github.com/bullhorn/novo-elements/commit/c096a60)), closes [#17](https://github.com/bullhorn/novo-elements/issues/17)



<a name="0.0.6"></a>
## [0.0.6](https://github.com/bullhorn/novo-elements/compare/v0.0.5...v0.0.6) (2016-05-05)


### Bug Fixes

* **colors:** Hooks up toast to color copy func([6bbd9a6](https://github.com/bullhorn/novo-elements/commit/6bbd9a6))
* **style:** fixes href cursor styling ([#39](https://github.com/bullhorn/novo-elements/issues/39))([82ca7b6](https://github.com/bullhorn/novo-elements/commit/82ca7b6)), closes [#39](https://github.com/bullhorn/novo-elements/issues/39)


### Features

* **fork me:** Adds 'Fork Me On GH' button to side nav, cleans side nav styles ([#37](https://github.com/bullhorn/novo-elements/issues/37))([ecf4010](https://github.com/bullhorn/novo-elements/commit/ecf4010))
* **list:** Adds list component and documentation, closes [#11](https://github.com/bullhorn/novo-elements/issues/11) ([#40](https://github.com/bullhorn/novo-elements/issues/40))([3e11da6](https://github.com/bullhorn/novo-elements/commit/3e11da6)), closes [#11](https://github.com/bullhorn/novo-elements/issues/11) [#40](https://github.com/bullhorn/novo-elements/issues/40)



<a name="0.0.5"></a>
## [0.0.5](https://github.com/bullhorn/novo-elements/compare/v0.0.4...v0.0.5) (2016-05-03)


### Features

* **dropdown:** Adding Dropdown Component ([#33](https://github.com/bullhorn/novo-elements/issues/33)), closes [#9](https://github.com/bullhorn/novo-elements/issues/9)([411ab43](https://github.com/bullhorn/novo-elements/commit/411ab43)), closes [#9](https://github.com/bullhorn/novo-elements/issues/9)
* **header:** Adds header element & documentation, closes [#10](https://github.com/bullhorn/novo-elements/issues/10)([c565d0e](https://github.com/bullhorn/novo-elements/commit/c565d0e)), closes [#10](https://github.com/bullhorn/novo-elements/issues/10)



<a name="0.0.4"></a>
## [0.0.4](https://github.com/bullhorn/novo-elements/compare/v0.0.3...v0.0.4) (2016-05-03)


### Features

* **drawer:** Add drawer element, closes [#4](https://github.com/bullhorn/novo-elements/issues/4)([2a16f07](https://github.com/bullhorn/novo-elements/commit/2a16f07)), closes [#4](https://github.com/bullhorn/novo-elements/issues/4)
* **select:** Added Select element, documentation, and initial tests([f1036d2](https://github.com/bullhorn/novo-elements/commit/f1036d2))
* **switch:** Adds switch element and documentation, closes [#16](https://github.com/bullhorn/novo-elements/issues/16)([747174b](https://github.com/bullhorn/novo-elements/commit/747174b)), closes [#16](https://github.com/bullhorn/novo-elements/issues/16)
* **toast:** Adds toast element and documentation, closes [#18](https://github.com/bullhorn/novo-elements/issues/18)([08f2351](https://github.com/bullhorn/novo-elements/commit/08f2351)), closes [#18](https://github.com/bullhorn/novo-elements/issues/18)
* **tooltip:** Adding tooltip feature, closes [#20](https://github.com/bullhorn/novo-elements/issues/20) ([#29](https://github.com/bullhorn/novo-elements/issues/29))([211f730](https://github.com/bullhorn/novo-elements/commit/211f730)), closes [#20](https://github.com/bullhorn/novo-elements/issues/20) [(#29](https://github.com/(/issues/29)



<a name="0.0.3"></a>
## [0.0.3](https://github.com/bullhorn/novo-elements/compare/v0.0.2...v0.0.3) (2016-04-28)


### Features

* **deferred:** Implement deferred object ([15e5fe0](https://github.com/bullhorn/novo-elements/commit/15e5fe0))
* **keycodes:** Implement key codes util, closes #23 ([470a1c6](https://github.com/bullhorn/novo-elements/commit/470a1c6)), closes [#23](https://github.com/bullhorn/novo-elements/issues/23)
* **outside-click:** Implementing an outside click mixin, closes #24 ([c5b4625](https://github.com/bullhorn/novo-elements/commit/c5b4625)), closes [#24](https://github.com/bullhorn/novo-elements/issues/24)
* **plural:** Implementing a plural pipe and updating demo, closes #21 ([73413d6](https://github.com/bullhorn/novo-elements/commit/73413d6)), closes [#21](https://github.com/bullhorn/novo-elements/issues/21)



<a name="0.0.2"></a>
## [0.0.2](https://github.com/bullhorn/novo-elements/compare/v0.0.1...v0.0.2) (2016-04-28)


### Features

* **cards,loading:** Implementing a Card and Loading element, style cleanup. ([d2e9045](https://github.com/bullhorn/novo-elements/commit/d2e9045))



<a name="0.0.1"></a>
## 0.0.1 (2016-04-27)


### Features

* **button:** Adding base library code with a Button element and demo. ([216f054](https://github.com/bullhorn/novo-elements/commit/216f054))
* **tabs:** Adds Tabs element and demo. Closes #19 ([9c38e7c](https://github.com/bullhorn/novo-elements/commit/9c38e7c)), closes [#19](https://github.com/bullhorn/novo-elements/issues/19)




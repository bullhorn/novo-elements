TODO

DOCUMENT HOW TO SETUP .angular-cli.json of DEMO
COMPILE MAIN NOVO_ELEMENTS SCSS TO DIST FOR STACKBLITZ
SETUP STACKBLITZ

NOT-SO BREAKING CHANGES

* Buttons
  * Primary button forced to have an icon
  * Standard button will never have icon
* Cards
  * Card no longer have built-in headers, we will build a new wrapper component for this
* Pickers
  * We now will use the AutoComplete paridigm for this. // TODO: Hopefully element signature will be the same
* Modal
  * renamed `NovoDialog`
* Select

  * You should use more declarative approach rather than using `options`. ie.

  ```html
    <novo-select [ngModel]="value">
      <novo-option>-- None --</novo-option>
      <novo-option value="1">One</novo-option>
      <novo-option value="2">Two</novo-option>
    </novo-select>
  ```

* Header

  * `util-action` is deprecated, please use `novo-action`

BREAKING CHANGES

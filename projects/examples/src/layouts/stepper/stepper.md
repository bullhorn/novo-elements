Steppers [(source)](https://github.com/bullhorn/novo-elements/blob/master/projects/novo-elements/src/elements/stepper)
=========================================================================================

Stepper component provides a wizard-like workflow by dividing content into logical steps.

Material stepper builds on the foundation of the CDK stepper that is responsible for the logic that drives a stepped workflow. Material stepper extends the CDK stepper and has Material Design styling.

## Stepper variants

There are two stepper components: novo-horizontal-stepper and novo-vertical-stepper. They can be used the same way. The only difference is the orientation of stepper.

##### Horizontal Stepper

This is the default stepper great for many reasons.

<code-example example="stepper-horizontal"></code-example>

##### Linear stepper

The linear attribute can be set on novo-horizontal-stepper and novo-vertical-stepper to create a linear stepper that requires the user to complete previous steps before proceeding to following steps. For each novo-step, the stepControl attribute can be set to the top level AbstractControl that is used to check the validity of the step.

There are two possible approaches. One is using a single form for stepper, and the other is using a different form for each step.

Alternatively, if you don't want to use the Angular forms, you can pass in the completed property to each of the steps which won't allow the user to continue until it becomes true. Note that if both completed and stepControl are set, the stepControl will take precedence.

##### Vertical Stepper

This is an alternative stepper great for many other reasons.

<code-example example="stepper-vertical"></code-example>

---
section: Components
page: Query Builder
title: Examples
order: 4
---

## Just a basic Criteria Builder

A common use case is to just collect a list of criteria to build as a query.  A Criteria can contain multiple conditions which will need to be joined by a conjunctions (and/or).

<code-example example="just-criteria"></code-example>


## Full Query Builder

The difference between the Query and Criteria Builder is that it allow for the user to define multiple criteria and join them as either inclusion or exclusion criteria.  ie. Find `where fruit.seeds >= 1 and not fruit.name='Avacodo'`

TBW
<!-- <code-example example="just-criteria"></code-example> -->
// Look! No namespaces!
module.exports = {
  width: {
    none: { value: "0" },
    thin: { value: "1px" },
    thick: { value: "2px" },
    base: { value: "{border.width.none}" },
  },
  radius: {
    round: { value: "0.4rem" },
    square: { value: "0rem" },
    full: { value: "999px" },
    base: { value: "{border.radius.round}" },
  },
};

/* 
<novo-button variant="ghost|rounded|" color="primary"></novo-button>  button-border-radius <== theme-border-radius <== border-radius-round 

:root {
  --button-border-radius: var(--border-radius-full);
  --border-radius-round: 5px;
}

.use-round-borders {
  border-radius: var(--border-radius-round);
}
*/

# File
The File Input supports single and multiple file input types.  It also has support for Drag and Drop resources.  All files are 

## Novo File Object

```javascript
{
    name: 'SomeFile.png',  // File Name
    contentType: 'image/png',  // File type
    lastModified: 428558400000, // Timestamp for Date Last Modified
    size: 64185, // File Size in bytes 
    file: File,  // Reference to the HTML5 File Object
    loading: true  // is the Reader has finished loading the document
    fileContent: 'iVBORw0KGgoAAAANSUhEUgAAAKEAAACrCAYAAAAOyvzQAAAABmJLR0QA...';
    dataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKEAAACrCAYAAAAOyvzQAAAABmJLR0QA...';
};
```

##### Properties
- `'name' : String`
    * Used to create a label:input association
- `'placeholder' : String`
    * Adds placeholder text to form field in empty state    
- `'multiple' : Boolean`
    * Determines whether you select multitple files
- `'disabled' : Boolean`
    * Will disable the input
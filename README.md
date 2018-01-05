# RazorBootstrapAutocomplete
Autocomplete for MVC/Razor using jQuery and Bootstrap 3

# Issues
* Yep!

# Example
`<div class="dropdown">
    <input type="text" id="autoCompleteTest" />
</div>

<input type="text" id="autoCompleteSelectedValue" disabled="disabled" />

$("#autoCompleteTest").autocomplete({
        min: 1
        , source: [{ name: 'test 1', value: 1 }, { name: 'test 2', value: 2 }]
        , displayValue: 'name'
        , selectValue: 'value'
        , target: '#autoCompleteSelectedValue'
        });`

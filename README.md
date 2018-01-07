# RazorBootstrapAutocomplete
Autocomplete for MVC/Razor using jQuery and Bootstrap 3

# Issues
* Yep!

# Todo List
* look at bindings - https://stackoverflow.com/questions/1948332/detect-all-changes-to-a-input-type-text-immediately-using-jquery
* look at old val compare - https://stackoverflow.com/questions/1948332/detect-all-changes-to-a-input-type-text-immediately-using-jquery
* support user defined filters on source array
* typing delay, cancellation of ajax call, etc
* add exceptions for up, down, enter these will be used for selection instead
* save old value, if a new one is not selected on blur, set the input display value back to selected display value set the list back to the selected list item
    * or if input is changed and the target has a value, clear the value of the target
* source - allow sync and async calls

# Example
``` javascript
<div class="dropdown">
    <input type="text" id="autoCompleteTest" />
</div>

<input type="text" id="autoCompleteSelectedValue" disabled="disabled" />

$("#autoCompleteTest").autocomplete({
        min: 1
        , source: [{ name: 'test 1', value: 1 }, { name: 'test 2', value: 2 }]
        , displayValue: 'name'
        , selectValue: 'value'
        , target: function() {
            return $('#autoCompleteSelectedValue')
        }
        });
```


``` javascript
$(".autocompleteInput").autocomplete({
    min: 1
    , source: function (cb, query) {
        return $.ajax({
            url: '@Url.Content("~/")Home/GetFilteredOptions?filter=' + query
            , method: 'POST'
            , cache: false
            , async: false
            , success: (data) => {
                cb(data)
            }
        })
    }
    , target: function(input) {
        return input.siblings("[id^='autoCompleteSelectedValue']")
    }
});
```

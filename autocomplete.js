/**
 * source - this can be a function or array
 * min
 * class
 * displayValue
 * selectValue
 * target - this must be a function.  should this allow strings?
 * ajax calls: must set async to false!
 */
$.fn.autocomplete = function (options) {
    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    function IsNullOrEmpty(opt) {
        return opt === null || opt === undefined || opt === ''
    }

    // defaults
    if(IsNullOrEmpty(options) || IsNullOrEmpty(options.source)) {
        throw "Source must be defined for autocomplete element."
    }

    if(IsNullOrEmpty(options.min)) {
        options.min = 1
    }

    if(IsNullOrEmpty(options.class)) {
        options.class = 'dropdown-menu'
    }

    if(!IsNullOrEmpty(options.displayValue) || !IsNullOrEmpty(options.selectValue)) {
        if(!IsNullOrEmpty(options.displayValue) && IsNullOrEmpty(options.selectValue)) {
            options.selectValue = options.displayValue
        } else if(IsNullOrEmpty(options.displayValue) && !IsNullOrEmpty(options.selectValue)) {
            options.displayValue = options.selectValue
        }
    }

    return this.each(function () {
        let menuId = 'dd-menu-' + guidGenerator()
        let input = $(this)
        let menuOptions = []
        
        input.attr({
            'haspopup': 'true'
            , 'aria-expanded': 'false'
        })

        input.after(`<ul id="${menuId}" class="${options.class}"></ul>`)
        
        // todo look at bind - https://stackoverflow.com/questions/1948332/detect-all-changes-to-a-input-type-text-immediately-using-jquery
        // todo look at old val compare - https://stackoverflow.com/questions/1948332/detect-all-changes-to-a-input-type-text-immediately-using-jquery
        // todo support user defined filters on source array
        // todo typing delaylook
        // todo grep instead of index of?

        input.on('keyup', (e) => {
            // add exceptions for up, down, enter these will be used for selection instead

            // save old value, if a new one is not selected on blur, set the input display value back to selected display value
            // set the list back to the selected list item

            let val = e.target.value

            if(!IsNullOrEmpty(val) && val.length >= options.min) {
                let source = []

                if(typeof options.source === "function") {
                    $(options.source(
                        function (retVal) {
                            source = retVal
                        }
                        , e.target.value))
                } else {
                    source = options.source
                }

                if(!IsNullOrEmpty(options.displayValue)) {
                    menuOptions = source.filter(item => item[options.displayValue].toUpperCase().indexOf(val.toUpperCase()) > -1)
                } else {
                    menuOptions = source.filter(item => item.toUpperCase().indexOf(val.toUpperCase()) > -1)
                }

                if(menuOptions.length > 0) { // populate the drop down menu with filtered options
                    let menu = ''

                    menuOptions.forEach((item) => {
                        menu += `<li>`
                        if(!IsNullOrEmpty(options.displayValue)) {
                            menu += `<a href="#" data-display="${item[options.displayValue]}" data-value="${item[options.selectValue]}">${item[options.displayValue]}</a>`
                        } else {
                            menu += `<a href="#" data-display="${item}" data-value="${item}">${item}</a>`
                        }
                        menu += `</li>`
                    })

                    $(`#${menuId}`).html(menu)

                    $(`#${menuId} li a`).on('mousedown', (selected) => {
                        input.val(selected.target.getAttribute('data-display'))

                        if(options.target && typeof options.target === "function") {
                            options.target(input).val(selected.target.getAttribute('data-value'))
                        }

                        $(`#${menuId}`).html(selected.target.parentElement)
                    })

                    $(`#${menuId}`).show()
                } else { // clear the drop down menu
                    $(`#${menuId}`).html('')
                    $(`#${menuId}`).hide()
                    menuOptions = []
                }
            } else {
                $(`#${menuId}`).html('')
                $(`#${menuId}`).hide()
                menuOptions = []
            }
        })

        input.on('focus', () => {
            if(menuOptions.length > 0) {
                $(`#${menuId}`).show()
            } else {
                $(`#${menuId}`).hide()
            }
        })

        input.on('blur', (e) => {
            $(`#${menuId}`).hide()
        })
    })
}
ko.bindingHandlers.codeMirror = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        var codeMirrorConfig =
        {
            theme: "the-matrix",
            indentUnit: 4,
            tabSize: 4,
            lineNumbers: true,
            styleActiveLine: true,
            mode: "text/xml",
            extraKeys: {
                Tab: function(cm) {
                    if (cm.getSelection().length) {
                        CodeMirror.commands.indentMore(cm);
                    } else {
                    cm.replaceSelection("    ", "end")
                    }
                },
                'Shift-Tab': function(cm) {
                    CodeMirror.commands.indentLess(cm)
                }
            }
        }
        var myCodeMirror = CodeMirror.fromTextArea(element, codeMirrorConfig);
        var height = $(myCodeMirror.getWrapperElement()).parent().height();
        $(myCodeMirror.getWrapperElement()).height(height);

        $(window).resize(function(){
            var height = $(myCodeMirror.getWrapperElement()).parent().height();
            $(myCodeMirror.getWrapperElement()).height(height);
        });

        /*
        var myCodeMirror = CodeMirror(function(elt) {
            element.parentNode.replaceChild(elt, element);
        }, {value: element.value});*/
        viewModel.codeMirrorExt = myCodeMirror;
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        var myCodeMirror = viewModel.codeMirrorExt;
        var prettifiedXML = vkbeautify.xml(ko.unwrap(valueAccessor()));
        myCodeMirror.setValue(prettifiedXML);
    }
};

ko.bindingHandlers.hashLink = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        $(element).click(function(e) {
            e.preventDefault();
            pathInfo = new Models.PathInfo($(element).prop("hash").substr(1));
            Container.router.navigate(pathInfo);
        });
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        element.href ='#' + ko.unwrap(valueAccessor());
    }
}


// Event that gives both old and new values to a subscriber.
// Will not fire if old and new value are exactly equal.
// By default, Knockout will always fire if the value is
// non-primitive; this event overrides that behavior.
ko.subscribable.fn.subscribeChanged = function (callback) {
    var oldValue;
    this.subscribe(function (_oldValue) {
        oldValue = _oldValue;
    }, this, 'beforeChange');

    this.subscribe(function (newValue) {
        if (oldValue !== newValue)
            callback(newValue, oldValue);
    });
};

// Will not allow the value to be overwritten when responding to another write.
// This is to ensure that only the primary handler of an event decides the new value.
ko.extenders.lockable = function(target, isLockable) {
    //create a writeable computed observable to intercept writes to our observable

    var result = ko.computed({
        read: target,  //always return the original observables value
        write: function(newValue) {
            if (!target.isLocked) {
                Sammy.log('Target is unlocked');
                target.isLocked = true;
                target(newValue);
                target.isLocked = false;
            } else {
                Sammy.log('Target is LOCKED');
            }
        }
    });

    //initialize with current value to make sure it is rounded appropriately
    result(target());

    //return the new computed observable
    return result;
};

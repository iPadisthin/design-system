/*
 * Enquiry form include and submission
 * For course discipline pages
 */
var enquiryFormURL = '%globals_asset_url:1006939%';
var enquiryFormContainerSelector = '#ef-form-container';
var currentDiscipline = '%asset_name%';

function _loadEnquiryForm() {
    console.log('enquiryFormURL', enquiryFormURL);
    $.ajax({
        url: enquiryFormURL,
        dataType: 'text',
        success: function(data) {
            _setupEnquiryForm(data);
        }
    }).done(function() {
        $( enquiryFormContainerSelector+" form > div" ).each(function( index ) {
            var labelForClass = $( this ).find('label').text();
            labelForClass = labelForClass.replace(/\s+/g, '-').toLowerCase(); // space to hyphen and lowercase

            // preselect study type
            //$('#study-type select').val('58');

        });
        for (var i = 0; i < _fields.length; i++) {
            var _field = _fields[i];
            if (_field.flags & 1) {
                var elLabel = document.querySelector('label[for="' + _field.name + '"]');
                elLabel.innerHTML += ' <span class="alert">*</span>';
            }
        }
    });
}
function _setupEnquiryForm(formHTML) {
     $(enquiryFormContainerSelector).html(formHTML);
    var elContainer = document.querySelector(enquiryFormContainerSelector);

    elContainer.addEventListener('submit', _submitEnquiryForm);

    // dirty fix for f_tok script tag not executed properly
    setTimeout(function() {
        if (! document.querySelector('[name="f_tok"]')) {
            var scriptRegexp = /<script *(type="text\/javascript")?>([\s\S.]+?)<\/script>/g;
            while ((matches = scriptRegexp.exec(formHTML)) !== null) {
                if (matches[2].indexOf('f_tok') !== -1) {
                    //console.log(matches[2]);
                    eval(matches[2]);
                    if (document.readyState === 'complete') {
                        console.log('document.readyState', document.readyState);
                        window.onload();
                    }
                }
            }
            RNEnquiryForm.removeSelectOptions('#wf_2_8', ['6018','6022','6019','6020','6021','1736','5190','6023']); // remove I want to study: PG(Any) and PG(Research)
            RNEnquiryForm.renameOptionLabel('#wf_2_1 [value="3476"]', 'City (Melbourne CBD)'); // change At: City option text
            RNEnquiryForm.renameOptionLabel('#wf_2_1 [value="2"]', 'Melbourne (Bundoora)'); // change At: Melbourne option text
            RNEnquiryForm.removeSelectOptions('#wf_2_7', ['59','61']); // remove I want to study: PG(Any) and PG(Research)
            RNEnquiryForm.preSelectOption('#wf_2_7', '58'); // pre-select I want to study: Undegradute
        }
    }, 1000);

}

function _submitEnquiryForm(e) {
    //console.log('_submitEnquiryForm');
    e.preventDefault();

    var elContainer = document.querySelector(enquiryFormContainerSelector);
    if (elContainer.querySelector('#rn_ErrorDisplay').className.match(/\brn_Hidden\b/)) {
        console.log('valid, submit form via ajax...');

        var formData = new FormData(e.target);

        $.ajax({
            url: e.target.action,
            data: formData,
            processData: false,
            contentType: false,
            type: e.target.method.toUpperCase(),
            success: function(resultHTML) {
                $(enquiryFormContainerSelector).html(resultHTML);
                $(enquiryFormContainerSelector).get(0).scrollIntoView({ block: 'start',  behavior: 'smooth' });
            }
        });
    } else {
        console.log('invalid');
    }

    return false;
}
// end enquiry form

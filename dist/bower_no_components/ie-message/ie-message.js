/**
 * Load an HTML template and show
 * it for the dummy IE8 Users.
 * 
 * @param  {Object} $
 * @return {Boolean}
 */
(function($) {
    $.ajax({
        url: 'bower_no_components/ie-message/template.html',
        type: 'GET',
        dataType: 'html',
        success: function(data) {
            $('#container').html(data);
        },
        error: function(err) {
            $('#container').html('Please download a modern browser');
        }
    });

    return false;
}(jQuery));

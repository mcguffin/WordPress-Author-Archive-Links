/**
 * Handle the custom post type nav menu meta box
 */
jQuery( document ).ready( function($) {
     $( '#submit-author-archives' ).click( function( event ) {
		event.preventDefault();
		
		var $autarc_list_items = $( '#' + autarc_obj.metabox_list_id + ' li :checked' );
		var $autarc_submit = $( 'input#submit-author-archives' );

		// Get checked boxes
		var authors = [];
		$autarc_list_items.each( function() {
			authors.push( $( this ).val() );
		} );
		
		// Show spinner
		$( '#' + autarc_obj.metabox_id ).find('.spinner').show();
		
		// Disable button
		$autarc_submit.prop( 'disabled', true );

		// Send checked post types with our action, and nonce
		$.post( autarc_obj.ajaxurl, {
				action: autarc_obj.action,
				authorarchive_nonce: autarc_obj.nonce,
				authors: authors,
				nonce: autarc_obj.nonce
			},

			// AJAX returns html to add to the menu, hide spinner, remove checks
			function( response ) {
				$( '#menu-to-edit' ).append( response );
				$( '#' + autarc_obj.metabox_id ).find('.spinner').hide();
				$autarc_list_items.prop("checked", false);
				$autarc_submit.prop( 'disabled', false );
			}
		);
	} );
} );

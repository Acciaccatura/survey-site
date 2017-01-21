$('document').ready(function(){
	$('#add-button').click(function() {
		$('<div class="text-field option" name="option" contenteditable="true"></div>').insertBefore('#add-button');
	});
	removeButton();
	$('#enter').click(function() {
		$('.option').each(function(index, obj) {
			var elem = document.createElement('input');
			elem.name = 'option';
			elem.value = obj.innerHTML;
			elem.type = 'hidden';
			$(elem).insertAfter(obj);
		});
		var titleText = $('.title').text();
		$('<input name="title" type="hidden" value="' + titleText + '" />').insertAfter('.title');
		document.getElementById('survey').submit();
	});
});

function removeButton() {
	$('#remove-button').click(function() {
		$('.option').attr('contenteditable', 'false');
		$('.option').css({'border-bottom-color': '#ff0000', 'background-color': '#ffeeee', 'cursor': 'pointer' });
		$('.option').click(function(){
			$( this ).remove();
		});
		$( this ).html('Finished Removing');
		$( this ).unbind('click');
		$('#add-button').attr('disabled', 'false');
		$('#enter').attr('disabled', 'false');
		$( this ).click(function() {
			$('.option').attr('contenteditable', 'true');
			$('.option').css({'border-bottom-color': '', 'background-color': '', 'cursor': '' });
			$('.option').unbind('click');
			$('button').removeAttr('disabled');
			$( this ).html('Remove choices...');
			$( this ).unbind('click');
			removeButton();
		});
	});
}
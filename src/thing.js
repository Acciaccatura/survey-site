$('document').ready(function(){
	$('#add-button').click(function() {
		$('<div class="text-field option" name="option" contenteditable="true"></div>').insertBefore('#add-button');
	});
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
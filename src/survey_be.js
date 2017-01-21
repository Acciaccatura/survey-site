$('document').ready(function() {
	$('#options li').each(function(index){
		$( this ).attr('val', index);
	});
	$('#options li').click(function(){
		let send = $( this ).attr('val');
		let elem = document.createElement('input');
		elem.name = 'choice';
		elem.value = send;
		elem.type = 'hidden';
		$('#survey').append(elem);
		document.getElementById('survey').submit();
	});
});
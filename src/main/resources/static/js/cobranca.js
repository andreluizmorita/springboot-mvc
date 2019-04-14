$(function() {
	$('[rel="tooltip"]').tooltip();
	
	$('#confirmarExclusao').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var codigoTitulo = button.data('codigo');
		var codigoDescricao = button.data('descricao');
		
		var modal = $(this);
		var form = modal.find('form');
		var body = modal.find('.remove-texto')
		form.attr('action', '/titulos/' + codigoTitulo);
		body.html(codigoDescricao);
	});
});
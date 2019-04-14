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
	
	$('#confirmarPagamento').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		var codigoTitulo = button.data('receber');
		var codigoDescricao = button.data('descricao');
		
		var modal = $(this);
		var form = modal.find('form');
		var body = modal.find('.pagamento-texto');
		form.attr('action', '/titulos/' + codigoTitulo + '/receber');
		$('#confirmarPagamentoFormSubmit').attr('data-codigo', codigoTitulo);
		body.html(codigoDescricao);
	});
	
	$('.js-atualizar-status').on('click', function(e) {
		e.preventDefault();
		
		var botaoReceber = $(event.currentTarget);
		var urlReceber = botaoReceber.attr('href');
		
	});
	
	$('#inputValor').maskMoney({
		decimal: ',',
		thousands: '.',
		allowZero: true
	});
	
	$("#confirmarPagamentoFormSubmit").on('click', function(e){
		e.preventDefault();
		
		var codigoTitulo = $(this).data('codigo');
		var urlReceber = '/titulos/' + codigoTitulo + '/receber';
		
		var response = $.ajax({
			url: urlReceber,
			type: 'PUT'
		});
		
		response.done(function(e) {
			$('[data-status=' + codigoTitulo + ']')
				.removeClass('badge-danger')
				.addClass('badge-success');
			$('[data-receber=' + codigoTitulo + ']').hide();
			$('#confirmarPagamento').modal('toggle');
		});
		
		response.fail(function(e) {
			console.log(e);
			alert('Erro')
		});
	});
});
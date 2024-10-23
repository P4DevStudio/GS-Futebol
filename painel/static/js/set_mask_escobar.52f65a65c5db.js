$(document).ready(function(){
    // Inicio CPF ou CNPJ
    var options = {
        onKeyPress: function (cpf, ev, el, op) {
            var masks = ['000.000.000-000', '00.000.000/0000-00'];
            $('.cpfOuCnpj').mask((cpf.length > 14) ? masks[1] : masks[0], op);
        }
    }
    $('.cpfOuCnpj').length > 11 ? $('.cpfOuCnpj').mask('00.000.000/0000-00', options) : $('.cpfOuCnpj').mask('000.000.000-00#', options);
    // Fim CPF ou CNPJ

    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    // Declarar os tipos de mascáras à serem utilizados
    $('[name="phone"]').mask(SPMaskBehavior, spOptions);
    // $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
    // $('.cep').mask('00000-000');
    $('[name="due_date"]').mask('00/00/0000');
    // $('.money2').mask("#.##0,00", {reverse: true});
    // $('.money').mask('000.000.000.000.000,00', {reverse: true});
    // $('.cpf').mask('000.000.000-00', {reverse: true});
});
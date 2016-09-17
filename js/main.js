var gender_coef = [0.7, 0.6];
var gender_id = 0;
var weight = 65;
var alco = [];

function countAlcohol()
{
  return $('.alcohols > div').length;
}

function addAlcohol() {
  var degree = $('<div class="degree"></div>');
  degree.append('<span class="name">Degree(°):</span>');
  var input_d = $('<input type="number" name="degree" value="" />');
  input_d.on('keyup', function (e) {
    console.log('degree', countAlcohol());
    fillAlcohol();
  });
  degree.append(input_d);

  var quantity = $('<div class="quantity"></div>');
  quantity.append('<span class="name">Quantity (cL):</span>');
  var q_input = $('<input type="number" name="quantity" value="" />');
  q_input.on ('keyup', function () {
    console.log('quantity', countAlcohol());
    fillAlcohol();
  });
  quantity.append(q_input);

  var remove_alcohol = $('<span id="remove-' + countAlcohol() + '">X</span>');
  remove_alcohol.click(function() {
    $(this).parent().remove();
    fillAlcohol();
  });

  var drink = $('<div class="alcohol added-' + countAlcohol() + '"></div>');
  drink.append(degree);
  drink.append(quantity);
  drink.append(remove_alcohol);
  $('.alcohols').append(drink);
  fillAlcohol();
}

function fillAlcohol() {
  alco= [];
  $.each($('.alcohols > div'), function (i, e) {
    var tmp = {};
    tmp.q = ($(e).find('input[name="quantity"]').val());
    tmp.d = ($(e).find('input[name="degree"]').val());
    if (tmp.q !== "" && tmp.d !== "")
      alco.push(tmp);
  });
  $('#total_alcohol').text(Math.round(alcohol() * 100) / 100);
  limitAlco();
}

function alcohol() {
  gender_id = parseInt($('select option:selected').val());
  var coef_g = gender_coef[gender_id];
  var conso = 0;
  $.each(alco, function (i, e) {
    conso += e.q * 10 * e.d / 100;
  });
  return (conso * 0.8 / (coef_g * weight));
}

function limitAlco() {
  if (parseFloat($('input[name="limit"]').val()) < parseFloat($('#total_alcohol').text())) {
    $('#total_alcohol').addClass('drunked');
  }
  else {
    $('#total_alcohol').removeClass('drunked');
  }
}
$(document).ready(function ($) {
  $('#weight').val(weight);
  $('.gender select').on('change', fillAlcohol);
  addAlcohol();
});

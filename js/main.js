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
  degree.append('<span class="name">Degree:</span>');
  var input_d = $('<input type="number" name="degree" value=0 />');
  input_d.on('keyup', function (e) {
    console.log('degree', countAlcohol());
    fillAlcohol();
  });
  degree.append(input_d);

  var quantity = $('<div class="quantity"></div>');
  quantity.append('<span class="name">Quantity:</span>');
  var q_input = $('<input type="number" name="quantity" value=0 />');
  q_input.on ('keyup', function (e) {
    console.log('quantity', countAlcohol());
    fillAlcohol();
  });
  quantity.append(q_input);

  var remove_alcohol = $('<input id="remove-' + countAlcohol() + '" type="button" value="-" />');
  remove_alcohol.click(function(i, e) {
    $('.alcohol.added-'+countAlcohol()).remove();
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
    tmp.q = parseFloat($(e).find('input[name="quantity"]').val());
    tmp.d = parseFloat($(e).find('input[name="degree"]').val());
    alco.push(tmp);
  });
  $('#total_alcohol').val(alcohol());
}

function alcohol() {
  var coef_g = gender_coef[gender_id];
  var conso = 0;
  $.each(alco, function (i, e) {
    conso += e.q * 10 * e.d / 100;
  });
  return (conso * 0.8 / (coef_g * weight));
}

$(document).ready(function ($) {
  $('#weight').val(weight);
  gender_id = $('.gender input[name="sex"]:checked').val();
  addAlcohol();
});

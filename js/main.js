$(document).ready(function () {
  var MoralisApiKey = '9CTaxS6QcqR8kkWosNxroXGQX7Mk7v7nUT5ZVVJbIYjz1mXwGGylJEOz2GJRhGD3';
  $('.open-currency-select-button').click(function () {
    $('#currentToEdit').val($(this).attr('id'));
    $('#SelectBox').show();
  });
  $('.listSelect').click(function () {

    var classList = $(this).attr('class').split(/\s+/);
    $.each(classList, function (index, item) {
      if (item.indexOf('token-item-') == 0) {
        var contractAddress = item.replace('token-item-', '');
        if (contractAddress == 'ETHER') {
          contractAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
        }
        if ($('#currentToEdit').val() == 'Select1') {
          $('#token1').val(contractAddress);
          $.ajax({
            async: true,
            crossDomain: true,
            url: "https://deep-index.moralis.io/api/v2/erc20/" + contractAddress.toString() + "/price?chain=eth&exchange=uniswap-v2",
            method: "GET",
            headers: {
              accept: "application/json",
              "X-API-Key": MoralisApiKey,
            },
          }).done(function (response) {
            $('#token1Price').val(response.usdPrice);
          });
        } else if ($('#currentToEdit').val() == 'Select2') {
          $('#token2').val(contractAddress);

          $.ajax({
            async: true,
            crossDomain: true,
            url: "https://deep-index.moralis.io/api/v2/erc20/" + contractAddress.toString() + "/price?chain=eth&exchange=uniswap-v2",
            method: "GET",
            headers: {
              accept: "application/json",
              "X-API-Key": MoralisApiKey,
            },
          }).done(function (response) {
            $('#token2Price').val(response.usdPrice);
          });

        } else {
          $('#token1').val('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
          $('#token1Price').val('1900');
        }
      }
    });


    var ShortName = $(this).find('.kPUvYl').find('.css-8mokm4').text();
    var ShortSrc = $(this).find('.kgzAza').attr('src');
    var newval = '<img class="sc-1tgql9z-0 kgzAza" src="' + ShortSrc + '" /><div class="sc-1f9j7d4-2 ksWLRj token-symbol-container"><span>' + ShortName + ' </span></div><svg width="12" height="7" viewBox="0 0 12 7" fill="none" class="sc-1f9j7d4-1 fVdwYT"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>';
    var toedit = $('#' + $('#currentToEdit').val());
    toedit.removeClass('kdzxSc');
    toedit.addClass('fgtYfT');
    toedit.html(newval);
    $('#SelectBox').hide();
  });
  $('.cYoYGO').click(function () {
    var ShortName = $(this).find('.css-xy7yfl').text();
    var ShortSrc = $(this).find('.kgzAza').attr('src');
    var newval = '<img class="sc-1tgql9z-0 kgzAza" src="' + ShortSrc + '" /><div class="sc-1f9j7d4-2 ksWLRj token-symbol-container"><span>' + ShortName + ' </span></div><svg width="12" height="7" viewBox="0 0 12 7" fill="none" class="sc-1f9j7d4-1 fVdwYT"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>';
    var toedit = $('#' + $('#currentToEdit').val());
    toedit.removeClass('kdzxSc');
    toedit.addClass('fgtYfT');
    toedit.html(newval);
    $('#SelectBox').hide();
  });
  $('.token-amount-input').keyup(function () {
    var firstToken = $($('.token-amount-input')[0]).parent().prev().find('.open-currency-select-button').find('.token-symbol-container').text().trim();
    var secondToken = $($('.token-amount-input')[1]).parent().prev().find('.open-currency-select-button').find('.token-symbol-container').text().trim();
    if (firstToken == 'Select a token' || secondToken == 'Select a token') {

    } else {
      var input2 = $('#input2').val();
      var input3 = $('#input3').val();
      var t1p = $('#token1Price').val();
      var t2p = $('#token2Price').val();
      if ($(this).attr('id') == 'input2') {
        var ending = input2 * (t1p / t2p)
        $('#input3').val(ending);
      } else {
        var ending2 = input3 * (t2p / t1p)
        $('#input2').val(ending2);
      }
    }
  });
});
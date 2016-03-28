$(document).on('click', function (e){
  var target = $(e.target);

  if (target.is('.dropdown-trigger') || target.parent().is('.dropdown-trigger')) {
    var list = target.closest('.dropdown').find('.dropdown-content');

    e.preventDefault();

    $('.dropdown-content').not(list).hide();
    list.toggle();
  } else {
    $('.dropdown-content').hide();
  }
});

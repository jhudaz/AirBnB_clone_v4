document.addEventListener('DOMContentLoaded', function () {


  $('#data-id').change(function()
  {
    let dict = {};
    if(this.checked){
      dict[this.attr('data-name')] = this.attr('data-id')
    else{
      delete dict[this.attr('data-name')]




})

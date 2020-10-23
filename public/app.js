(function(){
  var base_layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

  var map_options = {
    center: [35.0556188, -80.664826],
    zoom: 17,
    layers: [base_layer],
    maxZoom: 21
  };
  var map = new L.Map($('.map')[0], map_options);

  var ags_layer;

  function updateLayer(event) {
    if (event) {
      event.preventDefault();
    }
    var url = window.location.origin + '/tiles/{z}/{x}/{y}';
    var params = (function() {
      var encoded_ags_url = window.encodeURIComponent($('#ags_url').val());
      var key_vals = ['url=' + encoded_ags_url];
      $('.params').each(function (index, object) {
        var $param = $(object);
        var key = $param.find('.param-key').val();
        var value = $param.find('.param-value').val();
        if (key.length && value.length) {
          key_vals.push(key + '=' + window.encodeURIComponent(value));
        }
      });
      return key_vals;
    }());
    var url_template = url + '?' + params.join('&');
    $('#proxy_url_template').val(url_template);
    if (ags_layer) {
      ags_layer.setUrl(url_template);
    } else {
      ags_layer = new L.TileLayer(url_template, {maxZoom: 21});
      map.addLayer(ags_layer);
    }
  }

  $('#update-layer').on('click', updateLayer);

  updateLayer();
}());

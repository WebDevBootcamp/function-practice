function createExample(name, details) {
  var body = $('body');
  $('<h1>').text(name).appendTo(body);
  $('<blockquote>')
    .html(details.description)
    .appendTo(body);

  if(details.implementation) {
    $('<pre>')
      .addClass('function-body')
      .text(details.implementation.toString())
      .appendTo(body);

    var validationList = $('<ul>');
    for(var index = 0; index < details.validation.length; index++) {
      var test = details.validation[index];
      var status;
      var results;
      try
      {
        var args = _.isArray(test.input) ? test.input : [ test.input ];
        results = details.implementation.apply(null, args);
        if(_.isEqual(results, test.output)) {
          status = 'success';
        }
        else {
          status = 'incorrect';
        }
      }
      catch (error)
      {
        status = 'error';
        results = error;
      }

      var formatted = status + ': ' + JSON.stringify(test.input) + ' -> ' +
        JSON.stringify(results);
      if(status === 'incorrect') {
        formatted += ' (expected: ' + JSON.stringify(test.output) + ')';
      }
      $('<li>').addClass(status)
        .text(formatted)
        .appendTo(validationList);
    }
    validationList.appendTo(body);
  }
}


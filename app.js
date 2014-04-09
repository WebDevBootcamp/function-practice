function createExample(name, details) {
  var body = $('body');
  $('<h1>').text(name).appendTo(body);
  $('<blockquote>')
    .html(details.description)
    .appendTo(body);

  if(details.implementation) {
    // kind of ugly, but removes leading spaces in the body
    var functionBody = details.implementation.toString().split(/\n/);
    functionBody = _.map(functionBody, function(line) {
      console.warn(line.replace(/^ {8}/, ''));
      return line.replace(/^ {8}/, '');
    });
    $('<pre>')
      .addClass('function-body')
      .text(functionBody.join('\n'))
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


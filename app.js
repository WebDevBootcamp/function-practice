function createExample(name, details) {
  var body = $('body');
  $('<h1>').text(name).appendTo(body);
  $('<blockquote>').text(details.description).appendTo(body);
  $('<pre>').text(details.implementation.toString()).appendTo(body);

  var validationList = $('<ul>');
  for(var index = 0; index < details.validation.length; index++) {
    var test = details.validation[index];
    var status;
    var results;
    try
    {
      results = details.implementation.call(null, test.input);
      if(results === test.output) {
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

    var formatted = status + ': ' + test.input + ' -> ' + results;
    $('<li>').addClass(status)
      .text(formatted)
      .appendTo(validationList);
  }
  validationList.appendTo(body);
}


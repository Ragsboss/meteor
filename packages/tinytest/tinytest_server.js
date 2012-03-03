Meteor.startup(function () {
  Meteor._ServerTestResults.remove();
});

App.publish('tinytest/results', function (run_id) {
  return Meteor._ServerTestResults.find({run_id: run_id});
});

App.methods({
  'tinytest/run': function (run_id) {
    var request = this;
    request.beginAsync();

    Meteor._runTests(function (report) {
      /* onReport */
      Meteor._ServerTestResults.insert({run_id: run_id, report: report});
    }, function () {
      /* onComplete */
      request.respond();
    });
  }
});

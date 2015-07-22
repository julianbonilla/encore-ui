describe('forms', function () {

    before(function () {
        demoPage.go('#/styleguide/forms');
    });

    describe('manual saving', function () {

        it('form', function () {
            screenshot.snap(this, $('rx-styleguide[code-url$="manual-saving.html"]'));
        });

        it('notification', function () {
            element(by.model('text')).sendKeys('input');
            screenshot.snap(this, encore.rxNotify.main.rootElement);
        });

    });

});

describe('Directive: rxButton', function () {
    var el, scope, compile, rootScope,
        btnTemplate =
        '<rx-button ' +
            'toggle-msg="Authenticating" ' +
            'default-msg="Login" ' +
            'toggle="status.loading">' +
        '</rx-button>';

    beforeEach(function () {
        module('encore.ui.rxButton');
        module('templates/rxButton.html');

        inject(function ($rootScope, $compile, $templateCache) {
            var template = $templateCache.get('templates/rx-button.html');

            $templateCache.put('templates/rxButton.html', template);

            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        el = compile(btnTemplate)(scope);
        scope.$digest();
    });

    afterEach(function () {
        el = null;
    });

    function getButton (el) {
        var buttons = el.find('button');
        return angular.element(buttons['0']);
    }

    it('should render template correctly', function () {
        expect(el).not.be.empty;
        expect(el.find('button')).not.be.empty;

        var button = getButton(el);
        expect(button.text().trim()).to.equal('Login');
        expect(button.attr('disabled')).to.be.empty;
    });

    it('should render toggle message, animation and disable button', function () {
        var button = getButton(el);
        expect(button.hasClass('ng-hide')).to.be.false;

        scope.status = { loading: true };
        scope.$digest();
        
        expect(button.text().trim()).to.eq('Authenticating');
        expect(button.find('div').hasClass('ng-hide')).to.be.false;
        expect(button.attr('disabled')).to.eq('disabled');
    });
});
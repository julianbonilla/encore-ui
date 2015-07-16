/* jshint node: true */

describe('rxTags', function () {
    var scope, isolateScope, compile, el, input;
    var standardTemplate = '<rx-tags ng-model="tags" options="tagOptions"></rx-tags>';
    var keyTemplate = '<rx-tags ng-model="tags" options="tagOptions" key="text"></rx-tags>';

    beforeEach(function () {
        module('encore.ui.rxTags');
        module('templates/rxTags.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        scope.tagOptions = [
            { text: 'a key' },
            { text: 'another key' }
        ];

        el = helpers.createDirective(standardTemplate, compile, scope);
        isolateScope = el.isolateScope();

        input = el.find('input')[0];
        input.focus = sinon.stub();
    });

    describe('focusInput()', function () {

        it('focuses the input if the container element is clicked', function () {
            isolateScope.focusInput({ target: el.children()[0] });
            expect(input.focus).to.have.been.called;
        });

        it('does not focus the input if any other element is clicked', function () {
            isolateScope.focusInput({});
            expect(input.focus).to.not.have.been.called;
        });

    });

    describe('add()', function () {

        it('adds a new tag to the list', function () {
            var tag = { text: 'a tag' };
            isolateScope.add(tag);
            expect(scope.tags).to.eql([tag]);
        });

        it('resets the tag input', function () {
            isolateScope.newTag = 'foo';
            isolateScope.add();
            expect(isolateScope.newTag).to.equal('');
        });

    });

    describe('remove()', function () {

        it('removes a tag from the list', function () {
            var tags = scope.options;
            scope.tags = _.clone(tags);
            scope.$digest();
            isolateScope.remove(_.first(tags));
            expect(scope.tags).to.eql(_.rest(tags));
        });

        it('focuses the input', function () {
            isolateScope.remove();
            expect(input.focus).to.have.been.called;
        });

    });

    describe('with the key attribute', function () {

        beforeEach(function () {
            el = helpers.createDirective(keyTemplate, compile, scope);
            isolateScope = el.isolateScope();
        });

        it('writes tags to the model by their keys', function () {
            isolateScope.add({ text: 'a key' });
            scope.$digest();
            expect(scope.tags).to.eql(['a key']);
        });

        it('renders tags by checking their keys', function () {
            scope.tags = ['a key'];
            scope.$digest();
            expect(isolateScope.tags).to.eql([{ text: 'a key' }]);
        });

    });
});

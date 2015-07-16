var rxTags = require('./rxTags.page').rxTags;

/**
   rxTags exercises.
   @exports encore.exercise.rxTags
   @param {Object} [options=] - Test options. Used to build valid tests.
   @param {string} [options.cssSelector=] - Fallback selector string to initialize widget with.
   @example
   ```js
   describe('default exercises', encore.exercise.rxTags({
       cssSelector: '.secondary-info rx-paginate', // select one of many widgets on page
   }));
   ```
 */
exports.rxTags = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        sampleText: undefined
    });

    return function () {
        var component, tag, numTags;

        before(function () {
            if (options.cssSelector === undefined) {
                component = rxTags.main;
            } else {
                component = rxTags.initialize($(options.cssSelector));
            }
            component.count.then(function (num) {
                numTags = num;
            });
        });

        if (!_.isUndefined(options.sampleText)) {
            it('adds a tag', function () {
                tag = component.addTag(options.sampleText);
                expect(tag.text).to.eventually.equal(options.sampleText);
                expect(component.count).to.eventually.equal(numTags + 1);
            });

            it('removes a tag', function () {
                tag.remove();
                expect(tag.exists()).to.eventually.be.false;
                expect(component.count).to.eventually.equal(numTags);
            });
        }

    };
};

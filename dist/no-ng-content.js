"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = exports.RULE_NAME = void 0;
const utils_1 = require("@typescript-eslint/utils");
const utils_2 = require("@angular-eslint/utils");
exports.RULE_NAME = 'no-ng-content';
exports.rule = utils_1.ESLintUtils.RuleCreator((ruleName) => ruleName)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: ``,
            recommended: 'error',
        },
        schema: [{
                type: 'object',
                additionalProperties: false,
                properties: {
                    selectors: {
                        type: 'array',
                        items: {
                            type: 'string',
                        }
                    }
                },
            }],
        messages: {
            default: 'Do not use ng-content'
        },
    },
    defaultOptions: [{
            selectors: [],
        }],
    create(context, [{ selectors }]) {
        return {
            [`Content[name=ng-content]`](node) {
                const parserServices = (0, utils_2.getTemplateParserServices)(context);
                const loc = parserServices.convertNodeSourceSpanToLoc(node.sourceSpan);
                context.report({
                    loc,
                    messageId: 'default',
                    data: {
                        element: node.name,
                    }
                });
            }
        };
    },
});
function stringArrayToRegex(value) {
    return RegExp(`^(${value.join('|')})$`);
}

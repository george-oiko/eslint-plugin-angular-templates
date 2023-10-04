import { ESLintUtils } from '@typescript-eslint/utils';
import { getTemplateParserServices } from '@angular-eslint/utils';


export const RULE_NAME = 'no-ng-content';

export const rule = ESLintUtils.RuleCreator((ruleName) => ruleName)({
    name: RULE_NAME,
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
            [`Content[name=ng-content]`](node: any) {
                const parserServices = getTemplateParserServices(context as any);
                const loc = parserServices.convertNodeSourceSpanToLoc(node.sourceSpan);
                context.report({
                    loc,
                    messageId: 'default',
                    data: {
                        element: node.name,
                    }
                })
            }
        };
    },
});

function stringArrayToRegex(value: string[]): RegExp {
    return RegExp(`^(${value.join('|')})$`);
}
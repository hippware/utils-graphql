import 'core-js/modules/es6.regexp.match';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

var operationTypeRe = /^\s*(query|mutation|subscription|\{)/;

var getOperationTypeFromMatched = function getOperationTypeFromMatched(matched) {
  _newArrowCheck(this, _this);

  return matched === "{" ? "query" : matched;
}.bind(undefined);
/**
 * Returns the type (query, mutation, or subscription) of the given operation
 *
 * @example
 *
 * const operation = `
 *   subscription userSubscription($userId: ID!) {
 *     user(userId: $userId) {
 *       id
 *       name
 *     }
 *   }
 * `;
 *
 * const operationType = getOperationType(operation);
 *
 * console.log(operationType); // "subscription"
 */


var getOperationType = function getOperationType(operation) {
  _newArrowCheck(this, _this);

  var result = operation.match(operationTypeRe);

  if (!result) {
    throw new TypeError("Invalid operation:\n".concat(operation));
  }

  return getOperationTypeFromMatched(result[1]);
}.bind(undefined);

export default getOperationType;
//# sourceMappingURL=getOperationType.js.map

import 'core-js/modules/es6.array.map';
import 'core-js/modules/es6.regexp.match';
import 'core-js/modules/es6.array.some';
import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

var locationsToString = function locationsToString(locations) {
  var _this2 = this;

  _newArrowCheck(this, _this);

  return locations.map(function (_ref) {
    var column = _ref.column,
        line = _ref.line;

    _newArrowCheck(this, _this2);

    return "".concat(line, ":").concat(column);
  }.bind(this)).join("; ");
}.bind(undefined);

var errorToString = function errorToString(_ref2) {
  var message = _ref2.message,
      locations = _ref2.locations;

  _newArrowCheck(this, _this);

  return message + (locations ? " (".concat(locationsToString(locations), ")") : "");
}.bind(undefined);
/**
 * Transforms an array of GqlError into a string.
 *
 * @example
 *
 * const gqlRespose = {
 *   errors: [
 *     {message: "First Error", locations: [{column: 10, line: 2}]},
 *     {message: "Second Error", locations: [{column: 2, line: 4}]}
 *   ]
 * }
 *
 * const error = errorsToString(gqlRespose.errors);
 * // string with the following:
 * // First Error (2:10)
 * // Second Error (4:2)
 */


var errorsToString = function errorsToString(gqlErrors) {
  _newArrowCheck(this, _this);

  return gqlErrors.map(errorToString).join("\n");
}.bind(undefined);

var _this$1 = undefined;

var operationTypeRe = /^\s*(query|mutation|subscription|\{)/;

var getOperationTypeFromMatched = function getOperationTypeFromMatched(matched) {
  _newArrowCheck(this, _this$1);

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
  _newArrowCheck(this, _this$1);

  var result = operation.match(operationTypeRe);

  if (!result) {
    throw new TypeError("Invalid operation:\n".concat(operation));
  }

  return getOperationTypeFromMatched(result[1]);
}.bind(undefined);

var _this$2 = undefined;

var isSubscription = function isSubscription(definition) {
  _newArrowCheck(this, _this$2);

  return definition.kind === "OperationDefinition" && definition.operation === "subscription";
}.bind(undefined);
/**
 * Returns true if documentNode has a subscription or false otherwise
 */


var hasSubscription = function hasSubscription(documentNode) {
  _newArrowCheck(this, _this$2);

  return documentNode.definitions.some(isSubscription);
}.bind(undefined);

var _this$3 = undefined;

/**
 * Creates a GqlRequest using given GqlRequestCompat
 *
 * @param {GqlRequestCompat<Variables>} gqlRequestCompat
 *
 * @return {GqlRequest<Variables>} 
 *
 * @example
 * const query = `
 *   query userQuery($userId: ID!) {
 *     user(userId: $userId) {
 *       id
 *       email
 *     }
 *   }
 * `;
 * 
 * console.log(requestFromCompat({query, variables: {userId: 10}}));
 * // {operation: "...", variables: {userId: 10}}
 */
var requestFromCompat = function requestFromCompat(_ref) {
  var operation = _ref.query,
      variables = _ref.variables;

  _newArrowCheck(this, _this$3);

  return variables ? {
    operation: operation,
    variables: variables
  } : {
    operation: operation
  };
}.bind(undefined);

var _this$4 = undefined;

/**
 * Creates a GqlRequest using given GqlRequestCompat
 *
 * @param {GqlRequest<Variables>} gqlRequest
 *
 * @return {GqlRequestCompat<Variables>}
 * 
 * @example
 * const operation = `
 *   query userQuery($userId: ID!) {
 *     user(userId: $userId) {
 *       id
 *       email
 *     }
 *   }
 * `;
 * 
 * console.log(requestToCompat({operation, variables: {userId: 10}}));
 * // {query: "...", variables: {userId: 10}}
 */
var requestToCompat = function requestToCompat(_ref) {
  var query = _ref.operation,
      variables = _ref.variables;

  _newArrowCheck(this, _this$4);

  return variables ? {
    query: query,
    variables: variables
  } : {
    query: query
  };
}.bind(undefined);

// export type {DocumentNode} from "graphql/language/ast";
 // export type * from "./types";

export { errorsToString, getOperationType, hasSubscription, requestFromCompat, requestToCompat };
//# sourceMappingURL=index.js.map
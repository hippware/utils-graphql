

Object.defineProperty(exports, "__esModule", {value: true});

function _interopDefault(ex) {
  return ex && typeof ex === "object" && "default" in ex ? ex.default : ex;
}

require("core-js/modules/es6.array.map");
require("core-js/modules/es6.regexp.match");
require("core-js/modules/es6.array.some");
require("core-js/modules/es6.function.bind");
const _newArrowCheck = _interopDefault(
  require("@babel/runtime/helpers/newArrowCheck")
);

const _this;

const locationsToString = function locationsToString(locations) {
  const _this2 = this;

  _newArrowCheck(this, _this);

  return locations
    .map(
      (_ref) => {
        let column = _ref.column;

        
var line = _ref.line;

        _newArrowCheck(this, _this2);

        return "".concat(line, ":").concat(column);
      }
    )
    .join("; ");
}.bind(undefined);

const errorToString = function errorToString(_ref2) {
  const message = _ref2.message;

  var locations = _ref2.locations;

  _newArrowCheck(this, _this);

  return (
    message + (locations ? " (".concat(locationsToString(locations), ")") : "")
  );
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

const errorsToString = function errorsToString(gqlErrors) {
  _newArrowCheck(this, _this);

  return gqlErrors.map(errorToString).join("\n");
}.bind(undefined);

const _this$1;

const operationTypeRe = /^\s*(query|mutation|subscription|\{)/;

const getOperationTypeFromMatched = function getOperationTypeFromMatched(
  matched
) {
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

let getOperationType = function getOperationType(operation) {
  _newArrowCheck(this, _this$1);

  const result = operation.match(operationTypeRe);

  if (!result) {
    throw new TypeError("Invalid operation:\n".concat(operation));
  }

  return getOperationTypeFromMatched(result[1]);
}.bind(undefined);

const _this$2;

const isSubscription = function isSubscription(definition) {
  _newArrowCheck(this, _this$2);

  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
}.bind(undefined);
/**
 * Returns true if documentNode has a subscription or false otherwise
 */

const hasSubscription = function hasSubscription(documentNode) {
  _newArrowCheck(this, _this$2);

  return documentNode.definitions.some(isSubscription);
}.bind(undefined);

const _this$3;

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
const requestFromCompat = function requestFromCompat(_ref) {
  const operation = _ref.query;

  var variables = _ref.variables;

  _newArrowCheck(this, _this$3);

  return variables
    ? {
        operation,
        variables
      }
    : {
        operation
      };
}.bind(undefined);

const _this$4;

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
const requestToCompat = function requestToCompat(_ref) {
  const query = _ref.operation;

  var variables = _ref.variables;

  _newArrowCheck(this, _this$4);

  return variables
    ? {
        query,
        variables
      }
    : {
        query
      };
}.bind(undefined);

exports.errorsToString = errorsToString;
exports.getOperationType = getOperationType;
exports.hasSubscription = hasSubscription;
exports.requestFromCompat = requestFromCompat;
exports.requestToCompat = requestToCompat;
// # sourceMappingURL=index.js.map

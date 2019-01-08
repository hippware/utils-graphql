(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.UtilsGraphql = {})));
}(this, (function (exports) { 'use strict';

  const locationsToString = locations => locations.map(({
    column,
    line
  }) => `${line}:${column}`).join("; ");

  const errorToString = ({
    message,
    locations
  }) => message + (locations ? ` (${locationsToString(locations)})` : "");
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


  const errorsToString = gqlErrors => gqlErrors.map(errorToString).join("\n");

  const operationTypeRe = /^\s*(query|mutation|subscription|\{)/;

  const getOperationTypeFromMatched = matched => matched === "{" ? "query" : matched;
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


  const getOperationType = operation => {
    const result = operation.match(operationTypeRe);

    if (!result) {
      throw new TypeError(`Invalid operation:\n${operation}`);
    }

    return getOperationTypeFromMatched(result[1]);
  };

  const isSubscription = definition => definition.kind === "OperationDefinition" && definition.operation === "subscription";
  /**
   * Returns true if documentNode has a subscription or false otherwise
   */


  const hasSubscription = documentNode => documentNode.definitions.some(isSubscription);

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
  const requestFromCompat = ({
    query: operation,
    variables
  }) => variables ? {
    operation,
    variables
  } : {
    operation
  };

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
  const requestToCompat = ({
    operation: query,
    variables
  }) => variables ? {
    query,
    variables
  } : {
    query
  };

  // @flow

  exports.errorsToString = errorsToString;
  exports.getOperationType = getOperationType;
  exports.hasSubscription = hasSubscription;
  exports.requestFromCompat = requestFromCompat;
  exports.requestToCompat = requestToCompat;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map

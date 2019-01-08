import 'core-js/modules/es6.function.bind';
import _newArrowCheck from '@babel/runtime/helpers/newArrowCheck';

var _this = undefined;

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

  _newArrowCheck(this, _this);

  return variables ? {
    query: query,
    variables: variables
  } : {
    query: query
  };
}.bind(undefined);

export default requestToCompat;
//# sourceMappingURL=requestToCompat.js.map

'use strict';

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

module.exports = errorsToString;
//# sourceMappingURL=errorsToString.js.map

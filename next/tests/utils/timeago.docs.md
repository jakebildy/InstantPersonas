# Documentation for `timeAgo` Function

## Overview

The `timeAgo` function is designed to provide a human-readable string representing the time elapsed since a given date, relative to the current date and time. This function can operate with default time intervals or can be customized with user-defined intervals. It's useful for displaying timestamps in a user-friendly manner, such as in social media posts, comments, or any application requiring a representation of elapsed time.

## Parameters

- `date` (Date): The date from which the elapsed time is calculated.
- `customIntervals` (Array<{ threshold: number; unit: string }>, optional): An optional array of custom intervals for calculating elapsed time. Each object in the array must have:
  - `threshold` (number): The minimum amount of time (in seconds) required to use this interval.
  - `unit` (string): The unit of time this interval represents (e.g., "minute", "hour").

## Default Behavior

By default, the function uses the following intervals for calculating elapsed time:

- **Decade**: 10 years or more.
- **Year**: 365.25 days (accounting for leap years).
- **Month**: Approximately 30 days.
- **Day**: 24 hours.
- **Hour**: 60 minutes.
- **Minute**: 60 seconds.
- **Second**: Less than 60 seconds.

The function returns a string indicating the number of time units and the unit of time, followed by "ago". For times less than one second, it returns "just now".

## Custom Intervals

Users can define custom intervals by passing an array of objects with `threshold` and `unit` properties to the `customIntervals` parameter. This allows for flexibility in how elapsed time is presented. For example, intervals could be defined for "week" or "quarter", or even non-standard units like "parsecs" for specific use cases.

## Special Cases

- **Less than a second**: Returns "just now".
- **Singular vs. Plural**: The function intelligently handles singular and plural forms of units, appending an "s" for plural where necessary.
- **Custom Interval Example - Parsecs**: If a custom interval is defined for "parsecs" (a unit of distance used in astronomy, not time, but hypothetically usable here for a specific context), the function could return elapsed time in parsecs, assuming an appropriate conversion factor from seconds to parsecs is defined in the `threshold`.

## Return Value

The function returns a string describing how long ago the given date occurred, according to the defined intervals. If no appropriate interval is found (which should not happen with the default or reasonably defined custom intervals), it defaults to "just now".

## Usage Examples

- **Default Intervals**: `timeAgo(new Date(2020, 0, 1))` might return "2 years ago".
- **Custom Intervals**: `timeAgo(new Date(2023, 0, 1), [{ threshold: 946080000, unit: 'parsec' }])` could return "1 parsec ago", assuming the threshold is set to the equivalent of one parsec in seconds.

## Notes

The function assumes that the current system time is accurate and does not account for any time zone differences between the provided date and the system's current date and time.

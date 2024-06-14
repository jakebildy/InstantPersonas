function timeAgo(
  date: Date,
  customIntervals?: Array<{ threshold: number; unit: string }>,
): string {
  const currentTime = new Date();
  const differenceInSeconds = (currentTime.getTime() - date.getTime()) / 1000;

  // Return "just now" for times less than a second ago
  if (differenceInSeconds < 1) {
    return "just now";
  }

  const SECOND = 1;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY; // Approximation
  const YEAR = 365.25 * DAY; // Accounts for leap years
  const DECADE = 10 * YEAR;

  const defaultIntervals = [
    { threshold: DECADE, unit: "decade" },
    { threshold: YEAR, unit: "year" },
    { threshold: MONTH, unit: "month" },
    { threshold: DAY, unit: "day" },
    { threshold: HOUR, unit: "hour" },
    { threshold: MINUTE, unit: "minute" },
    { threshold: SECOND, unit: "second" },
  ];

  // Use customIntervals if provided, else use defaultIntervals
  const intervals = customIntervals || defaultIntervals;

  for (const { threshold, unit } of intervals) {
    if (differenceInSeconds >= threshold) {
      const count = Math.floor(differenceInSeconds / threshold);
      return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
  }

  // This catch-all return statement is a failsafe and should never be reached
  return "just now";
}

describe("timeAgo function", () => {
  // Test current date, should return "just now"
  test('returns "just now" for times less than a second ago', () => {
    const now = new Date();
    expect(timeAgo(now)).toBe("just now");
    const veryRecentTime = new Date(Date.now() - 500); // 0.5 seconds ago
    expect(timeAgo(veryRecentTime)).toBe("just now");
  });

  // Test singular and plural units for each default interval
  const oneSecondAgo = new Date(new Date().getTime() - 1000);
  const thirtySecondsAgo = new Date(new Date().getTime() - 30000);
  const oneMinuteAgo = new Date(new Date().getTime() - 60000);
  const twoMinutesAgo = new Date(new Date().getTime() - 120000);
  const oneHourAgo = new Date(new Date().getTime() - 3600000);
  const oneDayAgo = new Date(new Date().getTime() - 86400000);
  const oneMonthAgo = new Date(new Date().getTime() - 2629800000); // Approximation
  const oneYearAgo = new Date(new Date().getTime() - 31557600000); // Leap year accounted
  const oneDecadeAgo = new Date(new Date().getTime() - 315576000000);

  test("handles seconds correctly", () => {
    expect(timeAgo(thirtySecondsAgo)).toBe("30 seconds ago");
    expect(timeAgo(oneSecondAgo)).toBe("1 second ago");
  });

  test("handles minutes correctly", () => {
    expect(timeAgo(oneMinuteAgo)).toBe("1 minute ago");
    expect(timeAgo(twoMinutesAgo)).toBe("2 minutes ago");
  });

  test("handles hours correctly", () => {
    expect(timeAgo(oneHourAgo)).toBe("1 hour ago");
  });

  test("handles days correctly", () => {
    expect(timeAgo(oneDayAgo)).toBe("1 day ago");
  });

  test("handles months correctly", () => {
    expect(timeAgo(oneMonthAgo)).toBe("1 month ago");
  });

  test("handles years correctly", () => {
    expect(timeAgo(oneYearAgo)).toBe("1 year ago");
  });

  test("handles decades correctly", () => {
    expect(timeAgo(oneDecadeAgo)).toBe("1 decade ago");
  });

  // Test custom interval, using "parsecs" as an example
  const oneParsecAgo = new Date(new Date().getTime() - 946080000 * 1000); // Example threshold for 1 parsec in seconds
  test("handles custom intervals correctly", () => {
    const customIntervals = [{ threshold: 946080000, unit: "parsec" }];
    expect(timeAgo(oneParsecAgo, customIntervals)).toBe("1 parsec ago");
  });
});

import { dateToDateStr, dateToDateStrUTC, dateToDateTime, dateToDateTimeUTC, dateToDayMonth, dateToDayMonthUTC, dateToTime, dateToTimeUTC, timestampToDate, timestampToDateTime, timestampToDateTimeUTC, timestampToDateUTC, timestampToTime, timestampToTimeUTC } from "../src";

describe("Time functions", () => {

  describe("dateToDateStr", () => {
    it("returns a date string", () => {
      expect(dateToDateStr(new Date("2023-03-17T11:03:44.444Z"))).toBe("2023-03-17");
    });
    it("returns empty string for undefined date", () => {
      expect(dateToDateStr(undefined!)).toBe("");
    });
  });

  describe("dateToDateStrUTC", () => {
    it("returns a date string", () => {
      expect(dateToDateStrUTC(new Date("2023-03-17T11:03:44.444Z"))).toBe("2023-03-17");
    });
    it("returns empty string for undefined date", () => {
      expect(dateToDateStrUTC(undefined!)).toBe("");
    });
  });

  describe("dateToTime", () => {
    it("returns a time string", () => {
      expect(dateToTime(new Date("2023-03-17T11:03:44.444Z"))).toBe("11:03:44");
    });
    it("can ignore seconds", () => {
      expect(dateToTime(new Date("2023-03-17T11:03:44.444Z"), { secs: false })).toBe("11:03");
    });
    it("returns empty string for undefined date", () => {
      expect(dateToTime(undefined!)).toBe("");
    });
  });

  describe("dateToTimeUTC", () => {
    it("returns a time string", () => {
      expect(dateToTimeUTC(new Date("2023-03-17T11:03:44.444Z"))).toBe("11:03:44");
    });
    it("can ignore seconds", () => {
      expect(dateToTimeUTC(new Date("2023-03-17T11:03:44.444Z"), { secs: false })).toBe("11:03");
    });
    it("returns empty string for undefined date", () => {
      expect(dateToTimeUTC(undefined!)).toBe("");
    });
  });

  describe("dateToDateTime", () => {
    it("returns a date-time string", () => {
      expect(dateToDateTime(new Date("2023-03-17T11:03:44.444Z"))).toBe("2023-03-17 11:03:44");
    });
    it("can ignore seconds", () => {
      expect(dateToDateTime(new Date("2023-03-17T11:03:44.444Z"), { secs: false })).toBe("2023-03-17 11:03");
    });
    it("returns empty string for undefined date", () => {
      expect(dateToDateTime(undefined!)).toBe("");
    });
  });

  describe("dateToDateTimeUTC", () => {
    it("returns a date-time string", () => {
      expect(dateToDateTimeUTC(new Date("2023-03-17T11:03:44.444Z"))).toBe("2023-03-17 11:03:44");
    });
    it("can ignore seconds", () => {
      expect(dateToDateTimeUTC(new Date("2023-03-17T11:03:44.444Z"), { secs: false })).toBe("2023-03-17 11:03");
    });
    it("returns empty string for undefined date", () => {
      expect(dateToDateTimeUTC(undefined!)).toBe("");
    });
  });

  describe("dateToDayMonth", () => {
    it("returns a day-month string", () => {
      expect(dateToDayMonth(new Date("2023-03-17T11:03:44.444Z"))).toBe("17 Mar");
    });
    it("returns empty string for undefined date", () => {
      expect(dateToDayMonth(undefined!)).toBe("");
    });
  });

  describe("dateToDayMonthUTC", () => {
    it("returns a day-month string", () => {
      expect(dateToDayMonthUTC(new Date("2023-03-17T11:03:44.444Z"))).toBe("17 Mar");
    });
    it("returns empty string for undefined date", () => {
      expect(dateToDayMonthUTC(undefined!)).toBe("");
    });
  });

  describe("timestampToDate", () => {
    it("returns a date string", () => {
      expect(timestampToDate(1679051024444)).toBe("2023-03-17");
    });
  });

  describe("timestampToDateUTC", () => {
    it("returns a date string", () => {
      expect(timestampToDateUTC(1679051024444)).toBe("2023-03-17");
    });
  });

  describe("timestampToTime", () => {
    it("returns a time string", () => {
      expect(timestampToTime(1679051024444)).toBe("11:03:44");
    });
    it("can ignore seconds", () => {
      expect(timestampToTime(1679051024444, { secs: false })).toBe("11:03");
    });
  });

  describe("timestampToTimeUTC", () => {
    it("returns a time string", () => {
      expect(timestampToTimeUTC(1679051024444)).toBe("11:03:44");
    });
    it("can ignore seconds", () => {
      expect(timestampToTimeUTC(1679051024444, { secs: false })).toBe("11:03");
    });
  });

  describe("timestampToDateTime", () => {
    it("returns a time string", () => {
      expect(timestampToDateTime(1679051024444)).toBe("2023-03-17 11:03:44");
    });
    it("can ignore seconds", () => {
      expect(timestampToDateTime(1679051024444, { secs: false })).toBe("2023-03-17 11:03");
    });
  });

  describe("timestampToDateTimeUTC", () => {
    it("returns a time string", () => {
      expect(timestampToDateTimeUTC(1679051024444)).toBe("2023-03-17 11:03:44");
    });
    it("can ignore seconds", () => {
      expect(timestampToDateTimeUTC(1679051024444, { secs: false })).toBe("2023-03-17 11:03");
    });
  });

});

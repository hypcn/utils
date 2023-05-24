import { wait } from "../src";

describe("wait", () => {

  it("waits for the correct duration", async () => {
    let tooEarly = true;
    const duration = 500;

    setTimeout(() => {
      tooEarly = false;
    }, duration - 50);
    const tooLateTimeout = setTimeout(() => {
      throw "too late";
    }, duration + 50);

    await wait(duration);

    clearTimeout(tooLateTimeout);
    if (tooEarly) throw "too early";
    return;
  });

});

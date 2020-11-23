export default class HC {
  static getTraceId() {
    return this.defaultAttributes.traceId;
  }

  static getTraceData() {
    return this.defaultAttributes.trace || {};
  }

  static init(attributes) {
    this.defaultAttributes = attributes;
  }

  static logEvent(originalAttributes) {
    const attributes = Object.assign(
      this.defaultAttributes,
      originalAttributes
    );

    attributes.timestamp = new Date(Date.now() - attributes.durationMs);

    // TODO: switch to console.log when honeycomb implements fix
    // console.log(JSON.stringify(attributes));
    process.stdout.write(`${JSON.stringify(attributes)}\n`);
  }
}

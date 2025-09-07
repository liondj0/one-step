export abstract class Init {
  constructor(private readonly __name: string) {}

  async init(): Promise<void> {
    console.log(`Starting: ${this.__name}`);
    await this.__initImplementation();
    console.log(`Finished starting: ${this.__name}`);
  }

  protected abstract __initImplementation(): Promise<void>;

  async destroy(): Promise<void> {
    console.log(`Starting: ${this.__name}`);
    await this.__destroyImplementation();
    console.log(`Finished starting: ${this.__name}`);
  }

  protected abstract __destroyImplementation(): Promise<void>;
}

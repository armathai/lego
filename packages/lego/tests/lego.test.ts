import { lego } from '../src';

test('Lego', () => {
    expect(lego).toHaveProperty('command');
    expect(lego).toHaveProperty('event');
    expect(lego).toHaveProperty('observe');
});

test('Event on', () => {
    const arg1 = { prop1: '1', prop2: 2 };
    const listener = (obj: unknown, num: number, str: string): void => {
        expect(obj).toMatchObject(arg1);
        expect(num).toBe(1);
        expect(str).toBe('arg');
    };
    lego.event.on('test', listener);
    lego.event.emit('test', arg1, 1, 'arg');
    //
    lego.event.off('test', listener);
});

test('Event off', () => {
    const listener = (): void => {
        throw new Error('Handling removed event');
    };

    lego.event.on('test', listener);
    lego.event.off('test', listener);
    lego.event.emit('test');
    //
    lego.event.off('test', listener);
});

test('Command on', () => {
    const arg1 = { prop1: '1', prop2: 2 };
    const command = (obj: unknown, num: number, str: string): void => {
        expect(obj).toMatchObject(arg1);
        expect(num).toBe(1);
        expect(str).toBe('arg');
    };
    lego.command.on('test', command);
    lego.event.emit('test', arg1, 1, 'arg');
    //
    lego.command.off('test', command);
});

test('Command off', () => {
    const command = (): void => {
        throw new Error('Executing unmaped command');
    };

    lego.command.on('test', command);
    lego.command.off('test', command);
    lego.event.emit('test');
});

test('Command once', () => {
    let execCount = 0;
    const command = (): void => {
        ++execCount;
    };
    lego.command.once('test', command);
    lego.event.emit('test');
    lego.event.emit('test');
    lego.event.emit('test');
    lego.event.emit('test');

    expect(execCount).toBe(1);
});

test('Command & sub command', () => {
    const arg1 = { prop1: '1', prop2: 2 };
    const command = (obj: unknown, num: number, str: string): void => {
        expect(obj).toMatchObject(arg1);
        expect(num).toBe(1);
        expect(str).toBe('arg');
        lego.command.execute((...args) => {
            expect(args).toMatchObject([]);
        });
    };
    lego.command.on('test', command);
    lego.event.emit('test', arg1, 1, 'arg');
    //
    lego.command.off('test', command);
});

test('Command & sub command with payload', () => {
    const theObj = { prop1: '1', prop2: 2 };
    const command = (obj: unknown, num: number, str: string): void => {
        expect(obj).toMatchObject(theObj);
        expect(num).toBe(1);
        expect(str).toBe('arg');
        lego.command.payload(theObj).execute((arg) => {
            expect(arg).toMatchObject(theObj);
        });
    };
    lego.command.on('test', command);
    lego.event.emit('test', theObj, 1, 'arg');
    //
    lego.command.off('test', command);
});

test('Command & sub command with payload and guard', () => {
    const theObj = { prop1: '1', prop2: 2 };
    const command = (obj: unknown, num: number, str: string): void => {
        expect(obj).toMatchObject(theObj);
        expect(num).toBe(1);
        expect(str).toBe('arg');
        lego.command
            .guard(() => true)
            .payload(theObj)
            .execute((arg) => {
                expect(arg).toMatchObject(theObj);
            });
        lego.command
            .guard(
                () => true,
                () => false
            )
            .payload(theObj)
            .execute(() => {
                throw new Error('Guards passed');
            });
    };
    lego.command.on('test', command);
    lego.event.emit('test', theObj, 1, 'arg');
    //
    lego.command.off('test', command);
});

test('Command & sub command with multiple payloads and guards', () => {
    const theObj = { prop1: '1', prop2: 2 };
    const command = (obj: unknown, num: number, str: string): void => {
        expect(obj).toMatchObject(theObj);
        expect(num).toBe(1);
        expect(str).toBe('arg');
        lego.command
            .guard(() => true)
            .payload(theObj)
            .execute((arg) => {
                expect(arg).toMatchObject(theObj);
            })
            .payload(0)
            .execute((arg) => {
                expect(arg).toBe(0);
            });
        lego.command
            .guard(
                () => true,
                () => false
            )
            .payload(theObj)
            .execute(() => {
                throw new Error('Guards passed');
            });
    };
    lego.command.on('test', command);
    lego.event.emit('test', theObj, 1, 'arg');
    //
    lego.command.off('test', command);
});

test('Observe', () => {
    const myObj = { prop1: '2', prop2: 1 };
    lego.observe.makeObservable(myObj);
    lego.event.on('ObjectProp1Update', (newValue: string, oldValue: string) => {
        expect(oldValue).toBe('2');
        expect(newValue).toBe('3');
    });

    lego.event.on('ObjectProp2Update', (newValue: number, oldValue: number) => {
        expect(oldValue).toBe(1);
        expect(newValue).toBe(0);
    });

    myObj.prop1 = '3';
    myObj.prop2 = 0;
});

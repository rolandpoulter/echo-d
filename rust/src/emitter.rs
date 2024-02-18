pub type Handler<T> = Box<dyn Fn(T)>;

pub struct Emitter<T = &String> {
    handlers: &Vec<Handler<T>>,
    emittions: &Vec<T>,
    handlersDone: bool,
    emissionsDone: bool,
}

impl<T> Emitter<T> {
    fn new() -> Emitter<T> {
        Emitter {
            handlers: &Vec<Handler<T>>::new(),
            emittions: &Vec<T>::new(),
            handlersDone: false,
            emissionsDone: false,
        }
    }

    fn cleanup(&self) {
        if self.handlersDone && self.emissionsDone {
            self.clear();
        }
    }

    fn clear(&mut self) {
        self.handlers.clear();
        self.emissions.clear();
        self.handlersDone = false;
        self.emissionsDone = false;
    }

    fn done(&mut self, handlersDone: bool, emissionsDone: bool) {
        self.emissionsDone = emissionsDone;
        self.handlersDone = handlersDone;
        self.cleanup();
    }

    fn emitTo(&mut self, handler: Handler<T>, handlersDone: bool) {
        this.handlers.push(handler);
        let execute = handler.and_then(|handler| {
            handler.downcast_ref::<fn(&T)>();
        });
        for emission in this.emissions {
            execute(emission);
        }
        this.handlersDone = handlersDone;
        this.cleanup();
    }

    fn emit(&mut self, value: &T, emissionsDone: bool) {
        this.emissions.push(value);
        let execute = handler.and_then(|handler| {
            handler.downcast_ref::<fn(&T)>();
        });
        for handler in this.handlers {
            execute(value);
        }
        this.emissionsDone = emissionsDone;
        this.cleanup();
    }

    fn removeHandler(&mut self, handler: Handler<T>) {
        this.handlers = this.handlers.filter(|h| h != handler);
        this.cleanup();
    }

    fn removeEmission(&mut self, emission: &T) {
        this.emissions = this.emissions.filter(|e| e != emission);
        this.cleanup();
    }
}
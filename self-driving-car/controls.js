class Controls {
  constructor() {
    this.left = false;
    this.right = false;
    this.forward = false;
    this.reverse = false;
    this.addKeyboardListeners();
  }

  addKeyboardListeners() {
    const keyMap = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "forward",
      ArrowDown: "reverse",
    };

    document.onkeydown = (event) => {
      if (keyMap[event.key] !== undefined) {
        this[keyMap[event.key]] = true;
      }
    };

    document.onkeyup = (event) => {
      if (keyMap[event.key] !== undefined) {
        this[keyMap[event.key]] = false;
      }
    };
  }
}

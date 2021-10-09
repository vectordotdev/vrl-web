import { match } from "ts-pattern";
import { RefObject } from "react";
import { Terminal } from "xterm";
import { XTerm } from "xterm-for-react";
import "xterm/css/xterm.css";

export type TerminalElement = RefObject<XTerm>;

export class VrlTerminal {
  term: Terminal;

  constructor(element: TerminalElement) {
    this.term = element.current.terminal;
  }

  write(s: string) {
    this.term.write(s);
  }

  backspace() {
    this.term.write("\b \b");
  }

  clear() {
    this.term.clear;
  }
}
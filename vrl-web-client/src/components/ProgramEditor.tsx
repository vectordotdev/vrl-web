import { useEffect, useRef } from "react";
import { match } from "ts-pattern";
import { XTerm } from "xterm-for-react";
import { ITerminalOptions } from "xterm";
import { VrlTerminal } from "../data/terminal";

const ENTER = 13;
const BACKSPACE = 127;

export const ProgramEditor = () => {
  const ref = useRef<XTerm>(null);
  const options: ITerminalOptions = {
    fontFamily: 'Fira Code',
  };

  let term: VrlTerminal;

  useEffect(() => {
    term = new VrlTerminal(ref);
    ref.current.terminal.focus();
  });

  const onData = (s: string) => {
    const code: number = s.charCodeAt(0);

    match(code)
      .with(ENTER, () => term.clear())
      .with(BACKSPACE, () => term.backspace())
      .otherwise(() => term.write(s));
    
    console.log(code);
  }

  return <XTerm
    ref={ref}
    onData={onData}
    options={options}
  />
}
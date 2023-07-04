import { print as kolPrint } from "kolmafia";
import { $item, Session, get, set } from "libram";

import { COGNACS, DIVES } from "../prefs/properties";

const session = Session.current();

function printCognac(): void {
  const cognacs = parseInt(get(COGNACS));
  cognacs > 0
    ? kolPrint(`You found ${cognacs} bottles of cognac today!`, `green`)
    : kolPrint(`Didn't find any bottles of cognac this time. :(`, `red`);
}

function printDives(): void {
  const divesStr = get(DIVES);
  const dives = divesStr === "" ? 0 : parseInt(divesStr);
  const s = dives === 1 ? "" : "s";
  kolPrint(`You dove for treasure ${dives} time${s} today!`);
}

export function save(): void {
  const sessionDiff = session.diff(Session.current());
  const cognacs = sessionDiff.items.get($item`Ralph IX cognac`) ?? 0;
  const cognacPref = get(COGNACS);
  const cognacCount = cognacPref === "" ? 0 : parseInt(cognacPref);
  set(COGNACS, cognacCount + cognacs);
}

export function print(): void {
  kolPrint("Cognac summary:");
  kolPrint("");
  printCognac();
  printDives();
}

import {Scope,VERSION} from 'wcex'

export default class extends Scope {
  onReady(): void {
    console.log("VER:",VERSION)
  }
}
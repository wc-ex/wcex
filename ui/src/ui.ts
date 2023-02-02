import { Scope } from 'wcex';
import { popOptions } from './pop1';


export default class extends Scope {
    onReady(): void {
        popOptions.globalEl = this.$id.pop;
    }
}
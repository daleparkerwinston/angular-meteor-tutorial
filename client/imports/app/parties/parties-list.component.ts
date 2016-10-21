import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';

import * as template from './parties-list.component.html';

@Component({
    selector: 'parties-list',
    template: template.default
})
export class PartiesListComponent {
    parties: Observable<Party[]>;

    constructor() {
        this.parties = Parties.find({}).zone();
    }

    removeParty(party: Party): void {
        Parties.remove(party._id);
    }
}
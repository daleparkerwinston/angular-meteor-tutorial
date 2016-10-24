import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';

import * as template from './parties-list.component.html';

@Component({
    selector: 'parties-list',
    template: template.default
})
export class PartiesListComponent implements OnInit, OnDestroy {
    parties: Observable<Party[]>;
    partiesSubscription: Subscription;

    ngOnInit() {
        this.parties = Parties.find({}).zone();
        this.partiesSubscription = MeteorObservable.subscribe('parties').subscribe();
    }

    search(value: string): void {
        this.parties = Parties.find(value ? { location: value } : {}).zone();
    }


    removeParty(party: Party): void {
        Parties.remove(party._id);
    }

    ngOnDestroy() {
        this.partiesSubscription.unsubscribe();
    }
}
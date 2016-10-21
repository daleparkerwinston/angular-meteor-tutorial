import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {Location} from '@angular/common';
import { Meteor } from 'meteor/meteor';

import 'rxjs/add/operator/map';

import { Parties } from '../../../../both/collections/parties.collection';
import { Party } from '../../../../both/models/party.model';

import * as template from './party-details.component.html';

@Component({
    selector: 'party-details',
    template: template.default
})

export class PartyDetailsComponent implements OnInit, OnDestroy {
    partyId: string;
    paramsSub: Subscription;
    party: Party;

    constructor(
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['partyId'])
            .subscribe(partyId => {
                this.partyId = partyId;
                this.party = Parties.findOne(this.partyId);
            });
    }

    saveParty() {
        if (!Meteor.userId()) {
            alert('Please log in to change this party');
            return;
        }

        Parties.update(this.party._id, {
            $set: {
                name: this.party.name,
                description: this.party.location,
                location: this.party.location
            }
        });
        this.goBack();
    }

    goBack() {
        this._location.back();
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }

    canActivate() {
        const party = Parties.findOne(this.partyId);
        return (party && party.owner == Meteor.userId());
    }
}
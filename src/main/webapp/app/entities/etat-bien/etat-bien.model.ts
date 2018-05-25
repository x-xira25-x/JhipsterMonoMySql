import { BaseEntity } from './../../shared';

export class EtatBien implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
    ) {
    }
}

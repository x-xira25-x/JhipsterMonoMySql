import { BaseEntity } from './../../shared';

export class EtatVisite implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
    ) {
    }
}

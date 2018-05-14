import { BaseEntity } from './../../shared';

export class Visite implements BaseEntity {
    constructor(
        public id?: number,
        public dateDebut?: any,
        public dateFin?: any,
    ) {
    }
}

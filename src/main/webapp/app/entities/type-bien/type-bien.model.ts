import { BaseEntity } from './../../shared';

export class TypeBien implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
    ) {
    }
}

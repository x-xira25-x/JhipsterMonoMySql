import { BaseEntity } from './../../shared';

export class Blog implements BaseEntity {
    constructor(
        public id?: number,
        public blog?: string,
        public nom?: string,
    ) {
    }
}

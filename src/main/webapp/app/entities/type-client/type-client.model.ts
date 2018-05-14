import { BaseEntity } from './../../shared';

export class TypeClient implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public clients?: BaseEntity[],
    ) {
    }
}
